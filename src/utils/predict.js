import axios from "axios";

const controller = new AbortController();

const predict = async (imgb64) => {
  const response = await axios.post(
    import.meta.env.VITE_API_ENDPOINT + "/predict",
    { image: imgb64 },
    {
      signal: controller.signal,
    }
  );

  response.data.annotated_img =
    "data:image/jpeg;base64," + response.data.annotated_img;

  return response.data;
};

export { predict };
