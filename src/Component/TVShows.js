import Header from './Header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearMovieDetails } from '../Utils/detailsSlice';
import Footer from './Footer';

const TVShows = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMovieDetails())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20 md:pt-24">
      <Header />

      {/* Page Header */}
      <div className="px-4 md:px-8 mb-4 md:mb-8">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-1 md:mb-2">TV Shows</h1>
        <p className="text-gray-400 text-sm md:text-lg">Discover amazing TV series and shows</p>
      </div>

      <div className='relative z-20 pb-12 md:pb-20 px-4 md:px-8'>
        <div className="flex items-center justify-center h-64 md:h-96">
          <div className="text-center">
            <i className='bx bx-tv text-6xl md:text-9xl text-gray-600 mb-2 md:mb-4'></i>
            <h2 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-4">Coming Soon</h2>
            <p className="text-gray-400 text-sm md:text-lg">TV Shows section is under development</p>
            <p className="text-gray-500 text-xs md:text-base mt-1 md:mt-2">Stay tuned for amazing TV series!</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default TVShows;

