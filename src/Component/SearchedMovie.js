import { useSelector } from "react-redux";
import Card from "./Card";
import Header from "./Header";
import Footer from "./Footer";

const SearchedMovie = () => {
    const { searchData, searchText } = useSelector((state) => state.functionality);
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
            <Header />
            <div className="text-white pt-24 px-10">
                <h2 className="text-4xl font-bold mb-2">
                    Search Results for <span className="text-red-500 italic">"{searchText}"</span>
                </h2>
                <p className="text-gray-400 mb-8">
                    {searchData?.length || 0} results found
                </p>
            </div>
            <div className="flex flex-wrap px-10 justify-start gap-4 pb-20">
                {searchData && searchData.map(movie => {
                    if (movie.poster_path !== null) {
                        return <Card movie={movie} key={movie.id} />
                    } else {
                        return null;
                    }
                })}
            </div>
            <Footer />
        </div>
    );
}

export default SearchedMovie;