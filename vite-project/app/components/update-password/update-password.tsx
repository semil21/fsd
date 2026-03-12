import { useForm } from "react-hook-form";
import { updatePasswordService } from "~/service/update-password/update-password";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Header from "../header/header";

type PasswordForm = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export function meta() {
  return [
    { title: "Update Password" },
    { name: "description", content: "Update password page" },
  ];
}

export default function UpdatePasswordPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordForm>();

  const navigate = useNavigate();

  const newPassword = watch("newPassword");

  const onSubmit = async (data: PasswordForm) => {
    try {
      const updatePassword = await updatePasswordService(
        data.oldPassword,
        data.newPassword
      );

      if (updatePassword) {
        toast.success("Password updated successfully");
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
            Update Password
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="block mb-1 text-gray-700">Old Password</label>

              <input
                type="password"
                {...register("oldPassword", {
                  required: "Old password is required",
                })}
                className="w-full border text-black border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
              />

              {errors.oldPassword && (
                <p className="text-red-500 text-sm">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-gray-700">New Password</label>

              <input
                type="password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                className="w-full border text-black border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
              />

              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-gray-700">
                Confirm Password
              </label>

              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
                className="w-full border text-black border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
              />

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
