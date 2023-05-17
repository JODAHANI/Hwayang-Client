import { Switch, Route } from "react-router-dom";
import Home from "./Components/pages/Home/Home";
import Login from "./Components/pages/Login/Login";
import Header from "./Components/layout/Header/Header";
import OnlineWorship from "./Components/pages/OnlineWorship/OnlineWorship";
import QuietTime from "./Components/pages/QuietTime/QuietTime";
import WorshipResult from "./Components/pages/WorshipResult/WorshipResult";
import WorshipApply from "./Components/pages/WorshipApply/WorshipApply";
import WorshipGuide from "./Components/pages/WorshipGuide/WorshipGuide";
import SignUp from "./Components/pages/SignUp/SignUp";
import PrayRequest from "./Components/pages/PrayRequest/PrayRequest";
import PrayRequestDetail from "./Components/pages/PrayRequest/PrayRequestDetail/PrayRequestDetail";
import GraceSharing from "./Components/pages/GraceSharing/GraceSharing";
import GraceSharingWrite from "./Components/pages/GraceSharing/GraceSharingWrite/GraceSharingWrite";
import GraceSharingDetail from "./Components/pages/GraceSharing/GraceSharingDetail/GraceSharingDetail";
import NotFound from "./Components/layout/NotFound/NotFound";
import { Routes } from "./constants/routeItems";
import Auth from "./Components/Hoc/Auth";
import MyPage from "./Components/pages/MyPage/Mypage";
import Proclamation from "Components/pages/Proclamation/Proclamation";
import ThanksLetter from "Components/pages/ThanksLetter/ThanksLetter";
import NewFamily from "Components/pages/NewFamily/NewFamily";
import NewFamilyDetail from "Components/pages/NewFamily/NewFamilyDetail/NewFamilyDetail";
import NotificationDetail from "Components/pages/Home/Notification/NotificationDetail/NotificationDetail";
import ThanksLetterWrite from "Components/pages/ThanksLetter/ThanksLetterWrite/ThanksLetterWrite";
import ThanksLetterDetail from "Components/pages/ThanksLetter/ThanksLetterDetail/ThanksLetterDetail";
import ThanksLetterEdit from "Components/pages/ThanksLetter/ThanksLetterEdit/ThanksLetterEdit";

const {
  home,
  login,
  signUp,
  worshipApply,
  worshipResult,
  onlineWorship,
  worshipGuide,
  quietTime,
  prayRequest,
  graceSharing,
  myPage,
  thanksLetter,
  proclamation,
  newFamily,
  newFamilyDetail,
  notificationDetail,
  thanksLetterWrite,
  thanksLetterDetail,
  thanksLetterEdit,
  prayRequestDetail,
  graceSharingWrite,
  graceSharingDetail,
} = Routes;

const App = () => {
  return (
    <div className=" bg-white">
      <Header />
      <Switch>
        <Route exact path={home} component={Auth(Home, null)} />
        <Route exact path={login} component={Auth(Login, false)} />
        <Route exact path={signUp} component={Auth(SignUp, false)} />
        <Route exact path={worshipApply} component={Auth(WorshipApply, true)} />
        <Route
          exact
          path={worshipResult}
          component={Auth(WorshipResult, null)}
        />
        <Route
          exact
          path={onlineWorship}
          component={Auth(OnlineWorship, null)}
        />
        <Route exact path={quietTime} component={Auth(QuietTime, null)} />
        <Route exact path={worshipGuide} component={Auth(WorshipGuide, null)} />
        <Route exact path={prayRequest} component={Auth(PrayRequest, true)} />
        <Route
          exact
          path={prayRequestDetail}
          component={Auth(PrayRequestDetail, true)}
        />
        <Route exact path={graceSharing} component={Auth(GraceSharing, true)} />
        <Route
          exact
          path={graceSharingWrite}
          component={Auth(GraceSharingWrite, null)}
        />
        <Route
          exact
          path={graceSharingDetail}
          component={Auth(GraceSharingDetail, null)}
        />
        <Route exact path={myPage} component={Auth(MyPage, null)} />
        <Route exact path={proclamation} component={Auth(Proclamation, null)} />
        <Route
          exact
          path={notificationDetail}
          component={Auth(NotificationDetail, null)}
        />
        <Route exact path={newFamily} component={Auth(NewFamily, true)} />
        <Route
          exact
          path={newFamilyDetail}
          component={Auth(NewFamilyDetail, null)}
        />
        <Route exact path={thanksLetter} component={Auth(ThanksLetter, true)} />
        <Route
          exact
          path={thanksLetterWrite}
          component={Auth(ThanksLetterWrite, true)}
        />
        <Route
          exact
          path={thanksLetterDetail}
          component={Auth(ThanksLetterDetail, true)}
        />
        <Route
          exact
          path={thanksLetterEdit}
          component={Auth(ThanksLetterEdit, null)}
        />
        <Route path="*" component={Auth(NotFound, null)}></Route>
      </Switch>
    </div>
  );
};

export default App;
