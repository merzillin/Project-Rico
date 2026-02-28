import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <header className="bg-gray-900 text-white p-6 text-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Rico</Link>
        </h1>

        <nav className="mt-4 flex gap-6">
         
        </nav>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}