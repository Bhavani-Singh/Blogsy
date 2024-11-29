
export const BlogsSkeleton = () => {
    return (
        <div role="status" className="w-[800px] animate-pulse">
            <div className="w-full h-full flex flex-col justify-center items-left p-3 gap-4 mt-5  rounded">
                <div className="flex jusfiy-center items-center gap-1">
                    <div className="w-7 h-7">
                        <svg className="w-full h-full relative inline-flex items-center justify-center overflow-hidden rounded-full text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                        </svg>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                </div>

                <div>
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[700px] mb-4"></div>

                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[700px] mb-2"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[700px]"></div>
                </div>
                <div>
                    <div className="p-1 w-[75px] h-[29px] bg-gray-200 rounded-md text-sm text-slate-500">
                    </div>
                </div>
            </div>

            <span className="sr-only">Loading...</span>
        </div>
    )
}