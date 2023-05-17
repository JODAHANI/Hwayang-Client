import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Routes } from "constants/routeItems";
import {
  combineGraceSharing,
  getGraceShare,
} from "../../../_actions/graceShare_action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "Components/layout/LoadingSpinner/LoadingSpinner";

const { graceSharingWrite } = Routes;
const limit = 30;
let skip = 0;

const GraceSharing = ({ history }) => {
  const graceSharing = useSelector(
    (state: any) => state?.graceShare?.graceSharing
  );
  const allGraceSharing = useSelector(
    (state: any) => state?.graceShare?.allGraceSharing
  );
  const dispatch: any = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);

  const observer = new IntersectionObserver(
    async ([e]) => {
      if (e.isIntersecting) {
        setIsLoading(true);
        skip += limit;
        const body = {
          limit,
          skip,
        };
        const dispatchRequest = await dispatch(getGraceShare(body));
        await dispatch(
          combineGraceSharing(dispatchRequest.payload.graceSharing)
        );

        setIsLoading(false);
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }
  );
  async function getGraceSharing(body: object) {
    if (!graceSharing) {
      setIsLoading(true);
      const dispatchRequest = await dispatch(getGraceShare(body));
      await dispatch(combineGraceSharing(dispatchRequest.payload.graceSharing));
      setIsLoading(false);
    } else {
      if (graceSharing.isScroll) {
        observer.observe(ref.current);
      } else {
        observer.unobserve(ref.current);
      }
    }
  }
  useEffect(() => {
    const body = {
      skip,
      limit,
    };
    getGraceSharing(body);
  }, [allGraceSharing]);

  return (
    <div className="max-w-5xl m-auto">
      <div className="flex justify-between py-5 px-5">
        <div>
          <h2 className="font-semibold">🔥 은혜공유</h2>
          <h3 className="p-3 py-1 text-[#888] max-sm:text-xs text-sm">
            - 여러분들이 나누고 싶은 은혜를 공유해주세요!
          </h3>
        </div>

        <button type="button">
          <Link
            className="inline-block py-2 px-3 text-xs text-[#fff] bg-[#35c5f0] font-semibold rounded-md"
            to={graceSharingWrite}
          >
            + 글쓰기
          </Link>
        </button>
      </div>
      <ul className="w-5/6 m-auto ">
        {graceSharing?.success &&
          allGraceSharing.map((item) => <Card item={item} key={item._id} />)}
      </ul>
      {graceSharing?.success && <div className="h-9 mt-5 " ref={ref}></div>}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default GraceSharing;

const Card = ({ item }) => {
  return (
    <li className="prays p-2 my-4 border-y-2 max-sm:text-xs">
      <Link
        className=" flex justify-between items-center flex-1 "
        to={{
          pathname: `/grace-sharing/${item._id}`,
          state: { item },
        }}
      >
        <div className="flex-1">
          <img
            className="grace-thumbnail rounded-md h-20"
            src={`http://localhost:8080/${item.imagePath}`}
          ></img>
        </div>

        <p className=" flex-1 transition-all text-[#333] font-semibold px-4 py-2 hover:text-[#FFA500]">
          {item.title}
        </p>
      </Link>
    </li>
  );
};
