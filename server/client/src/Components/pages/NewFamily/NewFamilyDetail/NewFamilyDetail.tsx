import { useLocation } from "react-router-dom";

const NewFamilyDetail = () => {
  const location: {
    state: {
      name: string;
      invitationPerson: string;
      imagePath: string;
      date: string;
    };
  } = useLocation();

  const name = location.state.name;
  const invitationPerson = location.state.invitationPerson;
  const imagePath = location.state.imagePath;
  const date = location.state.date;

  return (
    <div className="max-w-screen-xl	m-auto">
      <div className="p-3">
        <div className=" w-full text-2xl py-3 px-8 mt-8 font-bold max-sm:text-xl max-sm:px-3 bg-[#FFD4D4] rounded-t-xl">
          <span className="text-base text-[#fff] font-extrabold px-1">
            이름:
          </span>
          <span className="max-sm:text-sm text-[#fff] font-semibold px-1">
            {name}
          </span>
        </div>
        <img src={`http://localhost:80/${imagePath}`} alt="공지이미지" />
      </div>
      <div className="px-5">
        <h2 className="p-4 font-semibold  bg-[#B4E4FF] my-2 text-[#fff] max-sm:font-xs rounded-lg">
          인도자 : {invitationPerson}
        </h2>
        <h3 className="p-4 font-semibold bg-[#95BDFF] my-2 text-[#fff] max-sm:font-xs rounded-lg">
          등록일 : {date}
        </h3>
      </div>
    </div>
  );
};

export default NewFamilyDetail;
{
  /* <span className="text-xs text-[#222] font-medium px-1">이름:</span>
          <span className="max-sm:text-sm text-[#0067a3] font-semibold px-1">
            {name}
          </span> */
}
