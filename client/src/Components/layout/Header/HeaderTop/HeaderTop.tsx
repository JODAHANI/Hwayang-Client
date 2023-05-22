import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../../../../index.css";
import {
  Routes,
  RoutesText,
  RoutesIcon,
} from "../../../../constants/routeItems";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { RouteType, ReduxStateType } from "../../../../constants/types";
import { userLogout } from "../../../../_actions/user_actions";

type NaviItemType = {
  item: RouteType;
};

const {
  login,
  signUp,
  prayRequest,
  graceSharing,
  myPage,
  onlineWorship,
  worshipApply,
  worshipResult,
  newFamily,
  quietTime,
  thanksLetter,
  proclamation,
  worshipGuide,
} = Routes;

const {
  worshipApplyIcon,
  worshipResultIcon,
  newFamilyIcon,
  onlineWorshipIcon,
  quietTimeIcon,
  prayRequestIcon,
  thanksLetterIcon,
  graceSharingIcon,
  proclamationIcon,
  worshipGuideIcon,
} = RoutesIcon;

const {
  logoutText,
  loginText,
  signUpText,
  prayRequestText,
  graceSharingText,
  myPageText,
  onlineWorshipText,
  worshipApplyText,
  worshipResultText,
  newFamilyText,
  quietTimeText,
  thanksLetterText,
  proclamationText,
  worshipGuideText,
} = RoutesText;
const deskTopLeftNavigationItem = [
  { route: prayRequest, text: prayRequestText },
  { route: graceSharing, text: graceSharingText },
];

const deskTopRightNavigationItem = [
  { route: login, text: loginText },
  { route: signUp, text: signUpText },
];

const mobileNavigationItem = [
  { route: worshipApply, text: worshipApplyText, icon: worshipApplyIcon },
  { route: worshipResult, text: worshipResultText, icon: worshipResultIcon },
  { route: newFamily, text: newFamilyText, icon: newFamilyIcon },
  { route: onlineWorship, text: onlineWorshipText, icon: onlineWorshipIcon },
  { route: quietTime, text: quietTimeText, icon: quietTimeIcon },
  { route: prayRequest, text: prayRequestText, icon: prayRequestIcon },
  { route: thanksLetter, text: thanksLetterText, icon: thanksLetterIcon },
  { route: graceSharing, text: graceSharingText, icon: graceSharingIcon },
  { route: proclamation, text: proclamationText, icon: proclamationIcon },
  { route: worshipGuide, text: worshipGuideText, icon: worshipGuideIcon },
];

// 데스크탑 CSS
const deskTopheaderTopCss = "flex justify-between items-center m-auto p-3 px-5";

// 모바일 CSS
const mobileHeaderTopCss = "flex justify-between items-center m-auto py-2 px-5";
const mobileSidebarContainerCss = "fixed z-50 top-0 w-full h-full bg-[#000]/80";
const mobileSidebarInnerCss =
  "absolute top-0 w-3/5 h-full bg-[#fff] transition-all  duration-100";
const rounded = "rounded-br-lg rounded-tr-lg";
const spanCss = "block w-full h-0.5 absolute bg-[#000] left-0 cursor-pointer";

const HeaderTop = (): JSX.Element => {
  const user = useSelector((state: ReduxStateType) => state.user);
  return (
    <div className="header-top">
      <div className={`desk-top ${deskTopheaderTopCss}`}>
        <DeskTopView user={user} />
      </div>
      <div className={`mobile ${mobileHeaderTopCss}`}>
        <MobileView user={user} />
      </div>
    </div>
  );
};

