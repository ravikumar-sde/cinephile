import useFetchDataById from "../Hooks/useFetchDataById";
import VideoBackground from './VideoBackground';
import { useSelector } from "react-redux";

const VideoBanner = ({movie}) => {
    const { movieTrailer } = useSelector(state => state.movies);
    useFetchDataById(movie);

    return (
        <div className="relative w-full h-[70vh] md:h-screen overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black via-black/50 to-transparent text-white flex items-end md:items-center px-4 md:pl-20 pb-16 md:pb-0 z-10">
                <div className="animate-fade-in max-w-2xl">
                    {/* Movie Title with Gradient */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black drop-shadow-2xl break-words mb-2 md:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {movieTrailer && movieTrailer.title}
                    </h2>

                    {/* Rating and Year */}
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4">
                        {movieTrailer && movieTrailer.vote_average && (
                            <div className="flex items-center gap-1 md:gap-2 bg-yellow-500/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full border border-yellow-500/30">
                                <i className='bx bxs-star text-yellow-400 text-sm md:text-xl'></i>
                                <span className="text-white font-bold text-sm md:text-base">{movieTrailer.vote_average.toFixed(1)}</span>
                            </div>
                        )}
                        {movieTrailer && movieTrailer.release_date && (
                            <span className="text-gray-300 font-medium text-sm md:text-base">
                                {new Date(movieTrailer.release_date).getFullYear()}
                            </span>
                        )}
                        {movieTrailer && movieTrailer.runtime && (
                            <span className="text-gray-300 font-medium text-sm md:text-base hidden sm:inline">
                                {Math.floor(movieTrailer.runtime / 60)}h {movieTrailer.runtime % 60}m
                            </span>
                        )}
                    </div>

                    {/* Overview - Hidden on very small screens */}
                    <p className="hidden sm:block text-sm md:text-lg text-gray-200 leading-relaxed line-clamp-2 md:line-clamp-3 mb-4 md:mb-6 drop-shadow-lg">
                        {movieTrailer && movieTrailer.overview}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 md:gap-4 mt-4 md:mt-6">
                        <button className="flex items-center py-2 md:py-3 px-4 md:px-8 rounded-lg bg-white text-black hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-xl font-bold">
                            <i className='bx bx-play text-xl md:text-3xl'></i>
                            <p className="text-sm md:text-xl font-bold ml-1 md:ml-2">Play</p>
                        </button>
                        <button className="flex items-center py-2 md:py-3 px-4 md:px-8 rounded-lg bg-gray-600/40 text-white backdrop-blur-md hover:bg-gray-600/60 transition-all duration-300 transform hover:scale-105 shadow-xl border border-gray-500/30 font-bold">
                            <i className='bx bx-info-circle text-xl md:text-3xl'></i>
                            <p className="text-sm md:text-xl font-bold ml-1 md:ml-2 hidden sm:block">More Info</p>
                        </button>
                        <button className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-800/60 text-white backdrop-blur-md hover:bg-gray-700/80 transition-all duration-300 transform hover:scale-110 shadow-xl border border-gray-600/30">
                            <i className='bx bx-plus text-xl md:text-3xl'></i>
                        </button>
                        <button className="hidden sm:flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-800/60 text-white backdrop-blur-md hover:bg-gray-700/80 transition-all duration-300 transform hover:scale-110 shadow-xl border border-gray-600/30">
                            <i className='bx bx-like text-lg md:text-2xl'></i>
                        </button>
                    </div>
                </div>
            </div>
            {movie && <VideoBackground />}
        </div>
    );
}

export default VideoBanner;