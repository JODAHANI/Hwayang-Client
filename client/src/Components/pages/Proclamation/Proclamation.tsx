import React, { useEffect, useState } from "react";
import { getProclamation } from "../../../_actions/user_actions";
import LoadingSpinner from "Components/layout/LoadingSpinner/LoadingSpinner";

const h2Css =
  "text-[#fff] font-extrabold p-4 absolute w-full text-xl max-sm:text-base animate-[waviy_1s_4]";
const Proclamation = () => {
  const [todayLogos, setTodayLogos] = useState("");
  const [todayparagraph, setTodayparagraph] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading((prev) => {
      return !prev;
    });
    getProclamation().then((res) => {
      if (res.payload.success) {
        const { todayLogos, paragraph } = res.payload.logos;
        setTodayLogos(todayLogos);
        setTodayparagraph(paragraph);
      }
      setIsLoading((prev) => {
        return !prev;
      });
    });
  }, []);
  return (
    <div className="full-screen proclamation relative bg-[#FFAC1C]  max-sm:text-base text-3xl">
      <h2 className={h2Css}>🗣️ 오늘의 말씀선포</h2>
      <div className="flex full-screen justify-center items-center m-auto ">
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <div className="w-10/12">
            <h3 className="text-[#009150]  text-center font-semibold py-5 max-sm:py-2">
              「 {todayparagraph} 」
            </h3>
            <h3 className="text-[#009150] text-center font-semibold leading-relaxed max-w-7xl m-auto">
              {todayLogos}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Proclamation;
