import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../header/header";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchUserDetails } from "~/service/fetch-user-details/fetch-user-details.service";
import { updateUserProfileService } from "~/service/user-profile/user-profile";
import { useNavigate } from "react-router";
type ProfileForm = {
  firstName: string;
  lastName: string;
  email: string;
};

export function meta() {
  return [
    { title: "Update Profile" },
    { name: "description", content: "Update profile" },
  ];
}

export default function UpdateProfilePage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileForm>();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetchUserDetails();

        const user = res.data.data;

        setValue("firstName", user.firstName);
        setValue("lastName", user.lastName);
        setValue("email", user.email);
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const onSubmit = async (data: ProfileForm) => {
    try {
      const updateUser = await updateUserProfileService(data);

      if (updateUser) {
        navigate("/dashboard");
        toast.success("Profile updated");
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl font-semibold">Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
            Update Profile
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="block mb-1 text-black">First Name</label>

              <input
                {...register("firstName", {
                  required: "Required",
                })}
                className="w-full text-black border border-gray-400 rounded px-3 py-2"
              />

              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-black">Last Name</label>

              <input
                {...register("lastName", {
                  required: "Required",
                })}
                className="w-full text-black border border-gray-400 rounded px-3 py-2"
              />

              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-black ">Email</label>

              <input
                {...register("email", {
                  required: "Required",
                })}
                className="w-full text-black border border-gray-400 rounded px-3 py-2"
              />

              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-orange-500 text-white py-2 rounded"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
