import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, userLogout } from "_actions/user_actions";
import MyGraceSharing from "./MyGraceSharing/GraceSharing";
import MyPrays from "./MyPrays/Prays";
import MyThanksLetters from "./MyThanksLetters/MyThanksLetters";
import LoadingSpinner from "Components/layout/LoadingSpinner/LoadingSpinner";

const MyPage = ({ history, user }) => {
  const userDocuments = useSelector((state: any) => state?.user?.userDocuments);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch: any = useDispatch();
  const isBoolean = user?.userData !== undefined;
  useEffect(() => {
    userDataGet();
  }, []);

  const userDataGet = async () => {
    setIsLoading((prev) => true);
    if (isBoolean) {
      const body = {
        id: user?.userData?.id,
      };
      await dispatch(getUserData(body));
      setIsLoading((prev) => false);
    } else {
      history.push("/");
    }
  };
  const logoutHandler = async () => {
    await dispatch(userLogout()).then((res) => {
      history.replace("/");
    });
  };
  return (
    <div className="max-w-5xl m-auto">
      <div className="flex justify-between py-5 px-7 ">
        <div className="flex justify-between">
          <div>
            <h2 className="font-semibold">😀 마이 페이지</h2>
            <h3 className="p-3 py-1 text-[#777] max-sm:text-xs text-sm">
              - {user?.userData?.name}님 환영합니다!
            </h3>
          </div>
        </div>
        <div>
          <button
            className="text-[#278ba9] font-bold text-sm"
            onClick={logoutHandler}
          >
            로그아웃
          </button>
        </div>
        {isLoading && <LoadingSpinner />}
      </div>
      <div className="max-sm:px-4">
        {userDocuments?.success && (
          <MyGraceSharing item={userDocuments?.userDocuments?.graceSharing} />
        )}
        {userDocuments?.success && (
          <MyPrays item={userDocuments?.userDocuments?.prays} />
        )}
        {userDocuments?.success && (
          <MyThanksLetters item={userDocuments?.userDocuments?.letters} />
        )}
      </div>
    </div>
  );
};

export default MyPage;
