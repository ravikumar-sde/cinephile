import Header from './Header';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { clearMovieDetails } from '../Utils/detailsSlice';
import Footer from './Footer';
import FiltersSidebar from './FiltersSidebar';
import MovieGrid from './MovieGrid';
import options from '../Utils/constants';

const NewAndPopular = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('trending');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    sortBy: 'popularity.desc',
    selectedGenres: [],
    fromDate: '',
    toDate: new Date().toISOString().split('T')[0]
  });

  const tabs = [
    { id: 'trending', label: 'Trending', icon: 'bx-trending-up', endpoint: 'https://api.themoviedb.org/3/trending/all/day' },
    { id: 'now-playing', label: 'Now Playing', icon: 'bx-play-circle', endpoint: 'https://api.themoviedb.org/3/movie/now_playing' },
    { id: 'airing-today', label: 'Airing Today', icon: 'bx-tv', endpoint: 'https://api.themoviedb.org/3/tv/airing_today' },
  ];

  useEffect(() => {
    dispatch(clearMovieDetails());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const currentTab = tabs.find(t => t.id === activeTab);
    try {
      const url = `${currentTab.endpoint}?language=en-US&page=${page}`;
      const response = await fetch(url, options);
      const data = await response.json();
      setMovies(data.results || []);
      setTotalPages(Math.min(data.total_pages || 1, 500));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getMediaType = () => {
    if (activeTab === 'airing-today') return 'tv';
    if (activeTab === 'now-playing') return 'movie';
    return 'movie'; // For trending, default to movie
  };

  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Header />

      {/* Page Content */}
      <div className="pt-20 md:pt-24 pb-8 md:pb-12 px-4 md:px-8">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">New & Popular</h1>
        <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-6">Latest releases and trending content</p>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-3 md:px-5 py-2 md:py-2.5 rounded-lg text-sm md:text-base font-medium transition-all duration-300 flex items-center gap-1 md:gap-2 ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-500/30'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              <i className={`bx ${tab.icon} text-base md:text-lg`}></i>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden w-full mb-4 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-medium flex items-center justify-center gap-2"
        >
          <i className={`bx ${showFilters ? 'bx-x' : 'bx-filter-alt'} text-lg`}></i>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <FiltersSidebar onFilterChange={handleFilterChange} mediaType={getMediaType()} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <MovieGrid movies={movies} loading={loading} mediaType={getMediaType()} />

            {/* Pagination */}
            {totalPages > 1 && !loading && (
              <div className="mt-6 md:mt-8 flex items-center justify-center gap-1 md:gap-2 flex-wrap">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={page === 1}
                  className="px-2 md:px-3 py-1.5 md:py-2 rounded bg-gray-800 text-gray-300 border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                >
                  <i className='bx bx-first-page text-base md:text-lg'></i>
                </button>
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-2 md:px-3 py-1.5 md:py-2 rounded bg-gray-800 text-gray-300 border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                >
                  <i className='bx bx-chevron-left text-base md:text-lg'></i>
                </button>

                <div className="flex items-center gap-1">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 md:w-10 md:h-10 rounded text-sm md:text-base font-medium transition-colors ${
                          page === pageNum
                            ? 'bg-red-600 text-white shadow-lg shadow-red-500/30'
                            : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-2 md:px-3 py-1.5 md:py-2 rounded bg-gray-800 text-gray-300 border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                >
                  <i className='bx bx-chevron-right text-base md:text-lg'></i>
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={page === totalPages}
                  className="px-2 md:px-3 py-1.5 md:py-2 rounded bg-gray-800 text-gray-300 border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                >
                  <i className='bx bx-last-page text-base md:text-lg'></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewAndPopular;

