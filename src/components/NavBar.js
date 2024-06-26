import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex justify-center relative z-10 bg-black">
      <NavLink
        exact="true"
        to="/"
        className="text-red-500 my-2 py-1 p-5 text-4xl hover:text-gray-300"
      >
        Home
      </NavLink>
      <NavLink
        to="/JogoDaVelha"
        className="text-red-500 my-2 py-1 p-5 text-4xl hover:text-gray-300"
      >
        Jogo da velha
      </NavLink>
      <NavLink
        to="/GameBall"
        className="text-red-500 my-2 py-1 p-5 text-4xl hover:text-gray-300"
      >
        Jogo da bolinha
      </NavLink>
      <NavLink
        to="/login"
        className="text-red-500 my-2 py-1 p-5 text-4xl hover:text-gray-300"
      >
        Login
      </NavLink>
    </nav>
  );
};

export default NavBar;
