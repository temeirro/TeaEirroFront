import { useState } from 'react';
import DashboardPage from './DashboardPage.tsx';
import TeaPage from './TeaWork.tsx';
import AddTeaPage from "./AddTeaPage.tsx";

const ECommerce = () => {
    const [selectedPage, setSelectedPage] = useState('tea');

    // @ts-ignore
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
