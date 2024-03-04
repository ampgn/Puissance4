
import logo from "../../assets/P4_transparent.png"
import logo2 from "../../assets/P4.png"

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo2} alt="Logo" />
      </div>
      <div className="navbar-avatar">
        <img src={logo} alt="Avatar" />
      </div>
    </nav>
  );
}
