import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import {useSelector} from "react-redux";
import {IAuthReducerState} from "../auth/login/AuthReducer.ts";
import {Image} from "antd";

function Card() {
const {user} = useSelector((redux: any)=>redux.auth as IAuthReducerState)
    return (
        <div className="w-full">
            <div className="flex flex-col justify-center max-w-xs mx-auto bg-white shadow-xl rounded-xl p-5">
                <div className="">
                    <Image
                        className="w-32 mx-auto shadow-xl rounded-full"
                        src={'http://teaeirro.com/upload/' + user?.image}
                        alt="Profile face"
                    />
                </div>
                <div className="text-center mt-5">
                    <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                        {user?.name} {user?.lastName}
                    </p>
                    <p className="text-xs sm:text-base text-gray-800 pt-2 pb-4 px-5 w-auto inline-block border-b-2">
                        {user?.email}
                    </p>
                    <div className="flex align-center justify-center mt-4">
                        <a
                            className="text-xl m-1 p-1 sm:m-2 sm:p-2 text-gray-800 hover:bg-gray-800 rounded-full hover:text-white transition-colors duration-300"
                        >
                            <FaGithub />
                            <span className="sr-only">Github</span>
                        </a>
                        <a
                            className="text-xl m-1 p-1 sm:m-2 sm:p-2 text-pink-800 hover:bg-pink-800 rounded-full hover:text-white transition-colors duration-300"
                        >
                            <FaYoutube />
                            <span className="sr-only">Youtube</span>
                        </a>
                        <a
                            className="text-xl m-1 p-1 sm:m-2 sm:p-2 text-blue-800 hover:bg-blue-800 rounded-full hover:text-white transition-colors duration-300"
                        >
                            <FaTwitter />
                            <span className="sr-only">Twitter</span>
                        </a>
                        <a
                            className="text-xl m-1 p-1 sm:m-2 sm:p-2 text-teal-800 hover:bg-teal-800 rounded-full hover:text-white transition-colors duration-300"
                        >
                            <FaLinkedin />
                            <span className="sr-only">Linkedin</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;