import { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';
import FiltersSidebar from './FiltersSidebar';
import MovieGrid from './MovieGrid';
import options from '../Utils/constants';

const CategoryPage = ({ title, baseEndpoint, mediaType = 'movie' }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: 'popularity.desc',
    selectedGenres: [],
    fromDate: '',
    toDate: new Date().toISOString().split('T')[0]
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${baseEndpoint}?language=en-US&page=${page}`;
      
      // Add filters if using discover endpoint
      if (baseEndpoint.includes('discover')) {
        url += `&sort_by=${filters.sortBy}`;
        if (filters.selectedGenres.length > 0) {
          url += `&with_genres=${filters.selectedGenres.join(',')}`;
        }
        if (filters.fromDate) {
          const dateParam = mediaType === 'movie' ? 'primary_release_date.gte' : 'first_air_date.gte';
          url += `&${dateParam}=${filters.fromDate}`;
        }
        if (filters.toDate) {
          const dateParam = mediaType === 'movie' ? 'primary_release_date.lte' : 'first_air_date.lte';
          url += `&${dateParam}=${filters.toDate}`;
        }
      }

      const response = await fetch(url, options);
      const data = await response.json();
      setMovies(data.results || []);
      setTotalPages(Math.min(data.total_pages || 1, 500));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  }, [baseEndpoint, page, filters, mediaType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Header />

      {/* Page Content */}
      <div className="pt-20 md:pt-24 pb-8 md:pb-12 px-4 md:px-8">
        {/* Title and Filter Toggle */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h1 className="text-xl md:text-3xl font-bold text-white">{title}</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors"
          >
            <i className='bx bx-filter-alt text-lg'></i>
            <span className="text-sm">Filters</span>
          </button>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Sidebar - Hidden on mobile unless toggled */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <FiltersSidebar onFilterChange={handleFilterChange} mediaType={mediaType} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <MovieGrid movies={movies} loading={loading} mediaType={mediaType} />

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
                        className={`w-8 h-8 md:w-10 md:h-10 rounded font-medium text-sm md:text-base transition-colors ${
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

export default CategoryPage;

