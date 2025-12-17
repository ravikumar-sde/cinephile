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
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-24">
      <Header />
      
      {/* Page Header */}
      <div className="px-8 mb-8">
        <h1 className="text-5xl font-black text-white mb-2">Movies</h1>
        <p className="text-gray-400 text-lg">Explore our collection of amazing movies</p>
      </div>

      <div className='relative z-20 pb-20'>
        {/* Now Playing Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mx-8 mb-4">
            <span className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
              🎬 Now Playing
            </span>
          </div>
          <List heading='In Theaters Now' movies={playingNowMovies} />
        </div>

        {/* Popular Movies Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mx-8 mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
              ⭐ Popular
            </span>
          </div>
          <List heading='Popular Movies' movies={popularMovies} />
        </div>

        {/* Top Rated Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mx-8 mb-4">
            <span className="bg-gradient-to-r from-yellow-600 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
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

