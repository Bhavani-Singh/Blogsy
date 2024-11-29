
export const BlogSkeleton = () => {
    return (
        <div className="w-dvh h-dvh animate-pulse">
            <div className="flex">
                <div className="flex flex-col gap-4 w-[70%] p-10">
                    <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[10%] mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-[80%] mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-[70%] mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-[90%] mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-[70%] mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-[80%]"></div>
                </div>

                <div className="w-[30%]">
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 ml-4 mt-5 mb-3"></div>
                        <div className="flex h-[60px]">
                            <div className="flex justify-center items-center p-5">
                                <div className="w-7 h-7">
                                    <svg className="w-full h-full relative inline-flex items-center justify-center overflow-hidden rounded-full text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                    </svg>
                                </div>
                            </div>

                            <div className="flex flex-col justify-between">
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mt-5"></div>
                                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mt-5"></div>
                            </div>
                        </div>
                </div>
            </div>

            <span className="sr-only">Loading...</span>
        </div>
    );
}