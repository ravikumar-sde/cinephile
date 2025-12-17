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
    {
      path: '/tv-shows',
      element: <TVShows />
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