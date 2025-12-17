import { useSelector } from "react-redux";
import { useState } from "react";

const Videos = () => {
    const { movieVideos } = useSelector(state => state.details);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const getVideoTypeIcon = (type) => {
        switch(type) {
            case 'Trailer': return 'bx-movie-play';
            case 'Teaser': return 'bx-video';
            case 'Clip': return 'bx-film';
            case 'Behind the Scenes': return 'bx-camera';
            case 'Featurette': return 'bx-play-circle';
            default: return 'bx-video';
        }
    };

    const getVideoTypeBadgeColor = (type) => {
        switch(type) {
            case 'Trailer': return 'from-red-600 to-red-500';
            case 'Teaser': return 'from-purple-600 to-purple-500';
            case 'Clip': return 'from-blue-600 to-blue-500';
            case 'Behind the Scenes': return 'from-green-600 to-green-500';
            case 'Featurette': return 'from-yellow-600 to-yellow-500';
            default: return 'from-gray-600 to-gray-500';
        }
    };

    return (
        <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-red-600 to-red-500 rounded-full"></div>
                    <h2 className="text-3xl font-bold text-white">Videos & Trailers</h2>
                    {movieVideos?.results && (
                        <span className="text-gray-400 text-sm mt-1">
                            ({movieVideos.results.length} videos)
                        </span>
                    )}
                </div>
            </div>

            {/* Videos Horizontal Scroll */}
            <div className="flex overflow-x-auto gap-6 pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide">
                {movieVideos?.results && movieVideos.results.map((video, index) => {
                    return (
                        <div
                            className="group flex-shrink-0 w-[520px] snap-start cursor-pointer"
                            key={video.id}
                        >
                            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">
                                {/* Video Thumbnail/Player */}
                                <div className="relative aspect-video bg-black">
                                    <iframe
                                        className="w-full h-full border-0"
                                        src={`https://www.youtube.com/embed/${video.key}?controls=1&modestbranding=1&rel=0`}
                                        title={video.name || "YouTube video player"}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen>
                                    </iframe>

                                    {/* Type Badge */}
                                    <div className={`absolute top-3 left-3 bg-gradient-to-r ${getVideoTypeBadgeColor(video.type)} backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg pointer-events-none`}>
                                        <i className={`bx ${getVideoTypeIcon(video.type)} text-white text-sm`}></i>
                                        <span className="text-white text-xs font-bold uppercase tracking-wide">
                                            {video.type}
                                        </span>
                                    </div>

                                    {/* Official Badge */}
                                    {video.official && (
                                        <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg pointer-events-none">
                                            <i className='bx bxs-badge-check text-white text-sm'></i>
                                            <span className="text-white text-xs font-bold">Official</span>
                                        </div>
                                    )}
                                </div>

                                {/* Video Info */}
                                <div className="p-4 space-y-2 bg-gradient-to-b from-gray-800/80 to-gray-900">
                                    <h3 className="font-bold text-white text-base line-clamp-2 group-hover:text-red-400 transition-colors duration-300" title={video.name}>
                                        {video.name}
                                    </h3>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-xs text-gray-400">
                                            {video.published_at && (
                                                <span className="flex items-center gap-1">
                                                    <i className='bx bx-calendar text-sm'></i>
                                                    {new Date(video.published_at).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            )}
                                            {video.size && (
                                                <span className="flex items-center gap-1">
                                                    <i className='bx bx-hd text-sm'></i>
                                                    {video.size}p
                                                </span>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => setSelectedVideo(video)}
                                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-xs font-semibold transition-all duration-200 flex items-center gap-1"
                                        >
                                            <i className='bx bx-expand text-sm'></i>
                                            Expand
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Full Screen Video Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedVideo(null)}>
                    {/* Close Button */}
                    <button
                        className="absolute top-8 right-8 text-white hover:text-red-500 transition-colors duration-300 transform hover:scale-110 z-50"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <i className='bx bx-x text-6xl'></i>
                    </button>

                    {/* Video Container */}
                    <div className="w-11/12 max-w-6xl" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-4">
                            <h2 className="text-white text-2xl font-bold mb-2">{selectedVideo.name}</h2>
                            <div className="flex items-center gap-4 text-gray-400 text-sm">
                                <span className="flex items-center gap-1">
                                    <i className={`bx ${getVideoTypeIcon(selectedVideo.type)}`}></i>
                                    {selectedVideo.type}
                                </span>
                                {selectedVideo.published_at && (
                                    <span className="flex items-center gap-1">
                                        <i className='bx bx-calendar'></i>
                                        {new Date(selectedVideo.published_at).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                        </div>
                        <iframe
                            className="w-full aspect-video rounded-lg shadow-2xl border-0"
                            src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1&controls=1`}
                            title={selectedVideo.name}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Videos;