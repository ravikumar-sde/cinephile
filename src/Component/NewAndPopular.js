import Header from './Header';
import List from './List';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearMovieDetails } from '../Utils/detailsSlice';
import Footer from './Footer';

const NewAndPopular = () => {
  const dispatch = useDispatch();
  const { playingNowMovies, popularMovies } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(clearMovieDetails())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-24">
      <Header />
      
      {/* Page Header */}
      <div className="px-8 mb-8">
        <h1 className="text-5xl font-black text-white mb-2">New & Popular</h1>
        <p className="text-gray-400 text-lg">Latest releases and trending content</p>
      </div>

      <div className='relative z-20 pb-20'>
        {/* New Releases Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mx-8 mb-4">
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
              🆕 New Releases
            </span>
          </div>
          <List heading='Just Added' movies={playingNowMovies} />
        </div>

        {/* Trending Now Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mx-8 mb-4">
            <span className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
              🔥 Trending
            </span>
          </div>
          <List heading='Trending Now' movies={popularMovies} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default NewAndPopular;

