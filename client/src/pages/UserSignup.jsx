import { useState } from "react";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    setUsername("");
  };
  return (
    <>
      <div className="h-screen w-full flex flex-col items-center justify-between  p-4 ">
        <div className="w-2/4 p-4 text-start">
          <img
            src="https://www.logo.wine/a/logo/Uber/Uber-White-Dark-Background-Logo.wine.svg"
            alt=""
          />
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center gap-5">
          <h3 className="text-3xl font-bold">signup..</h3>
          <form
            className="flex flex-col gap-2 w-2/3"
            onSubmit={handleFormSubmit}
          >
            <input
              type="text"
              placeholder="enter your username.."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="outline-none bg-transparent rounded-lg border-[1px] border-gray-400 p-2"
            />
            <input
              type="email"
              placeholder="enter your email.."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none bg-transparent rounded-lg border-[1px] border-gray-400 p-2"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none bg-transparent rounded-lg border-[1px] border-gray-400 p-2"
            />
            <Link
              to={"/login"}
              className="text-sm underline text-blue-500 cursor-pointer"
            >
              Already have an account? Login
            </Link>
            <button className="bg-white text-black rounded-lg p-2 w-full text-center outline-none border-none">
              <p className="text-lg">submit</p>
            </button>
          </form>
        </div>
        <Link
          to={"/driver-signup"}
          className="bg-transparent text-white rounded-lg p-2 w-full text-center outline-none border-[1px] border-green-500"
        >
          <p className="text-lg">Signup as Driver</p>
        </Link>
      </div>
    </>
  );
};

export default UserSignup;
