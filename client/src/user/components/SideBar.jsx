import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../styles/SideBar.css";

export default function SideBar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, currentUser } = useAuth();

  const menu = [
    { path: "/user", label: "Home" },
    { path: "/user/offers", label: "Offers" },
    { path: "/user/orders", label: "Orders" },
    { path: "/user/cart", label: "Cart" },
    { path: "/user/profile", label: "Profile" },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      onClose();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}` }>
        <div className="sidebar-header">
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="profile-card">
          <div className="profile-avatar">
            <img src="/user.png" alt="Profile" />
          </div>
          <div className="profile-details">
            <h3>Welcome,</h3>
            <h2>{currentUser?.displayName || 'Guest'}!</h2>
            <p>Enjoy your meal</p>
          </div>
        </div>

        <nav className="sidebar-menu">
          {menu.map((item, index) => (
            <Link
              key={item.path + index}
              to={item.path}
              className={`menu-item ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={onClose}
            >
              <span className="menu-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/user/profile" className="settings-btn" onClick={onClose}>
            <span>Settings</span>
          </Link>
          <button className="logout-btn" onClick={handleLogout}>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
