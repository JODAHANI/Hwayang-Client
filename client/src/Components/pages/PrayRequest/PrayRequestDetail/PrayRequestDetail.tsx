import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deletePrays, editPrays } from "../../../../_actions/pray_actions";
import NotFound from "Components/layout/NotFound/NotFound";
import LoadingSpinner from "../../../layout/LoadingSpinner/LoadingSpinner";

const inputLabelCss =
  "p-3 rounded-md bg-[#f0f0f0] w-full border border-[#ccc] focus:bg-[#fff] focus:outline-cyan-500 max-sm:p-1";
const btnCss =
  "bg-[#3ed1fe] text-[#fff] rounded-md py-1 px-5 font-bold border border-[#3ed1fe] text-sm";

const PrayRequestDetail = (props) => {
  const dispatch: any = useDispatch();
  const params: any = useParams();
  const user = props?.user?.userData;
  const prays = useSelector((state: any) => state?.pray);
  const id = params.id;
  const [pray, setPray] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isForm, setIsForm] = useState(false);
  const [isNull, setIsNull] = useState(null);
  const checkedRef: any = useRef(false);

  const requestData = async () => {
    const body = {
      id,
    };

    const axiosRequest = await axios.post("/api/users/pray-request", body);
    const { data } = axiosRequest;
    if (data.success) {
      setPray(data.pray);
      setTitle(data.pray.title);
      setText(data.pray.text);
    } else {
      setIsNull(true);
    }
  };
  useEffect(() => {
    requestData();
  }, []);

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const isSecret = checkedRef.current.checked;
    const body = {
      id,
      title,
      text,
      writer: user?.id,
      isSecret,
    };
    setIsForm(false);
    setPray(null);
    await dispatch(editPrays(body, prays));
    requestData();
  };

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };
  const textHandler = (event) => {
    setText(event.target.value);
  };

  const formActivityHandler = () => {
    setIsForm((prev) => !prev);
  };

  const deleteHandler = async () => {
    const body = {
      id,
    };
    await dispatch(deletePrays(body, prays));
    props.history.push("/prayer-request");
  };
  if (isNull) return <NotFound />;
  if (pray == null) return <LoadingSpinner />;

  return (
    <>
      <figure className="bg-[#41cef9] text-white rounded-md p-12 m-auto my-10 mb-5 max-w-screen-md w-5/6 font-bold shadow-md">
        <p className="text-lg max-sm:text-sm">{pray.text}</p>
        <div className="text-md max-sm:text-xs italic text-[#f0ffa3] text-right mt-10">
          <figcaption>{pray?.title}</figcaption>
          <h3>
            - {pray?.writer.name} {pray?.writer.position.position} -
          </h3>
        </div>
      </figure>
      <div className="mt-5">
        {user?.id === pray.writer._id && (
          <div className="m-auto max-w-screen-md w-5/6 flex justify-end px-5 mb-5">
            <button
              className="mr-4 rounded-lg text-[#777] max-sm:text-xs font-semibold px text-sm"
              type="button"
              onClick={formActivityHandler}
            >
              수정
            </button>
            <button
              className="rounded-lg text-[#777] max-sm:text-xs font-semibold px text-sm"
              type="button"
              onClick={deleteHandler}
            >
              삭제
            </button>
          </div>
        )}
        {isForm && (
          <div className="p-5 m-auto shadow-xl bg-white rounded-lg border w-5/6 max-w-5xl">
            <form onSubmit={submitFormHandler} className="relative">
              <div className="mb-4">
                <label htmlFor="title" className="block font-bold mb-2">
                  기도제목
                </label>
                <input
                  className={inputLabelCss}
                  type="text"
                  id="title"
                  value={title}
                  onChange={titleHandler}
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
                  value={text}
                  onChange={textHandler}
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
        )}
      </div>
    </>
  );
};

export default PrayRequestDetail;
