import Header from './Header';
import List from './List';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearMovieDetails } from '../Utils/detailsSlice';
import Footer from './Footer';

const Movies = () => {
  const dispatch = useDispatch();
  const { playingNowMovies, popularMovies, topRatedMovies } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(clearMovieDetails())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20 md:pt-24">
      <Header />

      {/* Page Header */}
      <div className="px-4 md:px-8 mb-4 md:mb-8">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-1 md:mb-2">Movies</h1>
        <p className="text-gray-400 text-sm md:text-lg">Explore our collection of amazing movies</p>
      </div>

      <div className='relative z-20 pb-12 md:pb-20'>
        {/* Now Playing Section */}
        <div className="mb-4 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3 mx-4 md:mx-8 mb-2 md:mb-4">
            <span className="bg-gradient-to-r from-red-600 to-red-500 text-white px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider shadow-lg">
              🎬 Now Playing
            </span>
          </div>
          <List heading='In Theaters Now' movies={playingNowMovies} />
        </div>

        {/* Popular Movies Section */}
        <div className="mb-4 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3 mx-4 md:mx-8 mb-2 md:mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider shadow-lg">
              ⭐ Popular
            </span>
          </div>
          <List heading='Popular Movies' movies={popularMovies} />
        </div>

        {/* Top Rated Section */}
        <div className="mb-4 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3 mx-4 md:mx-8 mb-2 md:mb-4">
            <span className="bg-gradient-to-r from-yellow-600 to-orange-500 text-white px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider shadow-lg">
              🏆 Top Rated
            </span>
          </div>
          <List heading='Critically Acclaimed Movies' movies={topRatedMovies} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Movies;

