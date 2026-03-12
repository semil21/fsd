import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Header from "~/components/header/header";
import { registerUserService } from "~/service/register/register.service";

type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (data: RegisterForm) => {
    try {
      const registerUser = await registerUserService(data);

      if (registerUser) {
        localStorage.setItem("auth_token", registerUser?.data?.auth_token);
        localStorage.setItem(
          "refresh_token",
          registerUser?.data?.refresh_token
        );
        toast.success("User registered successfully");
        navigate("/dashboard");
      }
    } catch (err: any) {
      toast.error(err);
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
            Register
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* First Name */}
            <div>
              <label className="block mb-1 text-gray-700">First Name</label>

              <input
                {...register("firstName", {
                  required: "First name required",
                })}
                className="w-full border border-gray-400 rounded-lg px-3 py-2 text-black"
              />

              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block mb-1 text-gray-700">Last Name</label>

              <input
                {...register("lastName", {
                  required: "Last name required",
                })}
                className="w-full border border-gray-400 rounded-lg px-3 py-2 text-black"
              />

              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-700">Email</label>

              <input
                type="email"
                {...register("email", {
                  required: "Email required",
                })}
                className="w-full border border-gray-400 rounded-lg px-3 py-2 text-black"
              />

              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-gray-700">Password</label>

              <input
                type="password"
                {...register("password", {
                  required: "Password required",
                  minLength: {
                    value: 6,
                    message: "Min 6 characters",
                  },
                })}
                className="w-full border border-gray-400 rounded-lg px-3 py-2 text-black"
              />

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 text-gray-700">
                Confirm Password
              </label>

              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm password required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full border border-gray-400 rounded-lg px-3 py-2 text-black"
              />

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="mt-2 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
