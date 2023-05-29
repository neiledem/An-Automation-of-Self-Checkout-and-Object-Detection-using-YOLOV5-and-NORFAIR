function Preview({ predictionPreview }) {
  return (
    <div className="w-full flex justify-center">
      <img
        src={predictionPreview}
        className="w-auto h-[30rem] rounded-3xl"
      ></img>
    </div>
  );
}

export default Preview;
