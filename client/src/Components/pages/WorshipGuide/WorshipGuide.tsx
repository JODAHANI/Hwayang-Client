import "../../../index.css";

const WorshipGuide = (): JSX.Element => {
  const imgClickHandler = () => {
    window.open("img/worship-time.jpg");
  };
  return (
    <div className="full-screen bg-emerald-200 relative before:content-[''] before:block before:w-full before:h-full before:bg-black/10">
      <img
        className="worship-time absolute block left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-3xl h-5/6 hover:cursor-pointer"
        onClick={imgClickHandler}
        src="img/worship-time.jpg"
        alt="time"
      />
    </div>
  );
};

export default WorshipGuide;
