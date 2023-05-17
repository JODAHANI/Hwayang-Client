import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import "../../../index.css";

const inputCss =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
const labelCss = "block text-gray-700 text-base font-bold mb-1";

const positions = [
  { id: 0, position: "--직분선택--" },
  { id: 1, position: "사역자" },
  { id: 2, position: "장로" },
  { id: 3, position: "권사" },
  { id: 4, position: "집사" },
  { id: 5, position: "청년" },
  { id: 6, position: "학생" },
];

interface userSchema {
  account: string;
  password: string;
  checkPassword: string;
  name: string;
  phoneNumber: string;
  position: {
    id: string | number;
    position: string;
  };
}

const SignUp = (props): JSX.Element => {
  const newUserSchema: userSchema = {
    account: "",
    password: "",
    checkPassword: "",
    name: "",
    phoneNumber: "",
    position: { id: 0, position: "--직분선택--" },
  };

  const [newUserData, setNewUserData] = useState(newUserSchema);
  const [signUpError, setSignUpError] = useState(false);
  const [signUpErrorMessage, setsignUpErrorMessage] = useState("");

  const accountChangeHandler = (event: any) => {
    setNewUserData({
      ...newUserData,
      account: event.target.value.trim(),
    });
  };
  const passwordChangeHandler = (event: any) => {
    setNewUserData({
      ...newUserData,
      password: event.target.value.toLocaleLowerCase(),
    });
  };
  const checkPasswordChangeHandler = (event: any) => {
    setNewUserData({
      ...newUserData,
      checkPassword: event.target.value.toLocaleLowerCase(),
    });
  };
  const nameChangeHandler = (event: any) => {
    setNewUserData({
      ...newUserData,
      name: event.target.value.trim(),
    });
  };
  const phoneNumberChangeHandler = (event: any) => {
    setNewUserData({
      ...newUserData,
      phoneNumber: event.target.value,
    });
  };
  const positionChangeHandler = (event: any) => {
    const selectPosition = parseInt(event.target.value);
    setNewUserData({
      ...newUserData,
      position: positions[selectPosition],
    });
  };

  const formSubmitHandler = (event: any) => {
    event.preventDefault();
    if (newUserData.account.length < 3) {
      setsignUpErrorMessage("아이디는 3자 보다 길어야함.");
      setSignUpError(true);
      return;
    }
    if (newUserData.password.length <= 3) {
      setsignUpErrorMessage("비밀번호 길이가 3자 이하입니다.");
      setSignUpError(true);
      return;
    }
    if (newUserData.password !== newUserData.checkPassword) {
      setsignUpErrorMessage("비밀번호다름");
      setSignUpError(true);
      return;
    }
    if (newUserData.name.length < 2) {
      setsignUpErrorMessage("이름을 정확하게 입력해주세요.");
      setSignUpError(true);
      return;
    }
    if (newUserData.position.id === 0) {
      setsignUpErrorMessage("직분을 선택해주세요.");
      setSignUpError(true);
      return;
    }

    axios.post("/api/users/sign-up", newUserData).then((res) => {
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "회원가입 완료.",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          props.history.push("/login");
        }, 1500);
      } else {
        setsignUpErrorMessage(res.data.err);
        setSignUpError(true);
      }
    });
  };

  const formEnteredHandler = (event: any) => {
    if (event.key === "Enter") {
      formSubmitHandler(event);
    }
  };

  return (
    <div className="bg-[#f0f0f0] flex justify-center h-screen">
      <div className="max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 py-8 my-10 "
          onSubmit={formSubmitHandler}
          onKeyPress={formEnteredHandler}
        >
          {signUpError && (
            <p className="text-[#DC143C] text-sm pb-4">{signUpErrorMessage}</p>
          )}
          <div className="mb-4">
            <label className={labelCss} htmlFor="account">
              아이디
            </label>
            <input
              className={inputCss}
              id="account"
              type="text"
              placeholder="아이디 (최소 5글자)"
              value={newUserData.account}
              onChange={accountChangeHandler}
            />
          </div>
          <div className="mb-4">
            <label className={labelCss} htmlFor="password">
              비밀번호
            </label>
            <input
              className={inputCss}
              id="password"
              type="password"
              placeholder="비밀번호"
              value={newUserData.password}
              onChange={passwordChangeHandler}
              autoComplete="on"
            />
          </div>
          <div className="mb-4">
            <label className={labelCss} htmlFor="check-password">
              비밀번호 확인
            </label>
            <input
              className={inputCss}
              id="check-password"
              type="password"
              placeholder="비밀번호 확인"
              value={newUserData.checkPassword}
              onChange={checkPasswordChangeHandler}
              autoComplete="on"
            />
          </div>
          <div className="mb-4">
            <label className={labelCss} htmlFor="name">
              이름
            </label>
            <input
              className={inputCss}
              id="name"
              type="text"
              placeholder="이름"
              value={newUserData.name}
              onChange={nameChangeHandler}
            />
          </div>
          <div className="mb-4">
            <label className={labelCss} htmlFor="phone">
              휴대폰번호
            </label>
            <input
              className={inputCss}
              id="phone"
              type="text"
              placeholder="휴대폰번호"
              value={newUserData.phoneNumber}
              onChange={phoneNumberChangeHandler}
            />
          </div>
          <div className="mb-4">
            <label className={labelCss} htmlFor="Email">
              직분
            </label>
            <select
              className={inputCss}
              name="positions"
              id="position-select"
              defaultValue={0}
              onChange={positionChangeHandler}
            >
              <option value={newUserData.position.id} disabled>
                --직분선택--
              </option>
              {positions.map((position, idx) => (
                <option key={idx} value={position.id}>
                  {position.position}
                </option>
              ))}
            </select>
          </div>
          <button
            className="block w-full bg-[#35C5F0] hover:bg-[#44bee3] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
