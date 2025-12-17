import { useSelector } from "react-redux";

const SideDetails = () => {
    const { movieDetails } = useSelector(state => state.details);

    function addCommas(str) {
        // Reverse the string to simplify insertion logic
        str = str.toString().split('').reverse().join('');
        
        // Insert commas after every third character
        let formattedStr = '';
        for (let i = 0; i < str.length; i++) {
            if (i > 0 && i % 3 === 0) {
                formattedStr += ',';
            }
            formattedStr += str[i];
        }
        
        // Reverse the string back to its original order
        formattedStr = formattedStr.split('').reverse().join('');
        
        return formattedStr;
    }

    const budget = movieDetails && addCommas(movieDetails.budget);
    const revenue = movieDetails && addCommas(movieDetails.revenue);
    

    return (
        <div className="sticky top-24">
            {movieDetails && (
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-xl space-y-6">
                    {/* Section Title */}
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-700/50">
                        <i className='bx bx-info-circle text-red-500 text-2xl'></i>
                        <h2 className="text-2xl font-bold text-white">Movie Info</h2>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <i className='bx bx-check-circle text-green-500 text-xl'></i>
                            <h3 className="font-semibold text-gray-300 text-sm uppercase tracking-wider">Status</h3>
                        </div>
                        <p className="text-white text-lg font-medium pl-7">{movieDetails.status}</p>
                    </div>

                    {/* Original Language */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <i className='bx bx-world text-blue-500 text-xl'></i>
                            <h3 className="font-semibold text-gray-300 text-sm uppercase tracking-wider">Original Language</h3>
                        </div>
                        <p className="text-white text-lg font-medium pl-7">
                            {movieDetails.spoken_languages && movieDetails.spoken_languages[0]?.english_name}
                        </p>
                    </div>

                    {/* Budget */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <i className='bx bx-dollar-circle text-yellow-500 text-xl'></i>
                            <h3 className="font-semibold text-gray-300 text-sm uppercase tracking-wider">Budget</h3>
                        </div>
                        <p className="text-white text-lg font-medium pl-7">
                            {movieDetails.budget === 0 ? 'Not disclosed' : `$${budget}.00`}
                        </p>
                    </div>

                    {/* Revenue */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <i className='bx bx-trending-up text-green-500 text-xl'></i>
                            <h3 className="font-semibold text-gray-300 text-sm uppercase tracking-wider">Revenue</h3>
                        </div>
                        <p className="text-white text-lg font-medium pl-7">
                            {movieDetails.revenue === 0 ? 'Not disclosed' : `$${revenue}.00`}
                        </p>
                    </div>

                    {/* Popularity */}
                    {movieDetails.popularity && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <i className='bx bx-line-chart text-purple-500 text-xl'></i>
                                <h3 className="font-semibold text-gray-300 text-sm uppercase tracking-wider">Popularity</h3>
                            </div>
                            <p className="text-white text-lg font-medium pl-7">
                                {movieDetails.popularity.toFixed(0)}
                            </p>
                        </div>
                    )}

                    {/* Vote Count */}
                    {movieDetails.vote_count && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <i className='bx bx-user-voice text-orange-500 text-xl'></i>
                                <h3 className="font-semibold text-gray-300 text-sm uppercase tracking-wider">Vote Count</h3>
                            </div>
                            <p className="text-white text-lg font-medium pl-7">
                                {addCommas(movieDetails.vote_count)} votes
                            </p>
                        </div>
                    )}

                    {/* Production Companies */}
                    {movieDetails.production_companies && movieDetails.production_companies.length > 0 && (
                        <div className="space-y-3 pt-4 border-t border-gray-700/50">
                            <div className="flex items-center gap-2">
                                <i className='bx bx-buildings text-indigo-500 text-xl'></i>
                                <h3 className="font-semibold text-gray-300 text-sm uppercase tracking-wider">Production</h3>
                            </div>
                            <div className="space-y-2 pl-7">
                                {movieDetails.production_companies.slice(0, 3).map(company => (
                                    <p key={company.id} className="text-white text-sm">
                                        {company.name}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SideDetails;