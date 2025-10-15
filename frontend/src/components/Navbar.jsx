import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    return (
    <header className="navbar">
      <nav className="navbar-inner">
        {}
        <ul className="nav-links">
          {user && (
             
             <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}

          {user && (
            
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          )}

          {!user && (

            <li>
              <NavLink to="/events">Eventos</NavLink>
            </li>
          )}

          {user && (
            <>
              {user.role === 'admin' && (
                <>
                  <li>
                    <NavLink to="/admin">Admin</NavLink>
                  </li>
                  <li>
                    <NavLink to="/users">Usuários</NavLink>
                  </li>
                </>
              )}
              <li>
                <button className="btn" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}
