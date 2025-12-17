import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-8 py-12">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-black bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                            CINEPHILE
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your ultimate destination for discovering and streaming the best movies and TV shows.
                        </p>
                        {/* Social Media Links */}
                        <div className="flex gap-3">
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                            >
                                <i className='bx bxl-facebook text-white text-xl'></i>
                            </a>
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                            >
                                <i className='bx bxl-twitter text-white text-xl'></i>
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                            >
                                <i className='bx bxl-instagram text-white text-xl'></i>
                            </a>
                            <a 
                                href="https://youtube.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                            >
                                <i className='bx bxl-youtube text-white text-xl'></i>
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Navigation</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/browse" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/movies" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                                    Movies
                                </Link>
                            </li>
                            <li>
                                <Link to="/tv-shows" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                                    TV Shows
                                </Link>
                            </li>
                            <li>
                                <Link to="/new-and-popular" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                                    New & Popular
                                </Link>
                            </li>
                            <li>
                                <Link to="/search" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                                    My List
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                                    Account
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                                    Media Center
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                                    Cookie Preferences
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                                    Corporate Information
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            © {currentYear} CINEPHILE. All rights reserved.
                        </p>
                        <p className="text-gray-500 text-sm">
                            Made with <span className="text-red-500">❤</span> for movie lovers
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

