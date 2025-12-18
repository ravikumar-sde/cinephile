import Card from './Card';

const List = ({heading, movies}) => {
    return (
        <div className='my-4 md:my-6 mx-4 md:mx-8 rounded-lg group'>
            <div className="flex items-center justify-between mb-2 md:mb-4 px-2 md:px-4">
                <h2 className='font-bold text-lg md:text-2xl text-white drop-shadow-xl tracking-tight'>
                    {heading}
                </h2>
                <button className="text-red-500 hover:text-red-400 text-xs md:text-sm font-semibold flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore All
                    <i className='bx bx-chevron-right text-lg md:text-xl'></i>
                </button>
            </div>
            <div className='content flex flex-nowrap max-w-screen-3xl m-auto overflow-x-scroll overflow-y-hidden snap-mandatory snap-x p-1 md:p-2 gap-1 md:gap-2 scroll-smooth'>
                {movies && movies.length && movies.map(movie => {
                    return <Card movie={movie} key={movie.title}/>
                })}
            </div>
        </div>
    );
}

export default List;