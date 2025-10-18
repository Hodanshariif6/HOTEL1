import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Header() {
  const [user, setUser] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  const checkForImageUpdate = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObj = JSON.parse(userData);
      const savedImage = localStorage.getItem(`userImage_${userObj.email}`);
      if (savedImage && savedImage !== userImage) {
        setUserImage(savedImage);
      }
    }
  };

  const loadUserImage = (userObj) => {
    if (userObj && userObj.email) {
      const savedImage = localStorage.getItem(`userImage_${userObj.email}`);
      if (savedImage) {
        setUserImage(savedImage);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      const userObj = JSON.parse(userData);
      setUser(userObj);

      loadUserImage(userObj);

      const loginTime = localStorage.getItem("loginTime");
      const currentTime = new Date().getTime();
      
      if (loginTime && (currentTime - parseInt(loginTime)) < 5000) { 
        setJustLoggedIn(true);
        localStorage.removeItem("loginTime"); 
        
        if (!location.pathname.includes('/profile')) {
          navigate("/profile");
        }
      }
    } else {
      setUser(null);
      setUserImage(null);
    }

    const interval = setInterval(checkForImageUpdate, 1000);

    return () => clearInterval(interval);
  }, [userImage, navigate, location]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key && e.key.startsWith('userImage_') && user) {
        const savedImage = localStorage.getItem(`userImage_${user.email}`);
        if (savedImage && savedImage !== userImage) {
          setUserImage(savedImage);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user, userImage]);

  useEffect(() => {
    const handleImageUpdate = () => {
      if (user) {
        const savedImage = localStorage.getItem(`userImage_${user.email}`);
        if (savedImage) {
          setUserImage(savedImage);
        }
      }
    };

    window.addEventListener('userImageUpdated', handleImageUpdate);
    return () => window.removeEventListener('userImageUpdated', handleImageUpdate);
  }, [user]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("customer");
    localStorage.removeItem("loginTime");
    
    setUser(null);
    setUserImage(null);
    setJustLoggedIn(false);
    navigate("/");
    setMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b">
      <div className="container mx-auto flex items-center justify-between p-4">

        <Link to="/" className="text-3xl font-bold text-gray-800 hover:text-purple-600 transition">
          HOR<span className="text-purple-500">YAAL</span>
        </Link>

        <nav className="hidden md:flex gap-8 mx-auto">
          <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium transition">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-purple-600 font-medium transition">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-purple-600 font-medium transition">Contact</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <div
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition group relative"
                onClick={handleProfileClick}
              >
                {justLoggedIn && (
                  <div className="absolute -top-1 -right-1">
                    <div className="relative">
                      <div className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></div>
                      <div className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></div>
                    </div>
                  </div>
                )}
                
                {userImage ? (
                  <div className="relative">
                    <img
                      src={userImage}
                      alt="User"
                      className="w-12 h-12 rounded-full object-cover border-2 border-purple-500 shadow-md transition-transform group-hover:scale-105"
                      key={userImage}
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-lg shadow-md transition-transform group-hover:scale-105">
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800 text-sm flex items-center gap-1">
                    {user.name}
                    {justLoggedIn && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full animate-pulse">
                        New
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">{user.role || "customer"}</span>
                </div>
              </div>

              <Link to="/booking">
                <button className="px-6 py-2 bg-[#5facc0] hover:bg-[#4a9cb0] text-white rounded-lg font-medium transition shadow-md hover:shadow-lg flex items-center gap-2">
                  <i className="fa-solid fa-calendar-check"></i>
                  Booking Now
                </button>
              </Link>

              <button
                onClick={handleLogOut}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition flex items-center gap-2"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl  p-2 text-white w-12 hover:text-black transition rounded-lg hover:bg-gray-100 bg-purple-400"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200 p-4 flex flex-col gap-3">
          <Link 
            to="/" 
            onClick={() => setMenuOpen(false)}
            className="px-4 py-3 text-gray-700 hover:text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition"
          >
            Home
          </Link>
          <Link 
            to="/about" 
            onClick={() => setMenuOpen(false)}
            className="px-4 py-3 text-gray-700 hover:text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            onClick={() => setMenuOpen(false)}
            className="px-4 py-3 text-gray-700 hover:text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition"
          >
            Contact
          </Link>

          {user ? (
            <>
              <div 
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 cursor-pointer relative"
                onClick={handleProfileClick}
              >
                {justLoggedIn && (
                  <div className="absolute -top-1 -right-1">
                    <div className="relative">
                      <div className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></div>
                      <div className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></div>
                    </div>
                  </div>
                )}
                
                {userImage ? (
                  <img
                    src={userImage}
                    alt="User"
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
                    key={userImage}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-lg">
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800 flex items-center gap-1">
                    {user.name}
                    {justLoggedIn && (
                      <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </span>
                  <span className="text-sm text-gray-500 capitalize">{user.role || "customer"}</span>
                </div>
              </div>

              <Link 
                to="/booking" 
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 bg-[#5facc0] hover:bg-[#4a9cb0] text-white rounded-lg font-medium transition text-center flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-calendar-check"></i>
                Booking Now
              </Link>

              <button 
                onClick={handleLogOut}
                className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition text-center"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition text-center"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;