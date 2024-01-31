
import {useEffect, useState} from 'react'
import { Spin} from "antd";

import image1 from "../../images/culture/cult1.png"
import image2 from "../../images/culture/cult2.png"
import image3 from "../../images/culture/cult3.png"
import image4 from "../../images/culture/cult4.png"
import image5 from "../../images/culture/cult5.png"
import image6 from "../../images/culture/cult6.png"
import image7 from "../../images/culture/cult7.png"
import image8 from "../../images/culture/cult8.webp"
import image9 from "../../images/culture/cult9.webp"

export default function Example() {
    const [loading, setLoading] = useState(true); // Initial loading state
    useEffect(() => {
        const fetchData = async () => {
            // Simulate an asynchronous operation
            setTimeout(() => {
                setLoading(false); // Set loading to false after 2 seconds
            }, 500);
        };

        fetchData();
    }, []);

    return (
        <div className="  isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div
                className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl  "
                aria-hidden="true"
                style={{ zIndex: -1 }} // Ensure the background is behind the header
            >
                <div
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#e6bf25] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>

            {loading ? (
                <div className="flex items-start justify-center h-screen">
                    <Spin  size="large" />
                </div>
            ) : (
                <>
            <div className="-mt-20 mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">culture</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    文化
                </p>


                <div>
                    <img className="h-auto mt-10 max-w-full rounded-lg" src={image1} alt=""/>
                </div>

                <div className="grid mt-5 grid-cols-3 md:grid-cols-3 gap-4">

                    <div className="grid gap-4">
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src={image2} alt=""/>
                        </div>
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src={image3} alt=""/>
                        </div>

                    </div>
                    <div className="grid gap-4">
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src={image4} alt=""/>
                        </div>
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src={image5} alt=""/>
                        </div>

                    </div>
                    <div className="grid gap-4">
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src={image6} alt=""/>
                        </div>
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src={image7} alt=""/>
                        </div>
                    </div>

                </div>



            </div>



            <div className="bg-white">
                <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-20 lg:px-8">
                    <div className="relative isolate overflow-hidden bg-blue-200 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                        <svg
                            viewBox="0 0 1024 1024"
                            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                            aria-hidden="true"
                        >
                            <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                            <defs>
                                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                    <stop stopColor="#c975d6" />
                                    <stop offset={1} stopColor="#d2a9d9" />
                                </radialGradient>
                            </defs>
                        </svg>
                        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                25 Fascinating Tea Etiquette Rules You Need to Know

                            </h2>
                            <p className="mt-6 text-lg leading-8 tracking-tight">
                                If you ever have a chance to enjoy tea with the Royals in England, you might want to polish up your table manners. Here are 25 tea etiquette rules you should practice when having afternoon tea the English way.                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">

                                <a href="https://www.teabloom.com/blog/25-fascinating-tea-etiquette-rules-you-need-to-know/" className=" text-sm font-semibold leading-6 text-white">
                                    Show more <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                        <div className="relative mt-16 h-80 lg:mt-8">
                            <img
                                className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                                src={image8}
                                alt="App screenshot"
                                width={1824}
                                height={1080}
                            />
                        </div>
                    </div>

                </div>
                <div className="mx-auto max-w-7xl py-10 sm:px-6 sm:py-10 lg:px-8">
                    <div className="relative isolate overflow-hidden bg-yellow-100 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                        <svg
                            viewBox="0 0 1024 1024"
                            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                            aria-hidden="true"
                        >
                            <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                            <defs>
                                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                    <stop stopColor="#c975d6" />
                                    <stop offset={1} stopColor="#d2a9d9" />
                                </radialGradient>
                            </defs>
                        </svg>
                        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                How Tea Can Easily Make Your Stem Cells Stronger

                            </h2>
                            <p className="mt-6 text-lg leading-8 tracking-tight">
                                The link between tea and health has been assumed for thousands of years. Recent studies solidify these ancient claims. Tea may be a bigger component of health and wellness than we initially thought.
                            </p>
                                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">

                                <a href="https://www.teabloom.com/blog/how-tea-can-easily-make-your-stem-cells-stronger/" className=" text-sm font-semibold leading-6 text-white">
                                    Show more <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                        <div className="relative mt-16 h-80 lg:mt-8">
                            <img
                                className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                                src={image9}
                                alt="App screenshot"
                                width={1824}
                                height={1080}
                            />
                        </div>
                    </div>

                </div>
            </div>

                </> )}
        </div>







    )
}