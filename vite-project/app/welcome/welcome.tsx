import Header from "~/components/header/header";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

export function Welcome() {
  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 text-gray-900">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome To</h1>

          <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-white">
            User Profile Management
          </h2>

          <p className="text-sm md:text-lg max-w-xl mx-auto">
            Manage your profile, update your password, and keep your account
            secure with our user management system.
          </p>
        </div>
      </div>
    </>
  );
}
