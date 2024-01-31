import { Calendar, Card, Col, Row } from "antd";
import image from "../../images/home2.png";
import {useEffect} from "react";

function HomePage() {
    useEffect(() => {
        // Add 'overflow-hidden' class to the body when the component mounts
        document.body.classList.add('overflow-hidden');

        // Remove 'overflow-hidden' class when the component unmounts
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);
    return (
        <div className=" isolate h-screen relative px-6 py-24 sm:py-32 lg:px-8">
            {/* Background Shape */}



            {/* Main Content */}
            <div className="mainDiv flex flex-col items-center">
                <img
                    className="transform scale-100 transition-transform duration-300 hover:scale-105 dark:hover:shadow-black/30 mx-auto"
                    src="/teaeirro blue.png"
                    alt={"main logo"}
                />
                <h1 className="mt-5 text-white">
                    teaeirro | <span className="mainspan">tea culture</span>
                </h1>

                {/* Image on the right side */}
                <img
                    src={image}
                    alt={"main"}
                    className="absolute -top-9 right-0 h-full"
                />
            </div>
        </div>
    );
}

export default HomePage;
