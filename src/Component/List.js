import Card from './Card';

const List = ({heading, movies}) => {
    return (
        <div className='my-6 mx-8 rounded-lg group'>
            <div className="flex items-center justify-between mb-4 px-4">
                <h2 className='font-bold text-2xl text-white drop-shadow-xl tracking-tight'>
                    {heading}
                </h2>
                <button className="text-red-500 hover:text-red-400 text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore All
                    <i className='bx bx-chevron-right text-xl'></i>
                </button>
            </div>
            <div className='content flex flex-nowrap max-w-screen-3xl m-auto overflow-x-scroll overflow-y-hidden snap-mandatory snap-x p-2 gap-2 scroll-smooth'>
                {movies && movies.length && movies.map(movie => {
                    return <Card movie={movie} key={movie.title}/>
                })}
            </div>
        </div>
    );
}

export default List;