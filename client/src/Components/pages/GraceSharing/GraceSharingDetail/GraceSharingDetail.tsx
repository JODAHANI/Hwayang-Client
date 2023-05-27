import { deleteGraceSharing } from "_actions/graceShare_action";
import React from "react";
import { useDispatch } from "react-redux";
import { Routes, hwayangImageUrl } from "constants/routeItems";
const { graceSharing } = Routes;

const GraceSharingDetail = (props): JSX.Element => {
  const dispatch: any = useDispatch();
  const item = props.location.state.item;
  const user = props?.user?.userData;

  const deleteHandler = async () => {
    const body = {
      id: item._id,
    };
    const requestDispatch = await dispatch(deleteGraceSharing(body));
    if (requestDispatch.payload.success) {
      props.history.push(graceSharing);
    }
  };

  const editHandler = () => {
    console.log("수정");
  };
  return (
    <div>
      <figure className="rounded-xl py-12 px-8 m-auto mt-10 max-w-screen-md w-5/6 shadow-lg border-2">
        <img
          className="rounded block m-auto"
          src={`${hwayangImageUrl}/${item.imagePath}`}
          alt="공지이미지"
        />
        <p
          className="text-lg max-sm:text-sm my-10"
          dangerouslySetInnerHTML={{ __html: item.contents }}
        ></p>
        <div className="text-md max-sm:text-xs italic text-[#41cef9] font-extrabold text-right mt-10">
          <figcaption>{item?.title}</figcaption>
        </div>
      </figure>
      {item.writer._id == user?.id && (
        <div className="m-auto max-w-screen-md w-5/6 flex justify-end px-5 my-5">
          <button
            className="text-gray-400 max-sm:text-xs font-semibold mx-2 hover:text-gray-500 duration-100	"
            type="button"
            onClick={editHandler}
          >
            수정
          </button>
          <button
            className="text-gray-400 max-sm:text-xs font-semibold mx-2 hover:text-gray-500 duration-100"
            type="button"
            onClick={deleteHandler}
          >
            삭제
          </button>
        </div>
      )}
      {item.writer == user?.id && (
        <div className="m-auto max-w-screen-md w-5/6 flex justify-end px-5 my-5">
          <button
            className="text-gray-400 max-sm:text-xs font-semibold mx-2 hover:text-gray-500 duration-100	"
            type="button"
            onClick={editHandler}
          >
            수정
          </button>
          <button
            className="text-gray-400 max-sm:text-xs font-semibold mx-2 hover:text-gray-500 duration-100"
            type="button"
            onClick={deleteHandler}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default GraceSharingDetail;
