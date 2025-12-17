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
                <div className="relative w-full h-[85vh] overflow-hidden">
                    {/* Background Image with Gradient Overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="relative h-full max-w-7xl mx-auto px-8 flex items-end pb-16">
                        <div className="flex gap-8 w-full animate-fade-in">
                            {/* Poster */}
                            <div className="flex-shrink-0 hidden md:block">
                                <img
                                    className="rounded-xl shadow-2xl w-72 h-auto transform hover:scale-105 transition-transform duration-300"
                                    alt="movie-poster"
                                    src={"https://image.tmdb.org/t/p/w500/" + movieDetails.poster_path}
                                />
                            </div>

                            {/* Movie Info */}
                            <div className="text-white flex-1 space-y-6">
                                {/* Title */}
                                <div>
                                    <h1 className="text-5xl md:text-6xl font-black mb-3 drop-shadow-2xl">
                                        {movieDetails.title}
                                    </h1>
                                    <p className="text-2xl text-gray-300 font-light">
                                        {releaseDate[0]}
                                    </p>
                                </div>

                                {/* Meta Info */}
                                <div className="flex flex-wrap items-center gap-4 text-lg">
                                    {/* Rating */}
                                    <div className="flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-500/30">
                                        <i className='bx bxs-star text-yellow-400 text-xl'></i>
                                        <span className="font-bold">{movieDetails.vote_average?.toFixed(1)}</span>
                                        <span className="text-gray-300 text-sm">/ 10</span>
                                    </div>

                                    {/* Duration */}
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                        <i className='bx bx-time text-xl'></i>
                                        <span>{duration}</span>
                                    </div>

                                    {/* Release Date */}
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                        <i className='bx bx-calendar text-xl'></i>
                                        <span>{movieDetails.release_date}</span>
                                    </div>
                                </div>

                                {/* Genres */}
                                <div className="flex flex-wrap gap-2">
                                    {movieDetails.genres?.map(genre => (
                                        <span
                                            key={genre.id}
                                            className="px-4 py-1 bg-gradient-to-r from-red-600/30 to-red-500/30 backdrop-blur-sm rounded-full text-sm font-medium border border-red-500/30"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap items-center gap-4">
                                    <button
                                        className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-lg font-bold text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-xl"
                                        onClick={handlePlayTrailer}
                                    >
                                        <i className='bx bx-play text-3xl'></i>
                                        <span>Play Trailer</span>
                                    </button>
                                    <button className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-800/60 backdrop-blur-md hover:bg-gray-700/80 transition-all duration-300 transform hover:scale-110 border border-gray-600/30">
                                        <i className='bx bx-plus text-3xl'></i>
                                    </button>
                                    <button className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-800/60 backdrop-blur-md hover:bg-gray-700/80 transition-all duration-300 transform hover:scale-110 border border-gray-600/30">
                                        <i className='bx bx-like text-2xl'></i>
                                    </button>
                                    <button className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-800/60 backdrop-blur-md hover:bg-gray-700/80 transition-all duration-300 transform hover:scale-110 border border-gray-600/30">
                                        <i className='bx bx-share text-2xl'></i>
                                    </button>
                                </div>

                                {/* Overview */}
                                <div className="max-w-3xl">
                                    <h2 className="text-2xl font-bold mb-3">Overview</h2>
                                    <p className="text-lg text-gray-200 leading-relaxed">
                                        {movieDetails.overview}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {movieVideos && !isClosed && filterTrailer && filterTrailer.length > 0 && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in">
                    {/* Close Button */}
                    <button
                        className="absolute top-8 right-8 text-white hover:text-red-500 transition-colors duration-300 transform hover:scale-110 z-50"
                        onClick={handleClosePlayTrailer}
                    >
                        <i className='bx bx-x text-6xl'></i>
                    </button>

                    {/* Video Container */}
                    <div className="w-11/12 max-w-6xl">
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