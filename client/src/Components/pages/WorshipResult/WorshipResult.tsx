import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "Components/layout/LoadingSpinner/LoadingSpinner";
import { cancelWorship, getUserWorshipData } from "_actions/user_actions";
import { allGetWorship, subtractUser } from "_actions/worship_action";
import { hwayangAdminServer } from "constants/routeItems";
import moment from "moment";

const WorshipResult = ({ user, history }) => {
  const dispatch: any = useDispatch();
  const allWorship = useSelector((state: any) => state?.worship?.allWorship);
  const userWorship = useSelector((state: any) => state?.user?.userWorshipData);

  const [showModal, setShowModal] = useState(false);
  const [selectWorship, setSelectWorship] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getLoadWorship();
    requestGetUserData();
  }, [allWorship]);

  const getLoadWorship = async () => {
    if (!allWorship.length) {
      await dispatch(allGetWorship());
    }
  };

  const requestGetUserData = async () => {
    const body = {
      id: user?.userData?.id,
    };
    if (body.id) {
      setIsLoading((prev) => true);
      await dispatch(getUserWorshipData(body));
      setIsLoading((prev) => false);
    } else {
      history.push("/");
    }
  };

  const showModalHandler = (item) => {
    setSelectWorship(item);
    setShowModal((prev) => true);
  };

  const hideModalHandler = () => {
    setShowModal((prev) => false);
  };

  const applyHander = () => {
    hideModalHandler();
  };

  return (
    <div className="">
      {showModal && (
        <Modal
          item={selectWorship}
          offShowModal={hideModalHandler}
          user={user}
          dispatch={dispatch}
        />
      )}
      <div className="max-w-5xl m-auto px-5">
        <div className="flex justify-between py-5 items-center">
          <div>
            <h2 className="font-semibold">🏆 예배관리</h2>
            <h3 className="p-3 py-1 text-[#888] max-sm:text-xs text-sm italic">
              ※ 시간과 날짜를 꼼꼼히 체크해주세요 ※
            </h3>
          </div>
        </div>
        {isLoading && <LoadingSpinner />}
        <ul className="w-5/6 m-auto ">
          {userWorship?.success &&
            userWorship.userWorship.map((item) => (
              <Card key={item._id} item={item} onShowModal={showModalHandler} />
            ))}
        </ul>
      </div>
    </div>
  );
};

const Card = ({ item, onShowModal }) => {
  const worshipTime = moment(new Date(`${item.date}T${item.time}`));
  const nowDate: any = moment(Date.now());
  const prev = moment.duration(nowDate.diff(worshipTime)).asSeconds();
  const prevCheck = Math.sign(prev) < 0 ? false : true;

  return (
    <>
      {!prevCheck && (
        <li className="prays p-2 pl-5 my-4 shadow-md border-2 max-sm:text-xs w-full h-full relative max:sm:my-5 max-lg:px-2 max-lg:rounded-lg">
          <div className="worship-card h-auto flex my-3 max-lg:block max-sm:my-0">
            <img
              className="h-32 block rounded-md max-sm:m-auto max-lg:h-full m-auto max-sm:w-full"
              src={`${hwayangAdminServer}/${item.imagePath}`}
              alt="설교자 사진"
            />
            <div className="center flex flex-col flex-start px-4 text-[#999] py-2 max-lg:my-4 max-sm:block max-sm:my-0 max-sm:mt-2">
              <div className=" flex items-center text-lg ">
                <span className="font-bold text-[#017d53] mx-2">
                  {item.title}
                </span>
              </div>
              <div className=" flex items-center text-lg mb-2">
                <span className="font-bold text-[#00A36C] ml-3">
                  - {item.speaker} -
                </span>
              </div>
              <div className="text-sm flex items-center italic font-semibold max-sm:text-xs max-sm:block">
                <span>날짜 : </span>
                <span className="mx-2 ml-1 text">{item.date}</span>
                <div className="hidden max-sm:block"></div>
                <span> 시간: </span>
                <span className="mx-1">{item.time}분</span>
              </div>
              <div className="hidden max-sm:block max-sm:my-1"></div>
              <div className="text-sm flex items-center italic font-semibold max-sm:text-xs max-sm:block ">
                <span>오픈 날짜 : </span>
                <span className="mx-2 ml-1">{item.openDate}</span>
                <div className="hidden max-sm:block"></div>
                <span>오픈 시간: </span>
                <span className="mx-1">{item.openTime}분</span>
              </div>
              <div className="text-sm flex items-center italic font-semibold max-sm:text-xs max-sm:my-1">
                <span>신청인원 : </span>
                <span className="mx-1">{item.parti.length}</span>
              </div>
            </div>
            <div className="flex items-center mr-2 py-2">
              <button
                type="button"
                onClick={() => onShowModal(item)}
                className="block px-4 text-[#fff] bg-[#f5c2a1] font-bold rounded-md max:sm:py-2 py-2 max-lg:w-full"
              >
                취소하기
              </button>
            </div>
          </div>
        </li>
      )}
    </>
  );
};

