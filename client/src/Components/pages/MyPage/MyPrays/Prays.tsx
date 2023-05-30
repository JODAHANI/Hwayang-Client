import React from "react";
import { Link } from "react-router-dom";

const MyPrays = ({ item }) => {
  return (
    <div className="my-10 max-sm:my-10">
      <h2 className="font-semibold mb-10">🙏🏻 기도요청</h2>
      <ul>
        {item.map((pray) => (
          <Card key={pray._id} item={pray} />
        ))}
      </ul>
    </div>
  );
};

const Card = ({ item }) => {
  return (
    <li className="prays p-2 pl-5 my-4 flex justify-between items-center shadow-md border-2 rounded-xl max-sm:text-xs">
      <p className="font-semibold text-[#333]">{item.title}</p>
      <Link
        className="transition-all	text-[#3ed1fe] font-extrabold px-4 py-2 hover:text-[#FFA500]"
        to={`/pray-request/${item._id}`}
      >
        view
      </Link>
    </li>
  );
};

export default MyPrays;
