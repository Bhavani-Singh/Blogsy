import { useEffect, useRef, useState } from "react";
import { Avatar } from "./Avatar"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface AppBarInputs {
    publishCallBack?: () => void;
    edit?: boolean;
    blogId?: string;
}

export const AppBar = ({publishCallBack, edit, blogId}: AppBarInputs) => {
    const [showDropDwon, setShowDropDown] = useState(false);
    const dropDownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const username = localStorage.getItem('username');
    const initial = username? username[0] : '';

    // Toggle dropdown visibility
    function toggleDropDown() {
        setShowDropDown(prev => !prev);
    }

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutSide = (event: MouseEvent) => {
            if(dropDownRef.current && !dropDownRef.current.contains(event?.target as Node)) {
                setShowDropDown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutSide);
        return () => document.removeEventListener('mousedown', handleClickOutSide);        

    },[]);

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        navigate('/');
    }

    function moveToAddBlogPage() {
        navigate('/addBlog');
    }

    function sendToEditPage() {
        navigate(`/edit/${blogId}`);
    }

    return (
        <div className="relative px-5 py-3 flex justify-between border-b ">
            <h1 className="text-3xl font-bold hover: cursor-pointer" onClick={() => navigate('/blogs')}>Blogsy</h1>
            <div className="flex justify-center items-center gap-3">
                { location.pathname === '/addBlog' || location.pathname.startsWith('/edit/')?
                    <button type="button" className="text-gray-900 bg-gradient-to-r text-sm from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg  px-3 py-2 text-center" onClick={publishCallBack}>Publish</button>

                    :

                    <button type="button" className="text-white bg-gradient-to-r text-sm from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-3 py-2 text-center" onClick={moveToAddBlogPage}>New +</button>
                }

                {
                    edit && location.pathname.startsWith('/blog/')?

                    <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-3 py-2 text-center" onClick={sendToEditPage}>Edit</button>

                    : null

                }

                <div className="w-10 h-10 hover:cursor-pointer" onClick={toggleDropDown}>
                    <Avatar initial={initial} bgColor="bg-gradient-to-br from-pink-500 to-orange-400"/>
                </div>

                {/* Dropdown */}
                {showDropDwon && (
                    <div
                        ref={dropDownRef}
                        className="absolute top-12 right-0 bg-white border rounded-md shadow-lg p-2 mt-2"
                    >
                        <button
                            onClick={logout}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}