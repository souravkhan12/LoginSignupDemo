import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormData } from "./validate";
import { useNavigate } from "react-router";
import useLocalStorage from "../hooks/useLocalStorage";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();
  const [, setStoredValue] = useLocalStorage({
    key: "userData",
    value: "",
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("Valid data:", data);
    setStoredValue(JSON.stringify(data));
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-5 p-6 bg-white rounded-2xl shadow-sm border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Sign Up
        </h2>

        <div className="space-y-1">
          <input
            placeholder="Full Name"
            {...register("name")}
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-black focus:ring-0 outline-none text-sm"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <input
            placeholder="Username"
            {...register("username")}
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-black focus:ring-0 outline-none text-sm"
          />
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username.message}</p>
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

        <div className="space-y-1">
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-black focus:ring-0 outline-none text-sm"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

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
            placeholder="+91 9876543210"
            {...register("phone")}
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-black focus:ring-0 outline-none text-sm"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
