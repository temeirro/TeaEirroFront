
import {useEffect, useState} from 'react'
import {Image, Spin} from "antd";
import { Heart, Bookmark, Share2, MessageCircle } from "react-feather"
import ImageCard from "./ImageCard.tsx";

import image from "../../images/phil/quality.jpg"
import image1 from "../../images/phil/phil1.jpg"
import image2 from "../../images/phil/phil2.png"
import image3 from "../../images/phil/phil3.jpg"
import image4 from "../../images/phil/phil4.jpg"
import image5 from "../../images/phil/phil5.jpg"
import image6 from "../../images/phil/phil6.jpg"

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
        <div className="shadow-xl  isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div
                className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl  "
                aria-hidden="true"
                style={{ zIndex: -1 }} // Ensure the background is behind the header
            >
                <div
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#635353] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
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

<Image src={image}/>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">philosophy</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    “Tea is the elixir of life." - Lao Tzu
                </p>
            </div>

            <div className="flex-col justify-center gap-5 mt-5">
                <div className="flex object-fill mt-5 gap-5 flex-wrap justify-center">
<div>
                    <ImageCard imgSrc={image1}>
                <h3 className="text-xl font-bold mb-2">Real Quality</h3>
                <p className="text-xs hidden md:block">Our commitment to quality begins with the careful selection of the finest tea leaves from renowned tea gardens around the world. Each leaf is meticulously chosen to ensure a symphony of flavors, aromas, and textures that captivate your senses with every sip.
                </p>
                <div className="mt-4 flex justify-between">
                    <div className="space-x-4">
                        <button>
                            <Heart />
                        </button>
                        <button>
                            <MessageCircle />
                        </button>
                        <button>
                            <Share2 />
                        </button>
                    </div>
                    <div>
                        <button>
                            <Bookmark />
                        </button>
                    </div>
                </div>
            </ImageCard>
</div>
                    <div>
                    <ImageCard imgSrc={image2}>
                    <h3 className="text-xl font-bold mb-2">Origin Excellence</h3>
                    <p className="text-xs hidden md:block">Explore the distinct terroirs of our teas, as each blend is crafted from single-origin leaves that capture the unique characteristics of their specific regions. From the lush hills of Darjeeling to the sun-kissed fields of Japan, our teas bring you on a global journey through the world's most esteemed tea estates.
                    </p>
                    <div className="mt-4 flex justify-between">
                        <div className="space-x-4">
                            <button>
                                <Heart />
                            </button>
                            <button>
                                <MessageCircle />
                            </button>
                            <button>
                                <Share2 />
                            </button>
                        </div>
                        <div>
                            <button>
                                <Bookmark />
                            </button>
                        </div>
                    </div>
                </ImageCard>
                    </div>
<div>
    <ImageCard imgSrc={image3}>
        <h3 className="text-xl font-bold mb-2">Eco-Packaging</h3>
        <p className="text-xs hidden md:block">We are passionate about delivering not only the finest teas but also an eco-friendly experience. Our commitment to the environment is reflected in our choice of packaging – a harmonious blend of quality and sustainability.
        </p>
        <div className="mt-4 flex justify-between">
            <div className="space-x-4">
                <button>
                    <Heart />
                </button>
                <button>
                    <MessageCircle />
                </button>
                <button>
                    <Share2 />
                </button>
            </div>
            <div>
                <button>
                    <Bookmark />
                </button>
            </div>
        </div>
    </ImageCard>
</div>
                </div>

                <div className="flex mt-5 gap-5 flex-wrap justify-center">

                <ImageCard imgSrc={image4}>
                    <h3 className="text-xl font-bold mb-2">Blending Expertise</h3>
                    <p className="text-xs hidden md:block">Our tea artisans, with years of expertise, curate blends that are a testament to their mastery. Whether it's a soothing herbal infusion, a bold black tea, or a delicate green blend, each creation is a work of art, balancing flavors and aromas to perfection.
                    </p>
                    <div className="mt-4 flex justify-between">
                        <div className="space-x-4">
                            <button>
                                <Heart />
                            </button>
                            <button>
                                <MessageCircle />
                            </button>
                            <button>
                                <Share2 />
                            </button>
                        </div>
                        <div>
                            <button>
                                <Bookmark />
                            </button>
                        </div>
                    </div>
                </ImageCard>
                    <ImageCard imgSrc={image5}>
                        <h3 className="text-xl font-bold mb-2">Sustainable Sourcing</h3>
                        <p className="hidden text-xs md:block">Beyond the exquisite taste, we prioritize ethical and sustainable sourcing practices. We establish partnerships with growers who share our values, ensuring fair wages and environmentally responsible cultivation methods.
                        </p>
                        <div className="mt-4 flex justify-between">
                            <div className="space-x-4">
                                <button>
                                    <Heart />
                                </button>
                                <button>
                                    <MessageCircle />
                                </button>
                                <button>
                                    <Share2 />
                                </button>
                            </div>
                            <div>
                                <button>
                                    <Bookmark />
                                </button>
                            </div>
                        </div>
                    </ImageCard>
                    <ImageCard imgSrc={image6}>
                        <h3 className="text-xl font-bold mb-2">Unwavering Freshness</h3>
                        <p className="hidden text-xs md:block">We employ advanced packaging techniques to seal in the flavors and aromas, ensuring that every cup you brew is as vibrant and delightful as the day the leaves were harvested. Revel in the assurance that each tea moment is a fresh and invigorating experience.
                        </p>
                        <div className="mt-4 flex justify-between">
                            <div className="space-x-4">
                                <button>
                                    <Heart />
                                </button>
                                <button>
                                    <MessageCircle />
                                </button>
                                <button>
                                    <Share2 />
                                </button>
                            </div>
                            <div>
                                <button>
                                    <Bookmark />
                                </button>
                            </div>
                        </div>
                    </ImageCard>
                </div>
            </div>
                </> )}
            </div>






    )
}