"use client";

import { useContext, useState } from "react";
import Header from "../Header";
import { AuthContext } from "../contexts/AuthProvider";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const toRegister = () => {
    router.push("/register");
  };

  const toHome = () => {
    //router.push("/");
  };

  if (isAuthenticated) {
    toHome();
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await login(email, password);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-row bg-gradient-to-br from-green-cassini to-yellow-cassini w-full h-full justify-center py-36">
      <Header />
      <div className="flex flex-col w-[40vw] h-[70vh] border-transparent border justify-center items-center">
        <div className="w-[50%]">
          {errorMessage && (
            <div className="error-popup border-2 border-orange-500 rounded-md pl-2 pr-2">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
        <form className="w-[50%] flex flex-col gap-2" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            className="p-3 border border-gray-300 rounded-lg h-fit text-sm sm:text-lg bg-formGrey hover:outline-none hover:ring-2 hover:ring-brown-600"
            type="text"
            placeholder="Enter your email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label>Password</label>
          <input
            className="p-3 border border-gray-300 rounded-lg h-fit text-sm sm:text-lg bg-formGrey hover:outline-none hover:ring-2 hover:ring-brown-600"
            type="password"
            placeholder="Enter your password.."
            value={password}
            onChange={(p) => setPassword(p.target.value)}
          ></input>
          <div className="w-[100%] h-[100%] flex flex-col justify-evenly align-middle items-center gap-3 mt-2">
            <button
              type="submit"
              className="w-[50%] bg-amber-800 rounded-3xl text-white rounded; hover:scale-103"
            >
              Login
            </button>
            <p className="form-label flex flex-row items-center justify-center w-[100%] gap-3">
              Don't have an account?
              <button
                type="button"
                onClick={() => toRegister()}
                className="text-amber-800 text-lg font-bold hover:text-amber-900 transition-transform transform hover:scale-110"
              >
                Register
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
