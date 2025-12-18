import { useDispatch } from "react-redux";
import { toggleSearchBar } from "../Utils/functionalitySlice";
import { useRef, useState } from "react";
import { addSearchData, clearSearchData, addSearchText } from "../Utils/functionalitySlice";
import getSearchResult from "../Utils/openai";
import options from "../Utils/constants";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [placeHolder, setPlaceHolder] = useState('Ex: Fighter');

    const handleCloseButton = () => {
        dispatch(toggleSearchBar(true))
    }

    const addSearchedData = (data) => {
        dispatch(clearSearchData());
        Promise.all(data.map(data => {
            return fetch(`https://api.themoviedb.org/3/search/movie?query=${data}&include_adult=false&language=en-US&page=1`, options)
                .then(response => {
                    return response.json();
                });
        })).then(response => {
            response.forEach(res => {
                dispatch(addSearchData(res.results));
            });
        });
    }

    const searchText = useRef(null);
    const option = useRef(null);

    const handleSelect = (e) => {
        if (e.target.value === 'gpt') {
            setPlaceHolder("Ex: Best hindi comedy movies.");
        } else if (e.target.value === 'normal') {
            setPlaceHolder("Ex: Fighter")
        }
    }

    const handleSearch = () => {
        if (option.current.value === 'normal') {
            addSearchedData([searchText.current.value]);
        } else if (option.current.value === 'gpt') {
            const preparePrompt = `Act as movie recommendation system. Please suggest ${searchText.current.value}.
            Only give maximum five names and name should be comma seprated.
            Example: Fighter,Gadar,Ram Ratan Dhan Payo,Golmaal,Jab we met.`

            getSearchResult(preparePrompt).then(result => {
                addSearchedData(result.split(','));
            });
        }

        dispatch(addSearchText(searchText.current.value));
        handleCloseButton();
        navigate('/search');
    }

    return (
        <>
            <div className="bg-black fixed inset-0 opacity-85 z-40"></div>
            <div className="fixed top-32 md:top-56 left-1/2 -translate-x-1/2 flex flex-col md:flex-row gap-2 md:gap-2 z-50 w-[90%] md:w-auto px-4 md:px-0">
                <input ref={searchText} className="w-full md:w-96 py-3 md:py-4 px-3 md:px-4 text-base md:text-xl rounded border-2 md:border-4 border-red-700 bg-gray-900 text-white outline-none" placeholder={placeHolder} type="text" />
                <div className="flex gap-2">
                    <select ref={option} className="flex-1 md:flex-none rounded px-3 md:px-4 py-2 md:py-0 bg-white text-gray-500 font-medium text-sm md:text-lg outline-none" onClick={handleSelect}>
                        <option className="text-sm md:text-lg" value='normal'>Normal</option>
                        <option className="text-sm md:text-lg" value='gpt'>Advanced</option>
                    </select>
                    <button className="flex-1 md:flex-none bg-red-500 px-6 md:px-8 py-2 md:py-0 text-base md:text-xl text-white font-medium rounded" onClick={handleSearch}>Search</button>
                </div>
            </div>
            <div className="fixed text-gray-300 top-4 right-4 md:top-0 md:right-0 z-50 cursor-pointer" onClick={handleCloseButton}>
                <i className='bx bx-x text-4xl md:text-5xl md:mr-10'></i>
            </div>
        </>
    )
}

export default SearchBar;