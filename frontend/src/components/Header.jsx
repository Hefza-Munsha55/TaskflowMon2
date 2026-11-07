import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-inner">
        <span className="logo">&#10003; TaskFlow</span>
        {user ? (
          <nav className="nav">
            <NavLink to="/" end>My Tasks</NavLink>
            <NavLink to="/explore">Explore</NavLink>
            <span className="hello">Hi, {user.name.split(' ')[0]}</span>
            <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
          </nav>
        ) : (
          <nav className="nav">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}
