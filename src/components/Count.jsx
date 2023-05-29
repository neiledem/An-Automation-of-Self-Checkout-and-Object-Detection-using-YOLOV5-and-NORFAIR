const emojis = {
  apple: "🍎",
  banana: "🍌",
  orange: "🍊",
};

function Count({ label, count }) {
  return (
    <div className="text-center shadow-md rounded-lg bg-white w-52 h-44 flex flex-col justify-center">
      <p className="text-6xl font-bold leading-normal">{count}</p>
      <h3 className="uppercase text-2xl">
        {emojis[label]}
        {label}
      </h3>
    </div>
  );
}

export default Count;
