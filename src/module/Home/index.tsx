import { Link } from "react-router-dom";
import { MenuList } from "../../layout/menu";

export default function HomePage() {
  return (
    <>
      {/* Page Header */}
      <h2 className="text-2xl font-semibold mb-6">Home Page</h2>

      {/* Menu Boxes */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {MenuList.map((item) => (
          <Link
            key={item.route}
            to={item.route}
            className="block text-center bg-gray-800 text-white p-6 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            <div className="text-lg font-medium">{item.label}</div>
            {item.icon && <div className="mt-2">{item.icon}</div>}
          </Link>
        ))}
      </div>
    </>
  );
}