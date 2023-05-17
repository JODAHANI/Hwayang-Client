import React from "react";
import { Link } from "react-router-dom";

const MyThanksLetters = ({ item }) => {
  return (
    <div className="my-20 max-sm:my-10">
      <h2 className="font-semibold mb-10">💌 감사편지</h2>
      <ul className="flex flex-wrap justify-center">
        {item.map((letter) => (
          <Card key={letter._id} item={letter} />
        ))}
      </ul>
    </div>
  );
};

const Card = ({ item }) => {
  return (
    <li className="text-center m-3 mr-2 rounded-lg list-none ">
      <Link
        to={{
          pathname: `/thanks-letter/${item._id}`,
          state: {
            item,
          },
        }}
        className="letter block w-72 max-sm:w-32 relative p-4"
      >
        <img
          className="block max-w-36 rounded-lg max-h-36 m-auto"
          src="/img/thanksletter.png"
          alt="new family"
        />
        <p className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-[#fff] z-10 font-extrabold	 w-full">
          {item.to}
        </p>
      </Link>
    </li>
  );
};

export default MyThanksLetters;
