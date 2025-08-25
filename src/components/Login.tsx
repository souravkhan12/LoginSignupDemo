import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "./validate";
import useLocalStorage from "../hooks/useLocalStorage";
import { Link } from "react-router";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const [storedValue] = useLocalStorage({ key: "userData", value: "" });

  const onSubmit = (data: LoginFormData) => {
    console.log("Valid data:", data);
    if (storedValue) {
      const userData = JSON.parse(storedValue);
      if (
        data.email === userData.email &&
        data.password === userData.password
      ) {
        alert("Login successful!");
      } else {
        alert("Please sign up first");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-5 p-6 bg-white rounded-2xl shadow-sm border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Login In
        </h2>
        <div className="space-y-1">
          <input
            placeholder="Email (Gmail only)"
            {...register("email")}
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-black focus:ring-0 outline-none text-sm"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-black focus:ring-0 outline-none text-sm"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-black font-medium">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
