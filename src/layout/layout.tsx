import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div >
      <header className="bg-gray-900 text-white p-6 text-center">
        <h1 className="text-2xl font-bold max-w-md mx-auto" >
          <Link to="/">Rico</Link>
        </h1>

        
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}