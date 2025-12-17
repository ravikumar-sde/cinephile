import { useSelector } from "react-redux";

const VideoBackground = () => {
    const { movieTrailer } = useSelector(state => state.movies);

    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {movieTrailer && movieTrailer.trailer && (
                <iframe
                    className="absolute top-1/2 left-1/2 w-[177.78vh] h-[100vh] min-w-[100vw] min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 border-0"
                    src={`https://www.youtube.com/embed/${movieTrailer.trailer.key}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${movieTrailer.trailer.key}&modestbranding=1&playsinline=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen>
                </iframe>
            )}
        </div>
    );
}

export default VideoBackground;