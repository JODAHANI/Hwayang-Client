import { Routes } from "constants/routeItems";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { combineLetters, getThanksLetters } from "_actions/letters_action";
import LoadingSpinner from "Components/layout/LoadingSpinner/LoadingSpinner";

const { thanksLetterWrite } = Routes;
const limit = 30;
let skip = 0;

const ThanksLetter = () => {
  const dispatch: any = useDispatch();
  const letters = useSelector((state: any) => state?.letters?.letters);
  const allLetters = useSelector((state: any) => state?.letters?.allLetters);
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
        const dispatchRequest = await dispatch(getThanksLetters(body));
        await dispatch(combineLetters(dispatchRequest.payload.letters));

        setIsLoading(false);
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }
  );

  async function getLetters(body) {
    if (!letters) {
      setIsLoading(true);
      const dispatchRequest = await dispatch(getThanksLetters(body));
      await dispatch(combineLetters(dispatchRequest.payload.letters));
      setIsLoading(false);
    } else {
      if (letters.isScroll) {
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
    getLetters(body);
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [letters, allLetters]);

  return (
    <div className="max-w-5xl m-auto">
      <div className="flex justify-between py-5 px-5">
        <div>
          <h2 className="font-semibold">💌 감사편지</h2>
          <h3 className="p-3 py-1 text-[#888] max-sm:text-xs text-sm">
            - 마음을 담아 감사한 분께 작성해주세요!
          </h3>
        </div>

        <button type="button">
          <Link
            className="inline-block py-2 px-3 text-xs text-[#fff] bg-[#35c5f0] font-semibold rounded-md "
            to={{
              pathname: `${thanksLetterWrite}`,
            }}
          >
            + 편지쓰기
          </Link>
        </button>
      </div>

      <ul className="pt-5 px-5 flex flex-wrap justify-center ">
        {letters?.success &&
          allLetters.map((item) => <Card item={item} key={item._id} />)}
      </ul>
      {letters?.success && <div className="h-9 my-1" ref={ref}></div>}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

const Card = ({ item }) => {
  return (
    <li className="text-center m-3 mr-2 rounded-lg list-none">
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

export default ThanksLetter;