// 데스크탑View 컴포넌트
const DeskTopView = ({ user }) => {
  const dispatch: any = useDispatch();
  const history = useHistory();
  const logoutHandler = () => {
    dispatch(userLogout()).then((res) => {
      if (res.payload.success) {
        localStorage.clear();
        history.push("/login");
      }
    });
  };
  if (user.userData && user.userData.isAuth) {
    return (
      <>
        <div className="text-[#333] font-bold">
          <ul className="flex justify-center items-center text-xs ">
            {deskTopLeftNavigationItem.map((item) => (
              <NavigationItem key={item.route} item={item} />
            ))}
          </ul>
        </div>
        <Link to="/">
          <h2 className="text-3xl font-black hover:text-zinc-700 transition-all tracking-wider max-md:text-2xl">
            Anointing Hwayang
          </h2>
        </Link>
        <div>
          <ul className="flex justify-center items-center text-xs text-[#333] font-bold ">
            <li className="px-3">
              <Link to={myPage}>{myPageText}</Link>
            </li>
            <li className="px-3">
              <Link to="" onClick={logoutHandler}>
                {logoutText}
              </Link>
            </li>
          </ul>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="text-[#333] font-bold">
        <ul className="flex justify-center items-center text-xs ">
          {deskTopLeftNavigationItem.map((item) => (
            <NavigationItem key={item.route} item={item} />
          ))}
        </ul>
      </div>
      <Link to="/">
        <h2 className="text-3xl font-black hover:text-zinc-700 transition-all tracking-wider max-md:text-2xl">
          Anointing Hwayang
        </h2>
      </Link>
      <div>
        <ul className="flex justify-center items-center text-xs text-[#333] font-bold ">
          {deskTopRightNavigationItem.map((item) => (
            <NavigationItem key={item.route} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
};

//모바일 View 컴포넌트
const MobileView = ({ user }): JSX.Element => {
  const [inputCheckbox, setinputCheckbox] = useState(false);

  const inputCheckboxHandler = () => {
    setinputCheckbox((prev) => {
      return !prev;
    });
  };

  return (
    <>
      <div className="text-sm font-semibold w-4	h-3 cursor-pointer">
        <input
          id="trigger"
          type="button"
          className="hidden"
          onClick={inputCheckboxHandler}
        />
        <label
          className="block relative w-full h-full cursor-pointer"
          htmlFor="trigger"
        >
          <span className={`${spanCss} top-0`}></span>
          <span className={`${spanCss} top-1/2`}></span>
          <span className={`${spanCss} top-full`}></span>
        </label>
        {inputCheckbox ? (
          <div
            className={`${mobileSidebarContainerCss} left-0`}
            onClick={inputCheckboxHandler}
          >
            <div
              className={`${mobileSidebarInnerCss} ${rounded}  left-0 ease-in `}
            >
              <p className="px-4 py-10 font-extrabold text-xl border-b">
                - MENU
              </p>
              <ul>
                {mobileNavigationItem.map((item) => (
                  <MobileNavigationItem key={item.route} item={item} />
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className={`${mobileSidebarContainerCss} -left-full`}>
            <div
              className={`${mobileSidebarInnerCss} -left-full ease-out`}
            ></div>
          </div>
        )}
      </div>
      <Link to="/">
        <h2 className="text-xl font-black hover:text-zinc-700 transition-all ">
          Anointing Hwayang
        </h2>
      </Link>
      <div className="text-sm font-medium w-4	h-5">
        <div className=" flex justify-center items-center">
          {user?.userData && !user?.userData?.isAuth ? (
            <Link className="flex justify-center items-center" to={login}>
              <FontAwesomeIcon
                className="my-0.5 text-[#000]"
                icon={faUser}
                size="lg"
              />
            </Link>
          ) : (
            <Link className="flex justify-center items-center" to={myPage}>
              <FontAwesomeIcon
                className="my-0.5 text-[#000]"
                icon={faUser}
                size="lg"
              />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

const NavigationItem = ({ item }: NaviItemType): JSX.Element => {
  return (
    <li className="px-3">
      <Link to={item.route}>{item.text}</Link>
    </li>
  );
};

const MobileNavigationItem = ({ item: { route, text, icon } }): JSX.Element => {
  return (
    <li>
      <Link
        className="px-2 py-3 flex border-b text-[#005A9C] text-md items-center"
        to={route}
      >
        <span className="mx-4 mr-3"> {icon}</span>
        <span className="italic font-black">{text}</span>
      </Link>
    </li>
  );
};

export default HeaderTop;
