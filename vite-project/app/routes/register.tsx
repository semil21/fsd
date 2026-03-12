import Header from "~/components/header/header";
import RegisterPage from "~/components/register/register";

export function meta() {
  return [
    { title: "Register" },
    { name: "description", content: "Register page" },
  ];
}

export default function Register() {
  return (
    <>
      <Header />
      <RegisterPage />
    </>
  );
}
