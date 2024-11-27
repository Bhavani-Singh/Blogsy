import { useEffect, useState } from "react";
import { BlogCard } from "../components/BlogCard";
import axios from "axios";
import { BACKENDURL } from "../config";
import { AppBar } from "../components/AppBar";
import { BlogType } from "@ctrlaltelite/common";
import { useNavigate } from "react-router-dom";

export const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            const token = localStorage.getItem('token');
            const result = await axios({
                method: 'get',
                url: `${BACKENDURL}/blog/bulk`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBlogs(result.data);
        }  

        fetchBlogs();
    }, []);
    
    return (
        <div className="w-dvw h-dvh">
            
            <AppBar/>
            <div className=" flex flex-col items-center gap-1x">

                {blogs.map( (blog: BlogType) => {
                    return(
                        <div key={blog.id} className="w-[800px] hover: cursor-pointer" onClick={() => navigate(`/blog/${blog.id}`)}>
                            <BlogCard title={blog.title} content={blog.content} name={blog.author.name} date={blog.createdAt}/>
                        </div>
                    )
                })}
            </div>
        </div>
        
        
    );
}

export default Blogs;