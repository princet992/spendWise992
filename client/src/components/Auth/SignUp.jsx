import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";

const SignUp = () => {
  const { theme } = useSelector((state) => state.Theme);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const formSubmit = async (data) => {
    try {
      setMessage("Registered Successfully 🎉");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div
        className={`min-h-screen px-3 flex items-center justify-center transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200 text-gray-900"
        }`}
      >
        <form
          onSubmit={handleSubmit(formSubmit)}
          className={`w-full max-w-md p-8 rounded-xl shadow-2xl transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white bg-opacity-90 text-gray-900 backdrop-blur-md"
          }`}
        >
          {error && <p className="text-red-500 text-center mb-3">{error}</p>}
          {message && <p className="text-green-500 text-center mb-3">{message}</p>}

          <h2 className="text-3xl font-extrabold mb-5 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Create an account
          </h2>
          <p className="text-sm text-center mb-5 opacity-80">Sign up to get started with your account</p>

          <div className="mb-4 relative">
            <label className="block mb-1 font-medium">Username</label>
            <User className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Enter your username"
              autoComplete="username"
              className={`w-full px-3 pl-10 py-2 rounded-lg transition outline-none shadow-sm ${
                theme === "dark"
                  ? "bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-300"
                  : "bg-gray-100 text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-400"
              }`}
              {...register("userName", { required: "Username is required" })}
            />
            {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>}
          </div>

          <div className="mb-4 relative">
            <label className="block mb-1 font-medium">Email</label>
            <Mail className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              className={`w-full px-3 pl-10 py-2 rounded-lg transition outline-none shadow-sm ${
                theme === "dark"
                  ? "bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-300"
                  : "bg-gray-100 text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-400"
              }`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4 relative">
            <label className="block mb-1 font-medium">Password</label>
            <Lock className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
            <input
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              className={`w-full px-3 pl-10 py-2 rounded-lg transition outline-none shadow-sm ${
                theme === "dark"
                  ? "bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-300"
                  : "bg-gray-100 text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-400"
              }`}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className={`w-full py-2 mt-3 rounded-lg font-semibold transition shadow-md ${
              theme === "dark"
                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Register
          </button>

          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link to="/" className="font-medium text-indigo-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
