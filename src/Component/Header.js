import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, addUser } from "../Utils/userSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { toggleSearchBar } from "../Utils/functionalitySlice";

const Header = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isCloseButton } = useSelector(state => state.functionality);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const moviesDropdown = [
    { label: 'Popular', path: '/movies/popular' },
    { label: 'Now Playing', path: '/movies/now-playing' },
    { label: 'Upcoming', path: '/movies/upcoming' },
    { label: 'Top Rated', path: '/movies/top-rated' },
  ];

  const tvShowsDropdown = [
    { label: 'Popular', path: '/tv/popular' },
    { label: 'Airing Today', path: '/tv/airing-today' },
    { label: 'On TV', path: '/tv/on-tv' },
    { label: 'Top Rated', path: '/tv/top-rated' },
  ];

  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(removeUser);
      navigate("/");
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(addUser({ email: user.email, uid: user.uid }));
        if (location.pathname === '/') {
          navigate('/browse');
        } else {
          navigate(location.pathname)
        }
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const handleCloseButton = () => {
    dispatch(toggleSearchBar(false));
  }

  const handleMouseEnter = (menu) => {
    setActiveDropdown(menu);
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 px-8 py-4 flex items-center justify-between z-50 bg-gradient-to-b from-black/90 via-black/70 to-transparent backdrop-blur-md transition-all duration-300">
      <div className="flex items-center gap-8">
        <div>
          <Link to='/browse' className="transform hover:scale-105 transition-transform duration-300">
            <h1 className="text-4xl font-black bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent drop-shadow-2xl tracking-tight">
              CINEPHILE
            </h1>
          </Link>
        </div>
        <div>
          <ul className="flex text-white gap-6 text-sm font-medium items-center">
            <li className={`hover:text-gray-300 cursor-pointer transition-colors duration-200 hover:scale-105 transform ${location.pathname === '/browse' ? 'text-white font-bold' : ''}`}>
              <Link to="/browse">Home</Link>
            </li>

            {/* Movies Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => handleMouseEnter('movies')}
              onMouseLeave={handleMouseLeave}
            >
              <span className={`hover:text-gray-300 cursor-pointer transition-colors duration-200 flex items-center gap-1 ${location.pathname.startsWith('/movies') ? 'text-white font-bold' : ''}`}>
                Movies
                <i className={`bx bx-chevron-down text-lg transition-transform duration-200 ${activeDropdown === 'movies' ? 'rotate-180' : ''}`}></i>
              </span>
              {activeDropdown === 'movies' && (
                <div className="absolute top-full left-0 pt-3 z-50">
                  <div className="bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-2xl py-2 min-w-[180px] animate-fade-in">
                    {moviesDropdown.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`block px-4 py-2.5 text-gray-200 hover:bg-gray-800 hover:text-white transition-colors duration-150 ${location.pathname === item.path ? 'bg-gray-800 text-white font-semibold border-l-2 border-red-500' : ''}`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {/* TV Shows Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => handleMouseEnter('tvshows')}
              onMouseLeave={handleMouseLeave}
            >
              <span className={`hover:text-gray-300 cursor-pointer transition-colors duration-200 flex items-center gap-1 ${location.pathname.startsWith('/tv') ? 'text-white font-bold' : ''}`}>
                TV Shows
                <i className={`bx bx-chevron-down text-lg transition-transform duration-200 ${activeDropdown === 'tvshows' ? 'rotate-180' : ''}`}></i>
              </span>
              {activeDropdown === 'tvshows' && (
                <div className="absolute top-full left-0 pt-3 z-50">
                  <div className="bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-2xl py-2 min-w-[180px] animate-fade-in">
                    {tvShowsDropdown.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`block px-4 py-2.5 text-gray-200 hover:bg-gray-800 hover:text-white transition-colors duration-150 ${location.pathname === item.path ? 'bg-gray-800 text-white font-semibold border-l-2 border-red-500' : ''}`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>

            <li className={`hover:text-gray-300 cursor-pointer transition-colors duration-200 hover:scale-105 transform ${location.pathname === '/new-and-popular' ? 'text-white font-bold' : ''}`}>
              <Link to="/new-and-popular">New & Popular</Link>
            </li>
            <li className="hover:text-gray-300 cursor-pointer transition-colors duration-200 hover:scale-105 transform">
              <Link to="/search">My List</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-white">
          <button
            onClick={handleCloseButton}
            className="hover:bg-white/10 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
          >
            <i className='bx bx-search text-2xl'></i>
          </button>
        </div>
        <div className="text-white">
          <button className="hover:bg-white/10 p-2 rounded-full transition-all duration-300 transform hover:scale-110">
            <i className='bx bx-bell text-2xl'></i>
          </button>
        </div>
        <div className="flex items-center gap-3 group cursor-pointer">
          <img
            className="w-9 h-9 rounded border-2 border-transparent group-hover:border-white transition-all duration-300"
            alt="profile-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          />
          <button
            className="text-white py-2 px-4 font-medium text-sm bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
      {!isCloseButton && <SearchBar />}
    </nav>
  )
}

export default Header;