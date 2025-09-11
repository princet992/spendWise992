import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.Theme);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const formSubmit = async (data) => {
    try {
      setSuccess("Login successful 🎉 Redirecting...");
      setError("");
      reset();
    } catch (error) {
      setError(error.message || "Something went wrong");
      setSuccess("");
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
          {success && <p className="text-green-500 text-center mb-3">{success}</p>}

          <h2 className="text-3xl font-extrabold mb-5 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Login
          </h2>
          <p className={`text-sm text-center mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Welcome back! Please login to your account.
          </p>
          <div className="mb-4 relative">
            <label className="block mb-1 font-medium">Email</label>
            <Mail className="absolute left-3 top-10 text-gray-500" size={20} />
            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              aria-invalid={!!errors.email}
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
            <Lock className="absolute left-3 top-10 text-gray-500" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              className={`w-full px-3 pl-10 py-2 rounded-lg transition outline-none shadow-sm ${
                theme === "dark"
                  ? "bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-300"
                  : "bg-gray-100 text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-400"
              }`}
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500 "
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            // disabled={!isValid}
            className={`w-full py-2 mt-3 rounded-lg font-semibold transition shadow-md ${
              theme === "dark"
                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            } `}
          >
            {/* {isLoading ? "Logging in ..." : "Login"} */}
            Login
          </button>

          <p className="text-sm mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/signUp" className="font-medium text-indigo-600 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
