import { hwayangAdminServer } from "constants/routeItems";
import { useLocation } from "react-router-dom";

interface LocationState {
  pathname: string;
  state: {
    item: {
      _id: string;
      title: string;
      imagePath: string;
      contents: string;
    };
  };
}

const NotificationDetail = (): JSX.Element => {
  const location: LocationState = useLocation();
  const title = location.state.item.title;
  const imagePath = location.state.item.imagePath;
  const contents = location.state.item.contents;

  return (
    <div className="max-w-screen-xl	m-auto border-2 rounded-lg my-5 shadow-lg w-11/12 ">
      <div className="p-5">
        <h2 className="text-2xl py-3 px-8 mb-6 font-bold border-b-2 max-sm:text-lg max-sm:px-3 max-sm:py-1 text-[#222]">
          {title}
        </h2>
        <img src={`${hwayangAdminServer}/${imagePath}`} alt="공지이미지" />
      </div>
      <div className="p-5">
        <div
          className="max-sm:text-sm"
          dangerouslySetInnerHTML={{ __html: contents }}
        ></div>
      </div>
    </div>
  );
};

export default NotificationDetail;
