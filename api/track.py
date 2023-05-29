import numpy as np
from norfair import Detection, Tracker

DISTANCE_THRESHOLD_CENTROID: int = 100
MAX_DISTANCE: int = 10000

distance_function = "euclidean"
distance_threshold = DISTANCE_THRESHOLD_CENTROID

tracker = Tracker(
    distance_function=distance_function,
    distance_threshold=distance_threshold,
    hit_counter_max=20,
    initialization_delay=1
)

def yolo_to_norfair(yolo_detections, model):
    """convert detections_as_xywh to norfair detections"""
    norfair_detections = []

    detections_as_xywh = yolo_detections.xywh[0]
    for detection_as_xywh in detections_as_xywh:
        centroid = np.array([detection_as_xywh[0].item(), detection_as_xywh[1].item()])
        scores = np.array([detection_as_xywh[4].item()])
        norfair_detections.append(
            Detection(
                points=centroid,
                scores=scores,
                label=model.names[int(detection_as_xywh[-1].item())],
            )
        )

    return norfair_detections
