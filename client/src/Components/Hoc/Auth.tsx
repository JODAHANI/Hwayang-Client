import { auth } from "../../_actions/user_actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStateType } from "../../constants/types";
import Swal from "sweetalert2";

const Auth: Function = (
  HigherOrderComponent: any,
  option: null | boolean,
  adminRoute: null | boolean = null
): Function => {
  function AuthenticationCheck(props: any): JSX.Element {
    let user = useSelector((state: ReduxStateType) => state?.user);
    const dispatch: any = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((res) => {
        if (!res.payload.isAuth) {
          if (option) {
            Swal.fire({
              icon: "error",
              title: "로그인 해주세요.",
              showConfirmButton: false,
              timer: 1500,
            });
            props.history.push("/");
          }
        } else {
          if (option === false) {
            props.history.push("/");
          }
        }
      });
    }, [dispatch, props.history]);

    return <HigherOrderComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
};

export default Auth;
