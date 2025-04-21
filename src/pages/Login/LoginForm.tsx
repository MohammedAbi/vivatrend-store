import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

interface LoginFormProps {
  onSignUpClick: () => void;
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSignUpClick,
  onSubmit,
  isLoading = false,
  error,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col mb-2">
        <h3 className="h3 mb-2">Login</h3>
        <p className="text-base mb-6">
          Welcome Back! Please enter your details.
        </p>
      </div>

      {error && (
        <div className="w-full p-2 mb-4 bg-red-50 text-red-600 rounded text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full flex flex-col">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="w-full text-primary py-4 my-2 border-b border-accent bg-transparent outline-none focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password (min. 8 characters)"
          minLength={8}
          className="w-full text-primary py-4 my-2 border-b border-accent bg-transparent outline-none focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="w-full flex items-center justify-between my-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 mr-2 accent-accent"
            />
            <label htmlFor="remember" className="text-sm cursor-pointer">
              Remember Me
            </label>
          </div>

          <button
            type="button"
            className="text-sm font-medium underline underline-offset-2"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-lg btn-primary py-3 mb-4"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          className="btn btn-lg btn-white border border-primary py-3 mb-4"
          onClick={onSignUpClick}
        >
          Register
        </button>

        <div className="w-full flex items-center justify-center relative py-2 mb-4">
          <div className="w-full h-[1px] bg-black/40 mt-4"></div>
          <p className="absolute text-lg text-black/80 bg-white px-1 mt-4">
            Or
          </p>
        </div>

        <button
          type="button"
          className="btn btn-lg btn-white border border-primary/40 flex items-center justify-center gap-2 py-3 mb-4"
        >
          <FcGoogle className="text-xl h-5 mr-2" />
          Sign In with Google
        </button>
      </form>

      <div className="w-full flex items-center justify-center">
        <p className="text-sm font-normal text-primary">
          Don't have an account?{" "}
          <button
            onClick={onSignUpClick}
            className="font-semibold underline underline-offset-2 cursor-pointer bg-transparent border-none"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
