import axios from "axios";
import React, { useRef, useState, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { Routes } from "constants/routeItems";
import { addGraceSharing } from "_actions/graceShare_action";
const { graceImageSave, graceSharing } = Routes;

const inputCss =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

const labelCss = "block text-gray-700 text-base font-bold mb-1 ";

const labelInputCss =
  "block shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer";

const ThanksLetterWrite = ({ user, history }): JSX.Element => {
  const dispatch: any = useDispatch();
  const QuillRef = useRef<ReactQuill>();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imageFileName, setImageFileName] = useState("사진을 선택해주세요.");
  const [errMessage, setErrMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const imageChangeHandler = (event) => {
    let file = event.target.files[0];
    file["path"] = file.name;
    setImageFile(file);
    setImageFileName(file.name);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const checkError = formErrorCheck();
    if (!checkError) {
      return;
    }
    setIsError(false);

    let formData = new FormData();
    formData.append("file", imageFile);
    const config: object = {
      header: { "content-type": "multipart/form-data" },
    };

    axios.post(graceImageSave, formData, config).then(async (res) => {
      if (res.data.success) {
        const body = {
          imagePath: res.data.imagePath,
          writer: user?.userData?.id,
          title,
          contents,
        };
        const requestDispatch = await dispatch(addGraceSharing(body));
        if (requestDispatch.payload.success) {
          history.replace({
            pathname: `${graceSharing}/${requestDispatch.payload.graceSharing._id}`,
            state: {
              item: requestDispatch.payload.graceSharing,
            },
          });
        }
      }
    });
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
    if (!imageFile) {
      setIsError(true);
      setErrMessage("새가족 사진을 업로드해주세요.");
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
          <label className={labelCss}>-이미지</label>
          <label className={labelInputCss} htmlFor="image">
            {imageFileName}
          </label>
          <input
            id="image"
            className="hidden"
            type="file"
            accept="image/jpg,impge/png,image/jpeg,"
            placeholder="이미지"
            onChange={imageChangeHandler}
          />
        </div>
        <div className="mb-4">
          <label className={labelCss} htmlFor="title">
            - 제목
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

export default ThanksLetterWrite;
