import { useRef, useState } from "react";
import { AppBar } from "../components/AppBar";
import { BlogType } from "@ctrlaltelite/common";
import axios from "axios";
import { BACKENDURL } from "../config";
import { useNavigate } from "react-router-dom";
import { LoadingSnipper } from "../components/LoadingSpinner";

export function AddBlog() {
    const [blogData, setBlogData] = useState<BlogType>({
        title: '',
        content: '',
        createdAt: ''
    });
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        const token = localStorage.getItem('token');
        const today = new Date();
        const option: Intl.DateTimeFormatOptions = {month: 'short', day: 'numeric', year: 'numeric'};
        const createdAtDate = today.toLocaleDateString('en-US', option);
        const result = await axios({
            method: 'post',
            url: `${BACKENDURL}/blog`,
            data: {
                title: blogData.title,
                content: blogData.content,
                createdAt: createdAtDate,
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(result) {
            navigate('/blogs');
        }
        else {
            alert('Error while publishing the blog');
        }
    }

    return(
        <>
            {!loading ?
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
            :
                <div className="w-dvh h-dvh flex justify-center items-center">
                    <LoadingSnipper />
                </div>
            }
        </>
    );
}

export default AddBlog;
