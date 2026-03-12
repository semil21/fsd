import LoginPage from "~/components/login/login";

export function meta({}) {
  return [{ title: "Login" }, { name: "description", content: "Login page" }];
}

export default function Login() {
  return (
    <>
      <LoginPage />
    </>
  );
}
