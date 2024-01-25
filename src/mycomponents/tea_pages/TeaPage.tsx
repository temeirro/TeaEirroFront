import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Example() {
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);
    const [searchQuery, setSearchQuery] = useState('');

    const { type } = useParams();

    const apiUrl = `http://teaeirro.com/api/get${type}Tea`;

    useEffect(() => {
        axios
            .get(apiUrl)
            .then((resp) => {
                setList(resp.data);
                console.log(resp.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [apiUrl]);

    // Move the filtering logic inside the useEffect
    const filteredProducts = list.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Reset current page when searchQuery changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="relative w-full mt-8 lg:mt-0 group">
                <img
                    className="w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-cover blur-sm group-hover:blur-none transition-all duration-300"
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/62cd64183291607.6540d86fd8376.png"
                    alt=""
                />

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center p-4  border border-black bg-black bg-opacity-50  transition-all duration-300">
                    <h1 className="text-9xl">{type}</h1>
                </div>
            </div>

            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">{type} tea collection</h2>

                    {/* Search input */}
                    <div className="mt-6">
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                            Search by Name
                        </label>
                        <input
                            type="text"
                            id="search"
                            name="search"
                            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 block w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {currentProducts.map((product) => (
                            <div key={product.id} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-50 transition-opacity duration-300 lg:h-80">
                                    <img
                                        src={`http://teaeirro.com/upload/${product.tea_images?.[0]?.name}`}
                                        alt={product.name}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href={`/tea/details/${product.id}`}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.name}
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product?.ingredients}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{product.price}₴</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-10">
                        <nav className="flex justify-center">
                            <ul className="flex space-x-2">
                                {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
                                    <li key={index}>
                                        <button
                                            className={`text-gray-700 hover:text-gray-900 px-3 py-2 focus:outline-none ${
                                                currentPage === index + 1 ? 'border-b-2 border-indigo-500' : ''
                                            }`}
                                            onClick={() => paginate(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}