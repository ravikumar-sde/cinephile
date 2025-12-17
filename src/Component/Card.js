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
        <div className="snap-start flex-shrink-0 p-2">
            <div
                className="group relative cursor-pointer w-56 transition-transform duration-300 ease-out hover:scale-110 hover:z-50"
                onClick={handleMovieDetails}
            >
                <div className="relative overflow-hidden rounded-lg shadow-2xl">
                    <img
                        className='w-full rounded-lg transition-all duration-300 group-hover:brightness-50'
                        alt={movie.title}
                        src={'https://image.tmdb.org/t/p/w780' + movie.poster_path}
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-end p-4">
                        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{movie.title}</h3>

                        <div className="flex items-center gap-2 mb-3">
                            {movie.vote_average && (
                                <div className="flex items-center gap-1 bg-yellow-500/80 px-2 py-1 rounded-full">
                                    <i className='bx bxs-star text-white text-xs'></i>
                                    <span className="text-white text-xs font-bold">{movie.vote_average.toFixed(1)}</span>
                                </div>
                            )}
                            {movie.release_date && (
                                <span className="text-gray-300 text-xs font-medium">
                                    {new Date(movie.release_date).getFullYear()}
                                </span>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <button className="flex-1 bg-white text-black py-2 px-3 rounded-md font-bold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-1">
                                <i className='bx bx-play text-xl'></i>
                                Play
                            </button>
                            <button className="bg-gray-800/80 text-white p-2 rounded-md hover:bg-gray-700 transition-colors">
                                <i className='bx bx-plus text-xl'></i>
                            </button>
                        </div>
                    </div>

                    {/* Top Badge for High Rated Movies */}
                    {movie.vote_average >= 8 && (
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                            ⭐ {movie.vote_average.toFixed(1)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Card;