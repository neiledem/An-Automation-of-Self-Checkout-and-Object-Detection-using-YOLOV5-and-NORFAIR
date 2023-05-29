import { useRef } from "react";
import ReactWebcam from "react-webcam";

import { predict } from "../utils/predict";

function Webcam({ videoSource, setPredictionPreview, setTakenObjectsCount }) {
  const cameraRef = useRef();

  const handleUserMedia = (stream) => {
    let requestId;

    const captureFrame = async () => {
      if (!cameraRef.current) return;

      const screenshot = cameraRef.current.getScreenshot({
        width: 1280,
        height: 720,
      });

      if (screenshot) {
        const prediction = await predict(screenshot);
        setPredictionPreview(prediction.annotated_img);
        setTakenObjectsCount(prediction.objects_taken);
      }

      requestId = requestAnimationFrame(captureFrame);
    };

    requestId = requestAnimationFrame(captureFrame);

    return () => {
      cancelAnimationFrame(requestId);
      stream.getTracks().forEach((track) => track.stop());
    };
  };

  return (
    <div className="invisible fixed top-0">
      <ReactWebcam
        ref={cameraRef}
        videoConstraints={{ deviceId: videoSource }}
        onUserMedia={handleUserMedia}
      />
    </div>
  );
}

export default Webcam;
