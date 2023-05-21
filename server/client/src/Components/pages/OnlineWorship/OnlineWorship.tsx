const OnlineWorship = (): JSX.Element => {
  return (
    <div className="full-screen bg-[#FDFD96] relative text-3xl text-center bold max-sm:text-base text-teal-800	 before:content-[''] before:block before:w-full before:h-full before:bg-black/0 leading-relaxed">
      OnlineWorship
      <div className="w-10/12 max-w-6xl absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
        <h2 className="font-medium">「 요한복음 4:23-24」</h2>
        <h3 className="font-medium mt-5">
          아버지께 참되게 예배하는 자들은 영과 진리로 예배할 때가 오나니 곧 이
          때라 아버지께서는 자기에게 이렇게 예배하는 자들을 찾으시느니라.
          하나님은 영이시니 예배하는 자가 영과 진리로 예배할지니라
        </h3>
        <a
          className="inline-block text-2xl max-sm:text-sm font-medium relative p-4 mt-5 after:content-[''] after:block after:w-4/12 after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2	after: after:border-teal-800	 after:border-b-2 max-sm:after:border-b after:rounded-3xl hover:after:w-8/12 after:duration-500"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.youtube.com/@anointing3545"
        >
          온라인 예배 LINK
        </a>
      </div>
    </div>
  );
};
//
export default OnlineWorship;
