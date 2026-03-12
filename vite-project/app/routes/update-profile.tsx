import UpdatePasswordPage from "~/components/update-password/update-password";
import UpdateProfileImagePage from "~/components/update-profile/update-profile";

export function meta({}) {
  return [{ title: "Login" }, { name: "description", content: "Login page" }];
}

export default function UpdateProfile() {
  return (
    <>
      <UpdateProfileImagePage />
    </>
  );
}
