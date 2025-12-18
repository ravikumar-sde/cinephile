import Header from './Header';
import List from './List';
import { useSelector } from 'react-redux';
import VideoBanner from './VideoBanner';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { clearMovieDetails } from '../Utils/detailsSlice';
import Footer from './Footer';

const Browse = () => {
  const dispatch = useDispatch();
  const { playingNowMovies, popularMovies, topRatedMovies } = useSelector((state) => state.movies);
  const index = playingNowMovies && Math.floor(Math.random() * playingNowMovies.length - 1) + 1;
  const movie = playingNowMovies && playingNowMovies[index];

  useEffect(() =>{
    dispatch(clearMovieDetails())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Header />
      {movie && <VideoBanner movie={movie} />}
      <div className='relative -mt-16 md:-mt-32 z-20 pb-10 md:pb-20'>
        {/* Trending Section with Badge */}
        <div className="mb-4 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3 mx-4 md:mx-8 mb-2 md:mb-4">
            <span className="bg-gradient-to-r from-red-600 to-red-500 text-white px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider shadow-lg">
              🔥 Trending
            </span>
          </div>
          <List heading='Now Playing' movies={playingNowMovies} />
        </div>

        {/* Popular Section */}
        <div className="mb-4 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3 mx-4 md:mx-8 mb-2 md:mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider shadow-lg">
              ⭐ Popular
            </span>
          </div>
          <List heading='Recommended For You' movies={popularMovies} />
        </div>

        {/* Top Rated Section */}
        <div className="mb-4 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3 mx-4 md:mx-8 mb-2 md:mb-4">
            <span className="bg-gradient-to-r from-yellow-600 to-orange-500 text-white px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider shadow-lg">
              🏆 Top Rated
            </span>
          </div>
          <List heading='Critically Acclaimed' movies={topRatedMovies} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Browse;