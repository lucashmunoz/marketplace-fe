import { Link } from "react-router-dom";
import { paths } from "../paths";

const navPaths = [
  {
    value: paths.order,
    label: "Comprar"
  },
  {
    value: paths.stocks,
    label: "Stocks"
  },
  {
    value: paths.purchases,
    label: "Compras realizadas"
  }
];

const Header = () => {
  return (
    <header className="w-full bg-gray-800 text-white">
      <nav className="flex w-full items-center justify-between px-6 py-3">
        <h1 className="text-lg font-semibold">Tienda - Grupo 2</h1>
        <ul className="flex gap-6 text-sm">
          {navPaths.map((path) => {
            return (
              <li key={path.value}>
                <Link to={path.value} className="hover:underline">
                  {path.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
