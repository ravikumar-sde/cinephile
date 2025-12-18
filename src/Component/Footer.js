import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
                {/* Top Section */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
                    {/* Brand Section */}
                    <div className="col-span-2 md:col-span-1 space-y-3 md:space-y-4">
                        <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                            CINEPHILE
                        </h2>
                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                            Your ultimate destination for discovering and streaming the best movies and TV shows.
                        </p>
                        {/* Social Media Links */}
                        <div className="flex gap-2 md:gap-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                            >
                                <i className='bx bxl-facebook text-white text-lg md:text-xl'></i>
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                            >
                                <i className='bx bxl-twitter text-white text-lg md:text-xl'></i>
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                            >
                                <i className='bx bxl-instagram text-white text-lg md:text-xl'></i>
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                            >
                                <i className='bx bxl-youtube text-white text-lg md:text-xl'></i>
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h3 className="text-white font-bold text-sm md:text-lg mb-3 md:mb-4">Navigation</h3>
                        <ul className="space-y-1.5 md:space-y-2">
                            <li>
                                <Link to="/browse" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs md:text-sm">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/movies" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs md:text-sm">
                                    Movies
                                </Link>
                            </li>
                            <li>
                                <Link to="/tv-shows" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs md:text-sm">
                                    TV Shows
                                </Link>
                            </li>
                            <li>
                                <Link to="/new-and-popular" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs md:text-sm">
                                    New & Popular
                                </Link>
                            </li>
                            <li>
                                <Link to="/search" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs md:text-sm">
                                    My List
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-white font-bold text-sm md:text-lg mb-3 md:mb-4">Support</h3>
                        <ul className="space-y-1.5 md:space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs md:text-sm">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs md:text-sm">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs md:text-sm">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs md:text-sm">
                                    Account
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs md:text-sm">
                                    Media Center
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-white font-bold text-sm md:text-lg mb-3 md:mb-4">Legal</h3>
                        <ul className="space-y-1.5 md:space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs md:text-sm">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs md:text-sm">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs md:text-sm">
                                    Cookie Preferences
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs md:text-sm">
                                    Corporate Information
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-6 md:pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
                        <p className="text-gray-500 text-xs md:text-sm">
                            © {currentYear} CINEPHILE. All rights reserved.
                        </p>
                        <p className="text-gray-500 text-xs md:text-sm">
                            Made with <span className="text-red-500">❤</span> for movie lovers
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

