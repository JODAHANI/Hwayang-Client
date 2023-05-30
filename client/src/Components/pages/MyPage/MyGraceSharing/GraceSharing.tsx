import { hwayangImageUrl } from "constants/routeItems";
import React from "react";
import { Link } from "react-router-dom";

const MyGraceSharing = ({ item }) => {
  return (
    <div className="mt-5 mb-10 max-sm:my-10">
      <h2 className="font-semibold mb-10">🔥 은혜공유</h2>
      <ul>
        {item.map((grace) => (
          <Card key={grace._id} grace={grace} />
        ))}
      </ul>
    </div>
  );
};

const Card = ({ grace }) => {
  return (
    <li className="prays p-2 my-4 border-y-2 max-sm:text-xs">
      <Link
        className=" flex justify-between items-center flex-1 "
        to={{
          pathname: `/grace-sharing/${grace._id}`,
          state: { item: grace },
        }}
      >
        <div className="flex-1">
          <img
            className="grace-thumbnail rounded-md h-20"
            src={`${hwayangImageUrl}/${grace.imagePath}`}
          ></img>
        </div>

        <p className=" flex-1 transition-all text-[#333] font-semibold px-4 py-2 hover:text-[#FFA500]">
          {grace.title}
        </p>
      </Link>
    </li>
  );
};

export default MyGraceSharing;
