import {useNavigate} from "react-router-dom";

function NotFound()
{
    const navigator = useNavigate();

    const handleHome = () => {
        // Navigate to the "/" route
        navigator('/');
    };

    const handleBack = () => {
        // Navigate to the "/" route
        navigator(-1);
    };


    return(
        <section className="bg-auto dark:bg-gray-900 ">
            <div className=" text-center container mt-52 bg-white rounded-2xl px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
                <div className="wf-ull lg:w-1/2">
                    <p className="text-sm font-medium text-blue-400 dark:text-white">404 error</p>
                    <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">Page not found</h1>
                    <p className="mt-4 text-black dark:text-gray-400">Sorry, we`ve lost this page</p>

                    <div className="flex justify-center items-center mt-6 gap-x-3">
                        <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>


                            <span onClick={handleBack}>Back</span>
                        </button>

                        <button onClick={handleHome} className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-400 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                            Home
                        </button>
                    </div>
                </div>

                <div className="relative w-full mt-8 lg:w-1/2 lg:mt-0">
                    <img className=" w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-cover " src="https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/2da99a183291607.653cfd614386a.png" alt=""/>

                </div>
            </div>
        </section>
    )
}

export default NotFound