import axios from "axios";
import { useEffect, useState } from "react";
import { BACKENDURL } from "../config";
import { AppBar } from "../components/AppBar";
import { useParams } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { BlogSkeleton } from "../components/BlogSkeleton";

function Blog() {
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);

    const {id: blogId} = useParams();
    useEffect(() => {
        const token = localStorage.getItem('token');

        async function fetchBlog() {
            const result = await axios({
                method: 'get',
                url: `${BACKENDURL}/blog/${blogId}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            setBlog(result.data);
            setLoading(false);
        }

        fetchBlog();


    }, []);

    const userId = localStorage.getItem('userId');
    
    return(
        <div className="w-dvh h-dvh">
            <AppBar edit={userId === blog.authorId} blogId={blog.id}/>
            {!loading?
            
                <div key={blog.id} className="flex">
                <div className="flex flex-col gap-4 w-[70%] p-10">
                    <div className="text-5xl font-bold">{blog.title}</div>
                    <div className="text-slate-400">{`Posted on ${blog.createdAt}`}</div>

                    {blog.author && (
                        <div className="text-lg">
                            {
                                blog.content.split("\n").map((paragraph, index) => (
                                    <p key={index} className="mt-5">{paragraph}</p>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-[30%]">
                    <div className="px-5 pt-5 pb-3">Author</div>
                    {blog.author && blog.author.name && (
                        <div className="flex h-[60px]">
                            <div className="flex justify-center items-center p-5">
                                <div className="w-7 h-7">
                                    <Avatar initial={blog.author.name[0]} bgColor="bg-gradient-to-r from-purple-500 to-pink-500"/>
                                </div>
                            </div>

                            <div className="flex flex-col justify-between">
                                <div className="font-bold text-xl">
                                    {blog.author.name}
                                </div>
                                <div className="text-slate-400">
                                    {blog.author.about}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            :

            <BlogSkeleton />
        }
            
        </div>
    )
}

export default Blog;