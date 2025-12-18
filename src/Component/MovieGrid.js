import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMovieDetails, addMovieCast, addMovieVideos, addMovieGallery } from '../Utils/detailsSlice';
import options from '../Utils/constants';

const MovieGrid = ({ movies, loading, mediaType = 'movie' }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async (item) => {
    const endpoint = mediaType === 'movie' 
      ? `https://api.themoviedb.org/3/movie/${item.id}`
      : `https://api.themoviedb.org/3/tv/${item.id}`;
    
    try {
      const [details, credits, videos, images] = await Promise.all([
        fetch(`${endpoint}?language=en-US`, options).then(res => res.json()),
        fetch(`${endpoint}/credits?language=en-US`, options).then(res => res.json()),
        fetch(`${endpoint}/videos?language=en-US`, options).then(res => res.json()),
        fetch(`${endpoint}/images`, options).then(res => res.json()),
      ]);
      
      dispatch(addMovieDetails(details));
      dispatch(addMovieCast(credits));
      dispatch(addMovieVideos(videos));
      dispatch(addMovieGallery(images));
      navigate(`/browse/${item.id}`);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'TBA';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getRatingColor = (rating) => {
    if (rating >= 7) return 'bg-green-500';
    if (rating >= 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[2/3] bg-gray-700 rounded-lg mb-2"></div>
            <div className="h-3 md:h-4 bg-gray-700 rounded w-3/4 mb-1"></div>
            <div className="h-2 md:h-3 bg-gray-800 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-8 md:py-16">
        <div className="text-center text-gray-500">
          <i className='bx bx-movie text-4xl md:text-6xl mb-4'></i>
          <p className="text-lg md:text-xl text-gray-400">No results found</p>
          <p className="text-xs md:text-sm text-gray-500">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5">
      {movies.map((item) => (
        <div
          key={item.id}
          onClick={() => handleClick(item)}
          className="group cursor-pointer"
        >
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-1 md:mb-2 shadow-lg">
            {/* Rating Badge */}
            <div className={`absolute top-1 left-1 md:top-2 md:left-2 z-10 w-7 h-7 md:w-9 md:h-9 rounded-full ${getRatingColor(item.vote_average)} flex items-center justify-center shadow-lg border-2 border-gray-900`}>
              <span className="text-white text-[10px] md:text-xs font-bold">
                {item.vote_average ? Math.round(item.vote_average * 10) : 'NR'}
              </span>
            </div>

            {/* Poster Image */}
            {item.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                alt={item.title || item.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <i className='bx bx-movie text-2xl md:text-4xl text-gray-600'></i>
              </div>
            )}

            {/* Hover Overlay - Desktop only */}
            <div className="hidden md:flex absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 items-center justify-center">
              <i className='bx bx-play-circle text-5xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'></i>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-gray-200 font-semibold text-xs md:text-sm leading-tight line-clamp-2 group-hover:text-red-500 transition-colors">
            {item.title || item.name}
          </h3>

          {/* Date */}
          <p className="text-gray-500 text-[10px] md:text-xs mt-0.5 md:mt-1">
            {formatDate(item.release_date || item.first_air_date)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;

