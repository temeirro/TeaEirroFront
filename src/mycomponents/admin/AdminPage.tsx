import React, { useState } from 'react';

const ECommerce = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                {isSidebarOpen && (
                    <div className="w-64 bg-white border-r overflow-y-auto">
                        {/* Your sidebar content goes here */}
                        <div className="p-4">
                            <h1 className="text-2xl font-bold text-gray-800">E-Commerce</h1>
                            {/* Add your sidebar links, categories, etc. here */}
                            <button
                                className="mt-4 px-2 py-1 bg-blue-200 text-white rounded-md"
                                onClick={toggleSidebar}
                            >
                                Hide Sidebar
                            </button>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className={`flex-1 p-6 ${isSidebarOpen ? 'ml-64' : ''}`}>
                    {/* Toggle button when the sidebar is hidden */}
                    {!isSidebarOpen && (
                        <button
                            className="absolute top-4 left-4 px-2 py-1 bg-blue-200 text-white rounded-md"
                            onClick={toggleSidebar}
                        >
                            Show Sidebar
                        </button>
                    )}

                    {/* Your main content goes here */}
                    <h1 className="text-2xl font-bold text-gray-800">Welcome to admin app!</h1>
                    {/* Add your main content, product listings, etc. here */}
                </div>
            </div>
        </>
    );
};

export default ECommerce;
