import { Avatar } from "./Avatar";

interface BlogCardInput {
    name: string;
    date: string;
    title: string;
    content: string;
}

export const BlogCard = ({name, date, title, content}: BlogCardInput) => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-left p-3 gap-4 mt-5 border-b border-slate-200">
            <div className="flex jusfiy-center items-center gap-1">
                <div className="w-7 h-7">
                    <Avatar initial={name[0]} bgColor="bg-gradient-to-r from-purple-500 to-pink-500"/>
                </div>
                <div>{name}</div>
                <div>
                    <Circle />
                </div>
                <div className="text-slate-400 font-light text-sm leading-relaxed">{date}</div>
            </div>

            <div>
                <div className="text-2xl font-bold">
                    {title}
                </div>

                <div className="leading-normal text-slate-400">
                    {content.length > 150 ? content.slice(0, 150) + '...': content}
                </div>
            </div>
            

            <div>
                <div className="p-1 w-fit h-fit bg-gray-200 rounded-md text-sm text-slate-500">
                    {`${Math.ceil((content.length/5)/170)} min read`}
                </div>
            </div>
        </div>
    )
}

const Circle = () => {
    return (
        <div className="w-1 h-1 rounded-full bg-slate-200">

        </div>
    )
}