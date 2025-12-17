import { useSelector } from 'react-redux';
import profileImg from '../../Utils/profile-tmdb.svg'

const Cast = () => {
    const { movieCast } = useSelector(state => state.details);

    return (
        <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-red-600 to-red-500 rounded-full"></div>
                    <h2 className="text-3xl font-bold text-white">Top Cast</h2>
                    {movieCast?.cast && (
                        <span className="text-gray-400 text-sm mt-1">
                            ({movieCast.cast.length} members)
                        </span>
                    )}
                </div>
            </div>

            {/* Cast Horizontal Scroll */}
            <div className="flex overflow-x-auto gap-4 pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide">
                {movieCast && movieCast?.cast?.map((cast, index) => {
                    return (
                        <div
                            className="group flex-shrink-0 w-44 snap-start cursor-pointer"
                            key={cast.id}
                        >
                            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-red-500/20">
                                {/* Cast Image */}
                                <div className="relative h-60 overflow-hidden bg-gray-700">
                                    {cast.profile_path == null ? (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                                            <img
                                                className="w-20 h-20 opacity-30"
                                                alt="cast-img"
                                                src={profileImg}
                                            />
                                        </div>
                                    ) : (
                                        <img
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            alt={cast.name}
                                            src={'https://image.tmdb.org/t/p/w342/' + cast.profile_path}
                                        />
                                    )}
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Popularity Badge */}
                                    {cast.popularity && cast.popularity > 10 && (
                                        <div className="absolute top-2 right-2 bg-yellow-500/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                                            <i className='bx bxs-star text-white text-xs'></i>
                                            <span className="text-white text-xs font-bold">
                                                {cast.popularity.toFixed(0)}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Cast Info */}
                                <div className="p-3 space-y-1 bg-gradient-to-b from-gray-800/50 to-gray-900">
                                    <p className="font-bold text-white text-sm line-clamp-1" title={cast.name}>
                                        {cast.name}
                                    </p>
                                    <p className="text-gray-400 text-xs line-clamp-2" title={cast.character}>
                                        {cast.character}
                                    </p>
                                    {cast.known_for_department && (
                                        <p className="text-gray-500 text-xs">
                                            {cast.known_for_department}
                                        </p>
                                    )}
                                </div>

                                {/* Hover Info Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                    <p className="text-white font-bold text-sm mb-1">{cast.name}</p>
                                    <p className="text-gray-300 text-xs mb-2 line-clamp-2">{cast.character}</p>
                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white text-xs py-1.5 rounded-lg transition-colors duration-200">
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Cast;