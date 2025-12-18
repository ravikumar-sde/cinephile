import { useDispatch } from "react-redux";
import options from "../Utils/constants";
import { addMovieDetails, addMovieCast, addMovieVideos, addMovieGallery } from "../Utils/detailsSlice";
import { useNavigate } from "react-router-dom";

const Card = ({ movie }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getMovieDetails = async (id) => {
        const response = await fetch('https://api.themoviedb.org/3/movie/'+id+'?language=en-US', options);
        const result = await response.json();
        return result;
    }

    const getCastDetails = async (id) => {
        const response = await fetch('https://api.themoviedb.org/3/movie/'+id+'/credits?language=en-US', options);
        const result = await response.json();
        return result;
    }

    const getMoviesDetails = async (id) => {
        const response = await fetch('https://api.themoviedb.org/3/movie/'+id+'/videos?language=en-US', options);
        const result = await response.json();
        return result;
    }

    const getMovieGallery = async (id) => {
        const response = await fetch('https://api.themoviedb.org/3/movie/'+id+'/images', options);
        const result = await response.json();
        return result;
    }

    const handleMovieDetails = () => {
        getMovieDetails(movie.id).then(data => {
            dispatch(addMovieDetails(data));
        });

        getCastDetails(movie.id).then(data => {
            dispatch(addMovieCast(data.cast));
        });

        getMoviesDetails(movie.id).then(data => {
            dispatch(addMovieVideos(data.results));
        });

        getMovieGallery(movie.id).then(data => {
            dispatch(addMovieGallery(data.backdrops));
        });

        navigate(`/browse/${movie.id}`);
    }

    return (
        <div className="snap-start flex-shrink-0 p-1 md:p-2">
            <div
                className="group relative cursor-pointer w-32 sm:w-40 md:w-48 lg:w-56 transition-transform duration-300 ease-out hover:scale-105 md:hover:scale-110 hover:z-50"
                onClick={handleMovieDetails}
            >
                <div className="relative overflow-hidden rounded-lg shadow-2xl">
                    <img
                        className='w-full rounded-lg transition-all duration-300 hover:brightness-50'
                        alt={movie.title}
                        src={'https://image.tmdb.org/t/p/w780' + movie.poster_path}
                    />

                    {/* Hover Overlay - Hidden on mobile, shown on tablet+ */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 md:hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-end p-2 md:p-4">
                        <h3 className="text-white font-bold text-sm md:text-lg mb-1 md:mb-2 line-clamp-2">{movie.title}</h3>

                        <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3">
                            {movie.vote_average && (
                                <div className="flex items-center gap-1 bg-yellow-500/80 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full">
                                    <i className='bx bxs-star text-white text-[10px] md:text-xs'></i>
                                    <span className="text-white text-[10px] md:text-xs font-bold">{movie.vote_average.toFixed(1)}</span>
                                </div>
                            )}
                            {movie.release_date && (
                                <span className="text-gray-300 text-[10px] md:text-xs font-medium">
                                    {new Date(movie.release_date).getFullYear()}
                                </span>
                            )}
                        </div>

                        <div className="flex gap-1 md:gap-2">
                            <button className="flex-1 bg-white text-black py-1.5 md:py-2 px-2 md:px-3 rounded-md font-bold text-xs md:text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-1">
                                <i className='bx bx-play text-base md:text-xl'></i>
                                <span className="hidden sm:inline">View</span>
                            </button>
                            <button className="bg-gray-800/80 text-white p-1.5 md:p-2 rounded-md hover:bg-gray-700 transition-colors">
                                <i className='bx bx-plus text-base md:text-xl'></i>
                            </button>
                        </div>
                    </div>

                    {/* Top Badge for High Rated Movies */}
                    {movie.vote_average >= 8 && (
                        <div className="absolute top-1 md:top-2 right-1 md:right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold shadow-lg">
                            ⭐ {movie.vote_average.toFixed(1)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Card;