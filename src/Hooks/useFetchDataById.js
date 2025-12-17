import { useEffect } from "react";
import options from "../Utils/constants";
import { useDispatch } from "react-redux";
import { addMovieTrailer } from "../Utils/moviesSlice";

const useFetchDataById = (movie) => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/" + movie.id + "/videos?language=en-US", options)
            .then(response => {
                return response.json()
            })
            .then(response => {
                const filterMovieTrailers = response.results.filter(video => video.type === 'Trailer');
                const trailer = filterMovieTrailers && filterMovieTrailers.length && filterMovieTrailers[0];
                dispatch(addMovieTrailer({
                    trailer: trailer,
                    title: movie.title,
                    overview: movie.overview,
                    vote_average: movie.vote_average,
                    release_date: movie.release_date,
                    runtime: movie.runtime
                }))
            })
            .catch(err => {
                console.error(err)
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

export default useFetchDataById;