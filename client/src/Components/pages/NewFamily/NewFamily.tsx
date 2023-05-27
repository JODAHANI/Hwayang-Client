import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNewFamily, combineNewFamily } from "_actions/newFamily_actions";
import LoadingSpinner from "Components/layout/LoadingSpinner/LoadingSpinner";
import { hwayangAdminServer } from "constants/routeItems";

let skip = 0;
const limit = 5;

const NewFamily = (): JSX.Element => {
  const dispatch: any = useDispatch();
  const newFamily = useSelector((state: any) => state?.newFamily?.newFamily);
  const allNewFamily = useSelector(
    (state: any) => state?.newFamily?.allNewFamily
  );

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
        const dispatchRequest = await dispatch(getNewFamily(body));
        await dispatch(combineNewFamily(dispatchRequest.payload.newFamily));
        setIsLoading(false);
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }
  );

  async function getNewFamilys(body) {
    if (!newFamily) {
      setIsLoading(true);
      const dispatchRequest = await dispatch(getNewFamily(body));
      await dispatch(combineNewFamily(dispatchRequest.payload.newFamily));
      setIsLoading(false);
    } else {
      if (newFamily.isScroll) {
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
    getNewFamilys(body);
  }, [allNewFamily]);

  return (
    <div className="m-auto max-w-screen-2xl">
      <div className="py-5 px-5">
        <h2 className="font-semibold max-sm:text-sm text-lg">🔥 새가족 소개</h2>
        <h3 className="p-4 py-1 text-[#888] text-sm max-sm:text-xs">
          - SHINE 영성으로 맞이해주세요!
        </h3>
      </div>
      <div>
        <ul className="flex flex-wrap justify-center">
          {newFamily?.success &&
            allNewFamily.map((item) => (
              <Card
                key={item._id}
                id={item._id}
                name={item.name}
                invitationPerson={item.invitationPerson}
                imagePath={item.imagePath}
                date={item.date}
              />
            ))}
          {newFamily?.success && <div className="h-9 mt-5" ref={ref}></div>}
        </ul>
        {isLoading && <LoadingSpinner />}
      </div>
    </div>
  );
};

const Card = ({
  id,
  name,
  invitationPerson,
  imagePath,
  date,
}: {
  name: string;
  invitationPerson: string;
  imagePath: string;
  id: string;
  date: string;
}) => {
  return (
    <li className="text-center m-5 mr-2 shadow-md rounded-lg">
      <Link
        to={{
          pathname: `/new-family/${id}`,
          state: { name, invitationPerson, imagePath, id, date },
        }}
        className="liink block w-72 max-sm:w-52"
      >
        <img
          className="block w-full rounded-lg"
          src={`${hwayangAdminServer}/${imagePath}`}
          alt="new family"
        />
        <div className="py-1">
          <span className="text-xs text-[#93C6E7] font-medium px-1">이름:</span>
          <span className="max-sm:text-sm text-[#7caccd] font-semibold px-1">
            {name}
          </span>
        </div>
      </Link>
    </li>
  );
};
export default NewFamily;
