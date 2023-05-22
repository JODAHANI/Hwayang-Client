import React, { useRef, useState, useMemo, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { editLetters } from "_actions/letters_action";
import { useDispatch } from "react-redux";

const inputCss =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

const labelCss = "block text-gray-700 text-base font-bold mb-1 ";

const ThanksLetterEdit = (props): JSX.Element => {
  const dispatch: any = useDispatch();
  const item = props.location.state.item;
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState("");
  const [to, setTo] = useState("");
  const [title, setTitle] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setTo(item.to);
    setTitle(item.title);
    setContents(item.contents);
  }, [item]);

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const toHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTo(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const checkError = formErrorCheck();
    if (!checkError) {
      return;
    }
    setIsError(false);
    const body = {
      id: item._id,
      from: item.from._id,
      to,
      title,
      contents,
    };
    const requestDispatch = await dispatch(editLetters(body));
    if (requestDispatch.payload.success) {
      props.history.replace({
        pathname: `/thanks-letter/${requestDispatch.payload.letter._id}`,
        state: {
          item: requestDispatch.payload.letter,
        },
      });
    }
  };

  const formErrorCheck = () => {
    if (title.trim().length < 1) {
      setIsError(true);
      setErrMessage("제목을 작성해주세요.");
      return false;
    }
    if (contents.trim().length < 1) {
      setIsError(true);
      setErrMessage("본문 내용을 작성해주세요.");
      return false;
    }
    return true;
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ color: [] }, "bold", "italic", "underline"],

          [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
        ],
      },
    }),
    []
  );

  return (
    <div className="section-screen max-w-7xl m-auto">
      <form
        onSubmit={formSubmitHandler}
        className="h-auto w-10/12 m-auto py-5"
        method="POST"
        encType="multipart/form-data"
      >
        {isError && (
          <p className="text-[crimson] pb-2 text-sm font-bold">
            오류 : {errMessage}
          </p>
        )}

        <div className="mb-4">
          <label className={labelCss} htmlFor="to">
            -수신인
          </label>
          <input
            id="to"
            className={inputCss}
            type="text"
            placeholder="수신인을 입력해주세요."
            value={to}
            onChange={toHandler}
          />
        </div>
        <div className="mb-4">
          <label className={labelCss} htmlFor="title">
            -편지 제목
          </label>
          <input
            id="title"
            className={inputCss}
            type="text"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={titleHandler}
          />
        </div>
        <ReactQuill
          className="rounded-3xl"
          ref={(element) => {
            if (element !== null) {
              QuillRef.current = element;
            }
          }}
          value={contents}
          onChange={setContents}
          modules={modules}
          theme="snow"
          placeholder="내용을 입력해주세요."
        />
        <button
          className="block w-1/3 py-2 bg-[#35C5F0] text-[#fff] rounded-3xl m-auto mt-10 font-bold"
          type="submit"
        >
          쓰기
        </button>
      </form>
    </div>
  );
};

export default ThanksLetterEdit;
