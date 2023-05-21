import "../../../index.css";

const QuietTime = (): JSX.Element => {
  return (
    <div className="full-screen relative bg-sky-300 before:content-[''] before:block before:w-full before:h-full before:bg-black/10 text-3xl text-center leading-normal max-sm:text-base font-semibold text-white">
      <div className="w-11/12 max-w-5xl absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
        <h2 className="font-medium">「 여호수아 1:8 」</h2>
        <h3 className="font-medium mt-5">
          이 율법책을 네 입에서 떠나지 말게 하며 주야로 그것을 묵상하여 그
          가운데 기록한대로 다 지켜 행하라 그리하면 네 길이 평탄하게 될 것이라
          네가 형통하리라
        </h3>
        <a
          className="inline-block text-2xl max-sm:text-sm font-medium relative p-4 mt-5 after:content-[''] after:block after:w-4/12 after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2	after: after:border-white-800	 after:border-b-2 max-sm:after:border-b after:rounded-3xl hover:after:w-8/12 after:duration-500"
          target="_blank"
          rel="noopener noreferrer"
          href="https://sum.su.or.kr:8888/bible/today"
        >
          QT 페이지로 이동.
        </a>
      </div>
    </div>
  );
};

export default QuietTime;
