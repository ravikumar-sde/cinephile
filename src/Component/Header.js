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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);

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
      dispatch(removeUser());
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

  const toggleMobileSubmenu = (menu) => {
    setMobileSubmenu(mobileSubmenu === menu ? null : menu);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileSubmenu(null);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between z-50 bg-gradient-to-b from-black/90 via-black/70 to-transparent backdrop-blur-md transition-all duration-300">
        {/* Left Section - Logo and Nav */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`bx ${mobileMenuOpen ? 'bx-x' : 'bx-menu'} text-2xl`}></i>
          </button>

          {/* Logo */}
          <Link to='/browse' className="transform hover:scale-105 transition-transform duration-300">
            <h1 className="text-2xl md:text-4xl font-black bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent drop-shadow-2xl tracking-tight">
              CINEPHILE
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
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

        {/* Right Section - Search, Notifications, Profile */}
        <div className="flex items-center gap-2 md:gap-6">
          <button
            onClick={handleCloseButton}
            className="text-white hover:bg-white/10 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
          >
            <i className='bx bx-search text-xl md:text-2xl'></i>
          </button>
          <button className="hidden sm:block text-white hover:bg-white/10 p-2 rounded-full transition-all duration-300 transform hover:scale-110">
            <i className='bx bx-bell text-xl md:text-2xl'></i>
          </button>
          <div className="flex items-center gap-2 md:gap-3 group cursor-pointer">
            <img
              className="w-8 h-8 md:w-9 md:h-9 rounded border-2 border-transparent group-hover:border-white transition-all duration-300"
              alt="profile-logo"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            />
            <button
              className="hidden sm:block text-white py-2 px-3 md:px-4 font-medium text-xs md:text-sm bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
        {!isCloseButton && <SearchBar />}
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeMobileMenu}
          ></div>

          {/* Menu Panel */}
          <div className="absolute top-16 left-0 right-0 bg-gray-900/95 border-b border-gray-700 max-h-[calc(100vh-4rem)] overflow-y-auto animate-fade-in">
            <div className="p-4 space-y-2">
              {/* Home */}
              <Link
                to="/browse"
                onClick={closeMobileMenu}
                className={`block px-4 py-3 rounded-lg text-white font-medium transition-colors ${location.pathname === '/browse' ? 'bg-red-600' : 'hover:bg-gray-800'}`}
              >
                <i className='bx bx-home-alt mr-3'></i>Home
              </Link>

              {/* Movies with Submenu */}
              <div>
                <button
                  onClick={() => toggleMobileSubmenu('movies')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-white font-medium transition-colors ${location.pathname.startsWith('/movies') ? 'bg-red-600/50' : 'hover:bg-gray-800'}`}
                >
                  <span><i className='bx bx-movie mr-3'></i>Movies</span>
                  <i className={`bx bx-chevron-down transition-transform ${mobileSubmenu === 'movies' ? 'rotate-180' : ''}`}></i>
                </button>
                {mobileSubmenu === 'movies' && (
                  <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-700 pl-4">
                    {moviesDropdown.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={closeMobileMenu}
                        className={`block px-4 py-2 rounded-lg text-gray-300 transition-colors ${location.pathname === item.path ? 'bg-red-600 text-white' : 'hover:bg-gray-800 hover:text-white'}`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* TV Shows with Submenu */}
              <div>
                <button
                  onClick={() => toggleMobileSubmenu('tvshows')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-white font-medium transition-colors ${location.pathname.startsWith('/tv') ? 'bg-red-600/50' : 'hover:bg-gray-800'}`}
                >
                  <span><i className='bx bx-tv mr-3'></i>TV Shows</span>
                  <i className={`bx bx-chevron-down transition-transform ${mobileSubmenu === 'tvshows' ? 'rotate-180' : ''}`}></i>
                </button>
                {mobileSubmenu === 'tvshows' && (
                  <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-700 pl-4">
                    {tvShowsDropdown.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={closeMobileMenu}
                        className={`block px-4 py-2 rounded-lg text-gray-300 transition-colors ${location.pathname === item.path ? 'bg-red-600 text-white' : 'hover:bg-gray-800 hover:text-white'}`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* New & Popular */}
              <Link
                to="/new-and-popular"
                onClick={closeMobileMenu}
                className={`block px-4 py-3 rounded-lg text-white font-medium transition-colors ${location.pathname === '/new-and-popular' ? 'bg-red-600' : 'hover:bg-gray-800'}`}
              >
                <i className='bx bx-trending-up mr-3'></i>New & Popular
              </Link>

              {/* My List */}
              <Link
                to="/search"
                onClick={closeMobileMenu}
                className="block px-4 py-3 rounded-lg text-white font-medium hover:bg-gray-800 transition-colors"
              >
                <i className='bx bx-list-plus mr-3'></i>My List
              </Link>

              {/* Divider */}
              <div className="border-t border-gray-700 my-4"></div>

              {/* Mobile-only Sign Out */}
              <button
                onClick={() => { handleSignOut(); closeMobileMenu(); }}
                className="w-full px-4 py-3 rounded-lg text-white font-medium bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <i className='bx bx-log-out'></i>Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header;