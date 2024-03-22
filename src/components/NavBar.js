import "./NavBar.css"

import { Link } from "react-router-dom"

const NavBar = () => {
  return (<nav>
        <Link to="/">Home</Link>
        <Link to="/Velha"> Jogo da velha</Link>
        <Link to="/nova"> Jogo da bolinha</Link>
  </nav>
  )
}

export default NavBar