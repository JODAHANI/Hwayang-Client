import React from "react";
import { Link } from "react-router-dom";

import {
  Routes,
  RoutesText,
  RoutesImgUrl,
} from "../../../../constants/routeItems";
const { prayRequest, thanksLetter, proclamation, graceSharing } = Routes;
const {
  prayRequestText,
  thanksLetterText,
  proclamationText,
  graceSharingText,
} = RoutesText;
const { prayerRequestImg, thanksLetterImg, proclamationImg, graceSharingImg } =
  RoutesImgUrl;
const subNavigationItems = [
  {
    route: prayRequest,
    title: prayRequestText,
    imgUrl: prayerRequestImg,
  },
  {
    route: thanksLetter,
    title: thanksLetterText,
    imgUrl: thanksLetterImg,
  },
  {
    route: graceSharing,
    title: graceSharingText,
    imgUrl: graceSharingImg,
  },
  {
    route: proclamation,
    title: proclamationText,
    imgUrl: proclamationImg,
  },
];
const SubNavigation = () => {
  return (
    <section className="max-w-screen-2xl m-auto py-5">
      <nav className="w-4/5 m-auto">
        <div className=" text-[#222] py-8">
          <h2 className="text-left font-bold text-2xl max-sm:text-lg max-sm:py-0">
            SHINE ✨
          </h2>
          <h3 className="p-3 py-1 text-[#888] max-sm:text-xs">
            - 우리의 정체성은 빛입니다!
          </h3>
        </div>

        <ul className="flex justify-around">
          {subNavigationItems.map((item) => (
            <SubNavigationItem key={item.route} item={item} />
          ))}
        </ul>
      </nav>
    </section>
  );
};

const SubNavigationItem = ({ item }) => {
  return (
    <li className="sub-navi-item ">
      <Link className="text-center" to={item.route}>
        <img
          className="sub-navi-img rounded-3xl block m-auto border"
          src={item.imgUrl}
          alt="icon"
        />
        <h2 className="py-1 text-center text-[#555] font-bold text-base max-md:text-xs">
          {item.title}
        </h2>
      </Link>
    </li>
  );
};

export default SubNavigation;
