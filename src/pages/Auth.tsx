import { useState, lazy } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { reduxAction } from "../utils/redux/actions/action";
const Layout = lazy(() => import("../components/Layout"));
const Layout2 = lazy(() => import("../components/Layout2"));
const Button = lazy(() => import("../components/Button"));

const fontStyle = "text-white dark:text-black text-2xl text-center font-bold";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reqToken, setReqToken] = useState("");

  const handleReqToken = async () => {
    axios
      .get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        const { request_token, success, status_message } = res.data;
        if (success) {
          window.open(
            `https://www.themoviedb.org/authenticate/${request_token}`,
            "_blank"
          );
          setReqToken(request_token);
        } else {
          alert(status_message);
        }
      })
      .catch((err) => {
        const { status_message } = err.response.data;
        alert(status_message);
      });
  };

  const handleCreateSession = async () => {
    axios
      .post(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_API_KEY}`,
        {
          request_token: reqToken,
        }
      )
      .then((res) => {
        const { session_id, success, status_message } = res.data;
        if (success) {
          handleDetailAccount(session_id);
        } else {
          alert(status_message);
        }
      })
      .catch((err) => {
        const { status_message } = err.response.data;
        alert(status_message);
      });
  };

  const handleDetailAccount = (sessionID: string) => {
    axios
      .get(
        `https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${sessionID}`
      )
      .then((res) => {
        const { id, status_message } = res.data;
        if (!status_message) {
          const temp = {
            session_id: sessionID,
            user_id: id,
          };
          localStorage.setItem("session_id", JSON.stringify(temp));
          dispatch(reduxAction("SET_SESSION_ID", temp));
          alert("Successfully logged in");
          navigate("/homepage");
        } else {
          alert(status_message);
        }
      })
      .catch((err) => {
        const { status_message } = err.response.data;
        alert(status_message);
      });
  };

  return (
    <Layout>
      <Layout2>
        <div className="w-1/2 h-1/2 p-5 bg-zinc-800 dark:bg-neutral-500 rounded shadow-lg shadow-black flex flex-col justify-around">
          {reqToken.length === 0 ? (
            <p className={fontStyle}>
              Please click on "Create Request Token" button to request a token
            </p>
          ) : (
            <div>
              <p className={fontStyle}>
                We need your permission to read and write data on your account.
                This is necessary if you want to do things like maintain your
                lists or rate movies outside of TMDB.
              </p>
              <p className={fontStyle}>
                You can't create a session if you not approve this request.
              </p>
            </div>
          )}
          <Button
            label={
              reqToken.length !== 0 ? "Create Session " : "Create Request Token"
            }
            onClick={() =>
              reqToken.length !== 0 ? handleCreateSession() : handleReqToken()
            }
          />
        </div>
      </Layout2>
    </Layout>
  );
};

export default Auth;
