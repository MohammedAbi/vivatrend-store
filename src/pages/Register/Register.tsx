import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import RegisterForm from "./RegisterForm";
import AuthButtons from "./AuthButtons";
import DividerWithText from "./DividerWithText";
import Info from "./Info";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "VivaTrend - Create Account";
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex flex-1 mt-[90px]">
        <div className="w-full lg:w-1/2 bg-white flex flex-col p-8 md:p-20 overflow-y-auto">
          <h2 className="h1 w-full max-w-[500px] mx-auto text-primary text-xl font-semibold mb-8">
            VivaTrend
          </h2>

          <div className="w-full flex flex-col max-w-[500px] mx-auto">
            <RegisterForm onLoginClick={handleLoginClick} />

            <AuthButtons onLoginClick={handleLoginClick} />

            <DividerWithText />

            <button className="btn btn-lg btn-white border border-primary/40 flex items-center justify-center gap-2 py-3 mb-4">
              <FcGoogle className="text-xl h-5 mr-2" />
              Sign Up with Google
            </button>
          </div>
        </div>

        <Info />
      </div>
    </div>
  );
};

export default Register;
