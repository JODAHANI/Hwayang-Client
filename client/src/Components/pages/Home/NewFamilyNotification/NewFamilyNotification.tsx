import React from "react";
import { Link } from "react-router-dom";
import { Routes } from "../../../../constants/routeItems";

const { newFamily } = Routes;

const NewFamilyNotification = ({ newFamilys }) => {
  return (
    <section className="max-w-screen-2xl m-auto py-5 ">
      <div className="w-4/5 m-auto">
        <h2 className="text-left font-bold text-2xl text-[#222] pt-8 max-sm:text-lg max-sm:py-0">
          새가족을 소개합니다 🔥
        </h2>
        <h3 className="p-3 py-1 text-[#888] max-sm:text-xs">
          - SHINE 영성으로 맞이해주세요!
        </h3>
        <div className="box overflow-x-auto">
          <ul className="card-wrapper w-screen flex justify-beetween">
            {newFamilys?.success &&
              newFamilys.newFamily.map((item) => (
                <Card item={item} key={item.name} />
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const Card = ({ item }) => {
  return (
    <li className="text-center m-5 mr-2 shadow-md rounded-lg">
      <Link to={newFamily} className="liink block w-72 max-sm:w-52">
        <img
          className="block w-full rounded-lg"
          src={`http://localhost:80/${item.imagePath}`}
          alt="new family"
        />
        <div className="py-1">
          <span className="text-xs text-[#93C6E7] font-medium px-1">이름:</span>
          <span className="max-sm:text-sm text-[#7caccd] font-semibold px-1">
            {item.name}
          </span>
        </div>
      </Link>
    </li>
  );
};
export default NewFamilyNotification;
