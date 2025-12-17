import { useSelector } from "react-redux";
import { useState } from "react";

const Gallery = () => {
    const { movieGallery } = useSelector(state => state.details);
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeTab, setActiveTab] = useState('backdrops'); // 'backdrops' or 'posters'

    const backdrops = movieGallery?.backdrops || [];
    const posters = movieGallery?.posters || [];

    const displayedImages = activeTab === 'backdrops' ? backdrops : posters;

    const handleImageClick = (image, index) => {
        setSelectedImage({ ...image, index });
    };

    const navigateImage = (direction) => {
        if (!selectedImage) return;
        const currentImages = activeTab === 'backdrops' ? backdrops : posters;
        const newIndex = direction === 'next'
            ? (selectedImage.index + 1) % currentImages.length
            : (selectedImage.index - 1 + currentImages.length) % currentImages.length;
        setSelectedImage({ ...currentImages[newIndex], index: newIndex });
    };

    return (
        <div className="space-y-6">
            {/* Section Header with Tabs */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-red-600 to-red-500 rounded-full"></div>
                    <h2 className="text-3xl font-bold text-white">Photos & Gallery</h2>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm rounded-lg p-1">
                    <button
                        onClick={() => { setActiveTab('backdrops'); setShowAll(false); }}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                            activeTab === 'backdrops'
                                ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <i className='bx bx-image mr-2'></i>
                        Backdrops ({backdrops.length})
                    </button>
                    <button
                        onClick={() => { setActiveTab('posters'); setShowAll(false); }}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                            activeTab === 'posters'
                                ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <i className='bx bx-photo-album mr-2'></i>
                        Posters ({posters.length})
                    </button>
                </div>
            </div>

            {/* Gallery Horizontal Scroll */}
            <div className="flex overflow-x-auto gap-4 pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide">
                {displayedImages.map((image, index) => {
                    return (
                        <div
                            className={`group flex-shrink-0 snap-start cursor-pointer ${activeTab === 'backdrops' ? 'w-96' : 'w-56'}`}
                            key={image.file_path}
                            onClick={() => handleImageClick(image, index)}
                        >
                            <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 bg-gray-800">
                                <img
                                    className={`w-full ${activeTab === 'backdrops' ? 'aspect-video' : 'aspect-[2/3]'} object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75`}
                                    alt={`Gallery image ${index + 1}`}
                                    src={'https://image.tmdb.org/t/p/w780/' + image.file_path}
                                    loading="lazy"
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                                    {/* Resolution Badge */}
                                    <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                                        <span className="text-white text-xs font-bold">
                                            {image.width} × {image.height}
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            className="bg-white/20 backdrop-blur-md hover:bg-white/30 p-3 rounded-full transition-all duration-200 transform hover:scale-110"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleImageClick(image, index);
                                            }}
                                        >
                                            <i className='bx bx-expand text-white text-xl'></i>
                                        </button>
                                        <a
                                            href={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                                            download
                                            className="bg-white/20 backdrop-blur-md hover:bg-white/30 p-3 rounded-full transition-all duration-200 transform hover:scale-110"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <i className='bx bx-download text-white text-xl'></i>
                                        </a>
                                        <button
                                            className="bg-white/20 backdrop-blur-md hover:bg-white/30 p-3 rounded-full transition-all duration-200 transform hover:scale-110"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <i className='bx bx-share text-white text-xl'></i>
                                        </button>
                                    </div>

                                    {/* Rating */}
                                    {image.vote_average > 0 && (
                                        <div className="flex items-center gap-1 bg-yellow-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                            <i className='bx bxs-star text-white text-sm'></i>
                                            <span className="text-white text-xs font-bold">
                                                {image.vote_average.toFixed(1)}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Language Badge */}
                                {image.iso_639_1 && (
                                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-bold uppercase pointer-events-none">
                                        {image.iso_639_1}
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in"
                    onClick={() => setSelectedImage(null)}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-8 right-8 text-white hover:text-red-500 transition-colors duration-300 transform hover:scale-110 z-50"
                        onClick={() => setSelectedImage(null)}
                    >
                        <i className='bx bx-x text-6xl'></i>
                    </button>

                    {/* Navigation Buttons */}
                    <button
                        className="absolute left-8 text-white hover:text-red-500 transition-all duration-300 transform hover:scale-110 z-50 bg-black/50 backdrop-blur-sm p-4 rounded-full"
                        onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                    >
                        <i className='bx bx-chevron-left text-5xl'></i>
                    </button>
                    <button
                        className="absolute right-8 text-white hover:text-red-500 transition-all duration-300 transform hover:scale-110 z-50 bg-black/50 backdrop-blur-sm p-4 rounded-full"
                        onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                    >
                        <i className='bx bx-chevron-right text-5xl'></i>
                    </button>

                    {/* Image Container */}
                    <div className="max-w-7xl max-h-[90vh] p-8" onClick={(e) => e.stopPropagation()}>
                        <img
                            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                            alt="Full size gallery image"
                            src={'https://image.tmdb.org/t/p/original/' + selectedImage.file_path}
                        />

                        {/* Image Info */}
                        <div className="mt-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-4">
                                <span className="text-sm">
                                    {selectedImage.index + 1} / {activeTab === 'backdrops' ? backdrops.length : posters.length}
                                </span>
                                <span className="text-sm text-gray-400">
                                    {selectedImage.width} × {selectedImage.height}
                                </span>
                                {selectedImage.vote_average > 0 && (
                                    <div className="flex items-center gap-1">
                                        <i className='bx bxs-star text-yellow-400'></i>
                                        <span className="text-sm">{selectedImage.vote_average.toFixed(1)}</span>
                                    </div>
                                )}
                            </div>
                            <a
                                href={`https://image.tmdb.org/t/p/original/${selectedImage.file_path}`}
                                download
                                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                            >
                                <i className='bx bx-download'></i>
                                Download Original
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Gallery;