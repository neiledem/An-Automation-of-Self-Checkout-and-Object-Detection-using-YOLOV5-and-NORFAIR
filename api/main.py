import torch
from fastapi import FastAPI, Request
import cv2
import base64
import json
import numpy as np
from PIL import Image
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware
import norfair

from track import yolo_to_norfair, tracker

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# model = torch.hub.load("ultralytics/yolov5", "yolov5x6")
model = torch.hub.load("ultralytics/yolov5", "yolov5n")
# model.cuda()

model.classes = [46, 47, 49]
model.max_det = 100
model.conf = 0.4

fruits_taken = {
    "apple": 0,
    "banana": 0,
    "orange": 0,
}

def b64str_to_imgarr(image_data):
    buffer = base64.b64decode(image_data)
    np_arr = np.frombuffer(buffer, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    return img


def img_arr_to_b64str(image_arr):
    buffered = BytesIO()
    im_base64 = Image.fromarray(image_arr)
    im_base64.save(buffered, format="JPEG")
    b64_img = base64.b64encode(buffered.getvalue()).decode("utf-8")

    return b64_img


def predict(image):
    results = model(image, size=640)
    detections = yolo_to_norfair(results, model)
    tracked_objects = tracker.update(detections)
    for object in tracked_objects:
        if object.hit_counter == 0:
            fruits_taken[object.label] += 1
        norfair.draw_points(image, [object], color="by_label", draw_points=True, text_size=1.3, draw_ids=False, radius=6)

    return image


@app.post("/predict")
async def predict_image(file: Request):
    raw_body = await file.body()
    image_data = json.loads(raw_body)
    image_data = image_data["image"].split(",")[1]
    image_arr = b64str_to_imgarr(image_data)

    result = predict(image_arr)
    b64_img = img_arr_to_b64str(result)

    return { "annotated_img": b64_img, "objects_taken": fruits_taken }
