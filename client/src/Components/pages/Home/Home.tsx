import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../index.css";
import NewFamilyNotification from "./NewFamilyNotification/NewFamilyNotification";
import Notification from "./Notification/Notification";
import SubNavigation from "./SubNavigation/SubNavigation";
import ThanksLetterNotification from "./ThanksLetterNotification/ThanksLetterNotification";
import {
  getNotification,
  getNewFamilys,
  getThanksLetters,
} from "_actions/home_action";
import LoadingSpinner from "Components/layout/LoadingSpinner/LoadingSpinner";

const limit = 10;
const skip = 0;

const body = {
  skip,
  limit,
};

const Home = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: any = useDispatch();
  const homeData = useSelector((state: any) => state?.home);

  const notification = homeData?.notification;
  const thanksLetters = homeData?.thanksLetters;
  const newFamilys = homeData?.newFamilys;

  const getHomeData = useCallback(async () => {
    const isData = Object.keys(homeData).length;
    if (!isData) {
      setIsLoading(true);
      await dispatch(getNotification());
      await dispatch(getNewFamilys(body));
      await dispatch(getThanksLetters(body));
      setIsLoading(false);
    }
  }, [dispatch, homeData]);

  useEffect(() => {
    getHomeData();
  }, [getHomeData]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="">
      <Notification notification={notification} />
      <SubNavigation />
      <NewFamilyNotification newFamilys={newFamilys} />
      <ThanksLetterNotification thanksLetters={thanksLetters} />
    </div>
  );
};

export default Home;
