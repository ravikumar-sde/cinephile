import Header from "../Header";
import MovieDetailsHeader from "./MovieDetailsHeader";
import Cast from "./Cast";
import Videos from "./Videos";
import Gallery from "./Gallery";
import { useParams } from "react-router-dom";
import useMovieDetails from "../../Hooks/useMovieDetails";
import { addMovieVideos, addMovieDetails, addMovieCast, addMovieGallery } from "../../Utils/detailsSlice";
import SideDetails from "./SideDetails";
import Footer from "../Footer";

const Details = () => {
    const id = useParams().id;
    useMovieDetails('https://api.themoviedb.org/3/movie/' + id + '?language=en-US', addMovieDetails);
    useMovieDetails('https://api.themoviedb.org/3/movie/' + id + '/videos?language=en-US', addMovieVideos);
    useMovieDetails('https://api.themoviedb.org/3/movie/' + id + '/credits?language=en-US', addMovieCast);
    useMovieDetails('https://api.themoviedb.org/3/movie/' + id + '/images', addMovieGallery);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
            <Header />
            <MovieDetailsHeader />
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    <div className="lg:col-span-2 space-y-6 md:space-y-12">
                        <Cast />
                        <Videos />
                        <Gallery />
                    </div>
                    <div className="lg:col-span-1">
                        <SideDetails />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Details;