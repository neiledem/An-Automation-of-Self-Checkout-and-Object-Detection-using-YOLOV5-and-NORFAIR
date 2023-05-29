import { useState } from "react";
import Select from "./components/Select";
import Webcam from "./components/Webcam";
import Preview from "./components/Preview";
import Count from "./components/Count";

function App() {
  const [videoSource, setVideoSource] = useState();
  const [predictionPreview, setPredictionPreview] = useState();
  const [takenObjectsCount, setTakenObjectsCount] = useState();

  return (
    <div className="bg-neutral-100 flex flex-col items-center gap-5 min-h-screen">
      <div className="flex items-center w-full justify-around my-10">
        <h1 className="text-6xl font-semibold"> Fruits Tracker </h1>
        <Select videoSource={videoSource} setVideoSource={setVideoSource} />
      </div>
      <Preview predictionPreview={predictionPreview} />
      <Webcam
        videoSource={videoSource}
        setPredictionPreview={setPredictionPreview}
        setTakenObjectsCount={setTakenObjectsCount}
      />
      <h2 className="text-3xl"> Fruits Taken </h2>
      <div className="flex gap-20">
        {takenObjectsCount &&
          Object.entries(takenObjectsCount)?.map((item) => (
            <Count label={item[0]} count={item[1]} />
          ))}
      </div>
    </div>
  );
}

export default App;
