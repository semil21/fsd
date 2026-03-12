import Header from "~/components/header/header";

export function meta() {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Dashboard page" },
  ];
}

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Dashboard</h1>

        <div className="bg-white rounded-xl shadow p-4 my-10">
          <h2 className="text-gray-600 text-center text-xl font-semibold">
            Welcome Back.
          </h2>
        </div>
      </div>
    </>
  );
}
