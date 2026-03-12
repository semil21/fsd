import { useForm } from "react-hook-form";
import { userLoginService } from "~/service/login/login.service";
import { toast } from "react-toastify";
import Header from "../header/header";
import { useNavigate } from "react-router";
type LoginForm = {
  email: string;
  password: string;
};

export function meta() {
  return [{ title: "Login" }, { name: "description", content: "Login page" }];
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const navigate = useNavigate();
  const onSubmit = async (data: LoginForm) => {
    try {
      const verifyUser = await userLoginService(data.email, data.password);

      if (verifyUser) {
        localStorage.setItem("auth_token", verifyUser?.data?.auth_token);
        localStorage.setItem("refresh_token", verifyUser?.data?.refresh_token);
        navigate("/dashboard");
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800 x">
            Login
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="block mb-1 text-gray-700">Email</label>

              <input
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email is required",
                })}
                className="w-full border border-gray-400 rounded-lg px-3 py-2 LoginPage focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
              />

              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-gray-700">Password</label>

              <input
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full  border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
              />

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
