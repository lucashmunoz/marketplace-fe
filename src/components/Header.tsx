import { useState } from "react";
import { Link } from "react-router-dom";
import { paths } from "../paths";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navPaths = [
  { value: paths.order, label: "Comprar" },
  { value: paths.stocks, label: "Stocks" },
  { value: paths.purchases, label: "Compras realizadas" }
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-gray-800 text-white">
      <nav className="flex items-center justify-between px-6 py-3">
        <Link to={paths.order}>
          <h1 className="text-lg font-semibold">Tienda</h1>
        </Link>

        {/* Botón para mobile */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        {/* Menú desktop */}
        <ul className="hidden gap-6 text-sm md:flex">
          {navPaths.map((path) => (
            <li key={path.value}>
              <Link to={path.value} className="hover:underline">
                {path.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Menú mobile */}
      {menuOpen && (
        <ul className="flex flex-col gap-4 px-6 pb-4 text-sm md:hidden">
          {navPaths.map((path) => (
            <li key={path.value}>
              <Link
                to={path.value}
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                {path.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Header;
