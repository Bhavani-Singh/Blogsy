import { useNavigate, useParams } from "react-router-dom";
import { BACKENDURL } from "../config";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { AppBar } from "../components/AppBar";
import { BlogType } from "@ctrlaltelite/common";

function EditBlog() {
    const [blogData, setBlogData] = useState<BlogType>({
        title: '',
        content: '',
        createdAt: ''
    });

    const {id: blogId} = useParams();

    const titleRef = useRef<HTMLTextAreaElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();


    function adjustTitleAreaHeight() {
        if (titleRef.current) {
            titleRef.current.style.height = 'auto'; // Reset height to calculate the new height
            titleRef.current.style.height = `${titleRef.current.scrollHeight}px`; // Set height to the scrollHeight
        }
    };

    function adjustContentAreaHeight() {
        if (contentRef.current) {
            contentRef.current.style.height = 'auto'; // Reset height to calculate the new height
            contentRef.current.style.height = `${contentRef.current.scrollHeight}px`; // Set height to the scrollHeight
        }
    };


    async function submitData() {
        const token = localStorage.getItem('token');

        const result = await axios({
            method: 'put',
            url: `${BACKENDURL}/blog`,
            data: {
                id: blogId,
                title: blogData.title,
                content: blogData.content,
                createdAt: blogData.createdAt,
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(result) {
            navigate(`/blog/${blogId}`);
        }
        else {
            alert('Error while publishing the blog');
        }
    }

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

            console.log(result);
            setBlogData({
                title: result.data.title,
                content: result.data.content,
                createdAt: result.data.createdAt
            });

            // Adjust textarea heights after setting blog data
            setTimeout(() => {
                adjustTitleAreaHeight();
                adjustContentAreaHeight();
            }, 0);
        }

        fetchBlog();

    }, []);


    return (
        <div className="w-dvw h-dvh">
        <AppBar publishCallBack={submitData}/>
        <div className="w-full flex mt-10 ml-[350px]">
            <div>
                <div>
                <textarea
                ref={titleRef}
                    placeholder="Title"
                    className="font-serif text-6xl border-none outline-none overflow-hidden resize-none"
                    onInput={adjustTitleAreaHeight} // Trigger height adjustment on input
                    rows={1} // Set initial rows
                    value={blogData.title}
                    onChange={e => setBlogData({...blogData, title: e.target.value})}
                />
                </div>

                <div>
                <textarea
                ref={contentRef}
                    placeholder="Tell your Story..."
                    className="font-serif text-2xl border-none outline-none overflow-hidden resize-none mt-6 w-[700px] text-slate-500"
                    onInput={adjustContentAreaHeight} // Trigger height adjustment on input
                    rows={1} // Set initial rows
                    value={blogData.content}
                    onChange={e => setBlogData({...blogData, content: e.target.value})}
                />
                </div>
            </div>
            
        </div>
    </div>
    )
}

export default EditBlog;