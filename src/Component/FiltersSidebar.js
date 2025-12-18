import { useState, useEffect } from 'react';
import options from '../Utils/constants';

const FiltersSidebar = ({ onFilterChange, mediaType = 'movie' }) => {
  const [sortOpen, setSortOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);

  const sortOptions = [
    { value: 'popularity.desc', label: 'Popularity Descending' },
    { value: 'popularity.asc', label: 'Popularity Ascending' },
    { value: 'vote_average.desc', label: 'Rating Descending' },
    { value: 'vote_average.asc', label: 'Rating Ascending' },
    { value: 'primary_release_date.desc', label: 'Release Date Descending' },
    { value: 'primary_release_date.asc', label: 'Release Date Ascending' },
    { value: 'title.asc', label: 'Title (A-Z)' },
    { value: 'title.desc', label: 'Title (Z-A)' },
  ];

  // Fetch genres
  useEffect(() => {
    const genreEndpoint = mediaType === 'movie' 
      ? 'https://api.themoviedb.org/3/genre/movie/list?language=en-US'
      : 'https://api.themoviedb.org/3/genre/tv/list?language=en-US';
    
    fetch(genreEndpoint, options)
      .then(res => res.json())
      .then(data => setGenres(data.genres || []))
      .catch(err => console.error(err));
  }, [mediaType]);

  // Notify parent of filter changes
  useEffect(() => {
    onFilterChange({
      sortBy,
      selectedGenres,
      fromDate,
      toDate
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, selectedGenres, fromDate, toDate]);

  const handleGenreToggle = (genreId) => {
    setSelectedGenres(prev => 
      prev.includes(genreId) 
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  return (
    <div className="w-full lg:w-64 flex-shrink-0 space-y-4 mb-4 lg:mb-0">
      {/* Sort Section */}
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden">
        <button
          onClick={() => setSortOpen(!sortOpen)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-700/50 transition-colors"
        >
          <span className="font-semibold text-white text-sm md:text-base">Sort</span>
          <i className={`bx bx-chevron-${sortOpen ? 'up' : 'down'} text-xl text-gray-400`}></i>
        </button>
        {sortOpen && (
          <div className="px-4 pb-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 bg-gray-900 border border-gray-600 rounded-md text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Filters Section */}
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden">
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-700/50 transition-colors"
        >
          <span className="font-semibold text-white text-sm md:text-base">Filters</span>
          <i className={`bx bx-chevron-${filtersOpen ? 'up' : 'down'} text-xl text-gray-400`}></i>
        </button>
        {filtersOpen && (
          <div className="px-4 pb-4 space-y-4">
            {/* Release Dates */}
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Release Dates</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-500 w-10">from</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="flex-1 p-1.5 text-xs bg-gray-900 border border-gray-600 rounded text-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-500 w-10">to</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="flex-1 p-1.5 text-xs bg-gray-900 border border-gray-600 rounded text-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Genres */}
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Genres</h4>
              <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreToggle(genre.id)}
                    className={`px-2 md:px-3 py-1 text-xs rounded-full border transition-colors ${
                      selectedGenres.includes(genre.id)
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-gray-900 text-gray-300 border-gray-600 hover:border-red-500'
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FiltersSidebar;

