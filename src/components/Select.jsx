import { useState, useEffect } from "react";

function Select({ videoSource, setVideoSource }) {
  const [videoSources, setVideoSources] = useState([]);

  useEffect(() => {
    const getVideoSources = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoSources = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setVideoSources(videoSources);
    };

    getVideoSources();
  }, []);

  const handleVideoSourceChange = (event) => {
    setVideoSource(event.target.value);
  };

  return (
    <div className="flex items-center gap-4">
      <select
        value={videoSource}
        onChange={handleVideoSourceChange}
        className="rounded-lg px-4 py-2"
      >
        {videoSources.map((source) => (
          <option key={source.deviceId} value={source.deviceId}>
            {source.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
