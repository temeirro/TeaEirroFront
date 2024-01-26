import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useSelector } from "react-redux";
import { IAuthReducerState } from "../auth/login/AuthReducer.ts";
import DashboardPage from './DashboardPage.tsx';
import TeaPage from './TeaWork.tsx';
import {useNavigate} from "react-router-dom";
import AddTeaPage from "./AddTeaPage.tsx";

const ECommerce = () => {
    const [selectedPage, setSelectedPage] = useState('tea');
    const { isAuth, user } = useSelector((redux: any) => redux.auth as IAuthReducerState);

    const handlePageChange = (page) => {
        setSelectedPage(page);
    };

    const renderPage = () => {
        switch (selectedPage) {
            case 'dashboard':
                return <DashboardPage />;
            case 'tea':
                return <TeaPage onSelectPage={handlePageChange} />;
            case 'addTea':
                return <AddTeaPage />;
            // Add more cases for additional pages
            default:
                return null;
        }
    };

    return (
        <>
            <div className="flex h-auto bg-gray-100">
                {/* Sidebar */}
                <div className={`w-64 bg-white border-r overflow-y-auto `}>
                    <div className="p-4 flex flex-col">
                        <h1 className="text-2xl text-center font-bold text-gray-800">Panel</h1>

                        <button
                            className={`mt-2 py-2 px-4 ${selectedPage === 'tea' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
                            onClick={() => handlePageChange('tea')}
                        >
                            Tea
                        </button>
                        {/* Add more buttons or customize as needed */}
                    </div>
                </div>

                {/* Main Content */}
                <div className={`flex-1 p-6`}>


                    {/* Render the selected page */}
                    {renderPage()}
                </div>
            </div>
        </>
    );
};

export default ECommerce;