const Modal = ({ item, offShowModal, user, dispatch }) => {
  const [page, setPage] = useState(0);
  const [isPush, setIsPush] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const nextPageHandler = async (item) => {
    setIsPush((prev) => true);
    const body = {
      id: item._id,
      userId: user.userData.id,
    };
    const requestDispatch = await dispatch(cancelWorship(body));
    if (requestDispatch.payload.success) {
      await dispatch(subtractUser(body));
      setPage((prev) => 1);
    } else {
      setErrorMessage((prev) => requestDispatch.payload.message);
      setPage((prev) => 2);
    }
  };

  const hideModalHandler = () => {
    offShowModal();
  };

  return (
    <div
      className={`backgroud-black w-full h-screen fixed bg-black bg-opacity-40 -top-0 z-40 animate-fadeInIn`}
    >
      <div className="backgroud-white absolute m-auto w-full max-w-5xl left-1/2 bg-[#fff] -translate-x-1/2 px-10 py-20 ">
        {!page && (
          <div className="m-auto w-ful h-full px-5 ">
            <div className="flex justify-between">
              <h3 className="text-3xl max-sm:text-sm text-[#00A36C] font-black">
                - {item.title}
              </h3>
              <button type="button" className="text-3xl" onClick={offShowModal}>
                ❌
              </button>
            </div>
            <h4 className="p-5 text-[#777] text-lg max-sm:text-xs">
              ※ 취소시 신청 복구는 불가능합니다.※
            </h4>
            <button
              type="button"
              disabled={isPush}
              className="w-full my-10 flex justify-center px-5 items-center py-5 rounded-md bg-[#f5c2a1] text-[#fff] font-bold text-2xl"
              onClick={() => nextPageHandler(item)}
            >
              취소하기
            </button>
          </div>
        )}
        {page === 1 && (
          <div className="m-auto w-ful h-full px-5">
            <h3 className="text-3xl max-sm:text-sm text-[#017d53] font-black">
              - 취소가 완료되었습니다.
            </h3>
            <button
              className="w-full my-10 flex justify-center px-5 items-center py-5 rounded-md bg-[#f5c2a1] text-[#fff] font-bold text-3xl"
              onClick={hideModalHandler}
            >
              닫기
            </button>
          </div>
        )}
        {page === 2 && (
          <div className="m-auto w-ful h-full px-5">
            <h3 className="text-3xl max-sm:text-sm text-[#fb4e4e] font-black">
              - 요청 실패
            </h3>
            <h4 className="text-xl max-sm:text-xs text-[#888] font-black pt-5 px-3">
              {errorMessage}...
            </h4>
            <button
              className="w-full my-10 flex justify-center px-5 items-center py-5 rounded-md bg-[#f5c2a1] text-[#fff] font-bold text-3xl"
              onClick={hideModalHandler}
            >
              닫기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorshipResult;
