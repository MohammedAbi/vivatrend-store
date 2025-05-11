import { useNavigate } from "react-router-dom";
import Img1 from "../../assets/images/background.jpg";
import LoginForm from "./LoginForm";
import { useAuth } from "../../context";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();

  useEffect(() => {
    document.title = "VivaTrend - Login";
  }, []);

  const handleSignUpClick = () => {
    navigate("/register");
  };

  const handleSubmit = async (email: string, password: string) => {
    try {
      await login({ email, password });
      toast.success("Welcome back!");
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex flex-1 mt-[90px]">
        {/* Info section with background image - shown only on larger screens */}
        <div className="relative lg:w-1/2 h-full flex-col hidden lg:flex">
          <img
            src={Img1}
            alt="Stylish models wearing VivaTrend's latest collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-[20%] left-[10%] flex flex-col max-w-[80%] z-20">
            <h1 className="text-4xl text-white font-bold my-4 leading-tight">
              Express Your Unique Style <br />
              With VivaTrend
            </h1>
            <p className="text-xl text-white font-normal mb-6">
              Discover curated fashion that tells your story
            </p>
            <ul className="space-y-3 text-white/90">
              <li className="flex items-center">
                <span className="mr-2">✓</span> Exclusive member-only
                collections
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> Sustainable fashion choices
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> Free styling advice with every
                purchase
              </li>
            </ul>
          </div>
          <div className="absolute w-full h-full bg-black/50 z-10"></div>
        </div>

        <div className="w-full lg:w-1/2 bg-white flex flex-col p-8 md:p-20 overflow-y-auto">
          <h2 className="h1 w-full max-w-[500px] mx-auto text-primary text-xl font-semibold mb-8">
            VivaTrend
          </h2>

          <div className="w-full flex flex-col max-w-[500px] mx-auto">
            <LoginForm
              onSignUpClick={handleSignUpClick}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
