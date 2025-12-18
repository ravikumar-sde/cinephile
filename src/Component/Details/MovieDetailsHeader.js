import { useState } from "react";
import { useSelector } from "react-redux";

const MovieDetailsHeader = () => {
    const [isClosed, setIsClosed] = useState(true);
    const { movieDetails, movieVideos } = useSelector(state => state.details);
    const releaseDate = movieDetails && movieDetails.release_date.split("-");
    const genres = movieDetails && movieDetails.genres.map(genre => {
        return genre.name;
    });

    const filterTrailer = movieVideos && movieVideos.results?.filter(movie => {
        return movie.type === 'Trailer'
    });

    const handlePlayTrailer = () => {
        setIsClosed(false);
    };

    const handleClosePlayTrailer = () => {
        setIsClosed(true);
    }

    const converMinutesIntoHoursAndMinutes = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remaningMinutes = minutes % 60;
        return `${hours}h ${remaningMinutes}m`
    }

    const duration = movieDetails && converMinutesIntoHoursAndMinutes(movieDetails.runtime);

    return (
        <>
            {movieDetails && (
                <div className="relative w-full min-h-[100vh] md:min-h-[85vh] overflow-hidden">
                    {/* Background Image with Gradient Overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 flex items-end pb-8 md:pb-16 pt-20 md:pt-24">
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full animate-fade-in">
                            {/* Poster - Hidden on mobile */}
                            <div className="flex-shrink-0 hidden md:block">
                                <img
                                    className="rounded-xl shadow-2xl w-48 lg:w-72 h-auto transform hover:scale-105 transition-transform duration-300"
                                    alt="movie-poster"
                                    src={"https://image.tmdb.org/t/p/w500/" + movieDetails.poster_path}
                                />
                            </div>

                            {/* Movie Info */}
                            <div className="text-white flex-1 space-y-3 md:space-y-6">
                                {/* Title */}
                                <div>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-1 md:mb-3 drop-shadow-2xl">
                                        {movieDetails.title}
                                    </h1>
                                    <p className="text-lg md:text-2xl text-gray-300 font-light">
                                        {releaseDate[0]}
                                    </p>
                                </div>

                                {/* Meta Info */}
                                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm md:text-lg">
                                    {/* Rating */}
                                    <div className="flex items-center gap-1 md:gap-2 bg-yellow-500/20 backdrop-blur-sm px-2 md:px-4 py-1 md:py-2 rounded-full border border-yellow-500/30">
                                        <i className='bx bxs-star text-yellow-400 text-base md:text-xl'></i>
                                        <span className="font-bold">{movieDetails.vote_average?.toFixed(1)}</span>
                                        <span className="text-gray-300 text-xs md:text-sm">/ 10</span>
                                    </div>

                                    {/* Duration */}
                                    <div className="flex items-center gap-1 md:gap-2 bg-white/10 backdrop-blur-sm px-2 md:px-4 py-1 md:py-2 rounded-full">
                                        <i className='bx bx-time text-base md:text-xl'></i>
                                        <span>{duration}</span>
                                    </div>

                                    {/* Release Date - Hidden on very small screens */}
                                    <div className="hidden sm:flex items-center gap-1 md:gap-2 bg-white/10 backdrop-blur-sm px-2 md:px-4 py-1 md:py-2 rounded-full">
                                        <i className='bx bx-calendar text-base md:text-xl'></i>
                                        <span>{movieDetails.release_date}</span>
                                    </div>
                                </div>

                                {/* Genres */}
                                <div className="flex flex-wrap gap-1 md:gap-2">
                                    {movieDetails.genres?.map(genre => (
                                        <span
                                            key={genre.id}
                                            className="px-2 md:px-4 py-0.5 md:py-1 bg-gradient-to-r from-red-600/30 to-red-500/30 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium border border-red-500/30"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap items-center gap-2 md:gap-4">
                                    <button
                                        className="flex items-center gap-2 md:gap-3 px-4 md:px-8 py-2 md:py-4 bg-white text-black rounded-lg font-bold text-sm md:text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-xl"
                                        onClick={handlePlayTrailer}
                                    >
                                        <i className='bx bx-play text-xl md:text-3xl'></i>
                                        <span>Play Trailer</span>
                                    </button>
                                    <button className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-gray-800/60 backdrop-blur-md hover:bg-gray-700/80 transition-all duration-300 transform hover:scale-110 border border-gray-600/30">
                                        <i className='bx bx-plus text-xl md:text-3xl'></i>
                                    </button>
                                    <button className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-gray-800/60 backdrop-blur-md hover:bg-gray-700/80 transition-all duration-300 transform hover:scale-110 border border-gray-600/30">
                                        <i className='bx bx-like text-lg md:text-2xl'></i>
                                    </button>
                                    <button className="hidden sm:flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-gray-800/60 backdrop-blur-md hover:bg-gray-700/80 transition-all duration-300 transform hover:scale-110 border border-gray-600/30">
                                        <i className='bx bx-share text-lg md:text-2xl'></i>
                                    </button>
                                </div>

                                {/* Overview */}
                                <div className="max-w-3xl">
                                    <h2 className="text-lg md:text-2xl font-bold mb-1 md:mb-3">Overview</h2>
                                    <p className="text-sm md:text-lg text-gray-200 leading-relaxed line-clamp-4 md:line-clamp-none">
                                        {movieDetails.overview}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {movieVideos && !isClosed && filterTrailer && filterTrailer.length > 0 && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in p-4">
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-red-500 transition-colors duration-300 transform hover:scale-110 z-50"
                        onClick={handleClosePlayTrailer}
                    >
                        <i className='bx bx-x text-4xl md:text-6xl'></i>
                    </button>

                    {/* Video Container */}
                    <div className="w-full max-w-6xl">
                        <iframe
                            className="w-full aspect-video rounded-lg shadow-2xl border-0"
                            src={`https://www.youtube.com/embed/${filterTrailer[0].key}?autoplay=1&controls=1`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>
            )}
        </>
    )
}

export default MovieDetailsHeader;