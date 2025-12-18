import Login from './Login';
import Browse from './Browse';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import useFetchMovies from '../Hooks/useFetchMovies';
import { addPlayingNowMovies, addPopularMovies, addTopRatedMovies } from '../Utils/moviesSlice';
import SearchedMovie from './SearchedMovie';
import Details from './Details/Details';
import Movies from './Movies';
import TVShows from './TVShows';
import NewAndPopular from './NewAndPopular';
import CategoryPage from './CategoryPage';

const Body = () => {
  useFetchMovies('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', addPlayingNowMovies);
  useFetchMovies('https://api.themoviedb.org/3/trending/all/day?language=en-US', addPopularMovies);
  useFetchMovies('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', addTopRatedMovies);

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/browse',
      element: <Browse />,
    },
    {
      path: '/browse/:id',
      element: <Details />
    },
    {
      path: '/search',
      element: <SearchedMovie />
    },
    {
      path: '/movies',
      element: <Movies />
    },
    // Movie Category Routes
    {
      path: '/movies/popular',
      element: <CategoryPage
        title="Popular Movies"
        baseEndpoint="https://api.themoviedb.org/3/discover/movie"
        mediaType="movie"
      />
    },
    {
      path: '/movies/now-playing',
      element: <CategoryPage
        title="Now Playing"
        baseEndpoint="https://api.themoviedb.org/3/movie/now_playing"
        mediaType="movie"
      />
    },
    {
      path: '/movies/upcoming',
      element: <CategoryPage
        title="Upcoming Movies"
        baseEndpoint="https://api.themoviedb.org/3/movie/upcoming"
        mediaType="movie"
      />
    },
    {
      path: '/movies/top-rated',
      element: <CategoryPage
        title="Top Rated Movies"
        baseEndpoint="https://api.themoviedb.org/3/movie/top_rated"
        mediaType="movie"
      />
    },
    // TV Shows Category Routes
    {
      path: '/tv-shows',
      element: <TVShows />
    },
    {
      path: '/tv/popular',
      element: <CategoryPage
        title="Popular TV Shows"
        baseEndpoint="https://api.themoviedb.org/3/discover/tv"
        mediaType="tv"
      />
    },
    {
      path: '/tv/airing-today',
      element: <CategoryPage
        title="TV Shows Airing Today"
        baseEndpoint="https://api.themoviedb.org/3/tv/airing_today"
        mediaType="tv"
      />
    },
    {
      path: '/tv/on-tv',
      element: <CategoryPage
        title="Currently Airing TV Shows"
        baseEndpoint="https://api.themoviedb.org/3/tv/on_the_air"
        mediaType="tv"
      />
    },
    {
      path: '/tv/top-rated',
      element: <CategoryPage
        title="Top Rated TV Shows"
        baseEndpoint="https://api.themoviedb.org/3/tv/top_rated"
        mediaType="tv"
      />
    },
    {
      path: '/new-and-popular',
      element: <NewAndPopular />
    }
  ]);

  return (
    <RouterProvider router={appRouter} />
  )
}

export default Body;