import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  postPrays,
  addPrays,
  combinePrays,
} from "../../../_actions/pray_actions";
import LoadingSpinner from "../../layout/LoadingSpinner/LoadingSpinner";

const inputLabelCss =
  "p-3 rounded-md bg-[#f0f0f0] w-full border border-[#ccc] focus:bg-[#fff] focus:outline-cyan-500 max-sm:p-1 max-sm:px-3";
const btnCss =
  "bg-[#3ed1fe] text-[#fff] rounded-md py-1 px-5 font-bold border border-[#3ed1fe] text-sm";

const limit = 30;
let skip = 0;

const PrayRequest = (props) => {
  const dispatch: any = useDispatch();
  const user = useSelector((state: { user: any }) => state.user);
  const prays = useSelector((state: any) => state?.pray?.prays);
  const allPrays = useSelector((state: any) => state?.pray?.allPrays);
  const [isLoading, setIsLoading] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const titleInputRef: any = useRef();
  const textInputRef: any = useRef();
  const checkedRef: any = useRef(false);
  const ref = useRef(null);

  const submitFormHandler = async (event) => {
    event.preventDefault();
    const title = titleInputRef.current.value;
    const text = textInputRef.current.value;
    const isSecret = checkedRef.current.checked;
    const body = {
      title,
      text,
      writer: user?.userData?.id,
      isSecret,
    };
    const axiosRequest = await axios.post(
      "/api/users/pray-request/write",
      body
    );
    const data = axiosRequest.data;
    if (data.success) {
      dispatch(addPrays(prays, data.pray));
    }
    setIsForm(false);
  };

  const isFormHandler = () => {
    setIsForm((prev) => !prev);
  };

  const observer = new IntersectionObserver(
    async ([e]) => {
      if (e.isIntersecting) {
        setIsLoading((prev) => true);
        skip += limit;
        const body = {
          limit,
          skip,
        };
        const dispatchRequest = await dispatch(postPrays(body));
        const a = await dispatch(combinePrays(dispatchRequest.payload.pray));
        setIsLoading((prev) => false);
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }
  );

  async function getLoadPrays(body) {
    if (!prays) {
      setIsLoading((prev) => true);
      const dispatchRequest = await dispatch(postPrays(body));
      const a = await dispatch(combinePrays(dispatchRequest.payload.pray));
      console.log(a);
      setIsLoading((prev) => false);
    } else {
      if (prays.isScroll) {
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
    getLoadPrays(body);
  }, [allPrays]);

  const FormLayOut = () => {
    return (
      <div className="p-5 m-auto shadow-md bg-white rounded-lg w-5/6 mb-8">
        <form onSubmit={submitFormHandler} className="relative">
          <div className="mb-4">
            <label htmlFor="title" className="block font-bold mb-2">
              기도제목
            </label>
            <input
              className={inputLabelCss}
              type="text"
              id="title"
              ref={titleInputRef}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="text" className="block font-bold mb-2">
              내용
            </label>
            <textarea
              className={inputLabelCss}
              id="text"
              rows={5}
              ref={textInputRef}
            ></textarea>
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="title" className="font-bold mr-2">
              전교인 공유
            </label>
            <input
              type="checkbox"
              className="cursor-pointer"
              ref={checkedRef}
              defaultChecked={false}
            />
          </div>
          <div className="text-right">
            <button type="submit" className={btnCss}>
              전송
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="max-w-5xl m-auto">
      <div className="flex justify-between py-5 px-5">
        <div>
          <h2 className="font-semibold">🙏🏻 기도요청</h2>
          <h3 className="p-3 py-1 text-[#888] max-sm:text-xs text-sm">
            - 기도 제목을 공유해주세요!
          </h3>
        </div>

        <div>
          <button
            type="button"
            className="inline-block py-2 px-4 text-xs text-[#fff] bg-[#3ed1fe] font-bold rounded-lg max:sm:py-1"
            onClick={isFormHandler}
          >
            {!isForm ? "+ 글쓰기" : "- 취소"}
          </button>
        </div>
      </div>
      {isForm && <FormLayOut />}
      <ul className="w-5/6 m-auto ">
        {prays?.success &&
          allPrays.map((item) => (
            <Card key={item._id} item={item} user={user} />
          ))}
      </ul>
      {prays?.success && <div className="h-9 my-1" ref={ref}></div>}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default PrayRequest;

const Card = ({ item, user }) => {
  const { userData } = user;
  if (item.isSecret && item.writer._id !== userData.id) {
    return (
      <li className="prays p-2 pl-5 my-4 flex justify-between items-center shadow-md border-2 rounded-xl max-sm:text-xs">
        <p className="font-semibold text-[#333]">Private 🔒</p>
        <Link
          className="transition-all	text-[#3ed1fe] font-extrabold px-4 py-2 hover:text-[#FFA500]"
          to={`/not-found`}
        >
          view
        </Link>
      </li>
    );
  }
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
