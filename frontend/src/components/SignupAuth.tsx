import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SignupType } from "@ctrlaltelite/common";
import { BACKENDURL } from "../config";


export const SignupAuth = ({setLoading}) => {
    const [postInput, setPostInput] = useState<SignupType>({
        email: '',
        name: '',
        about: '',
        password: ''
    });

    const navigate = useNavigate();

    async function signUp() {
        try {
            setLoading(true);
            const result = await axios({
                method: 'post',
                url: `${BACKENDURL}/user/signup`,
                data: postInput
            });

            const username = result.data.username;
            const userId = result.data.userId;
            const jwt = result.data.jwt_token;
            localStorage.setItem('token', jwt);
            localStorage.setItem('username', username);
            localStorage.setItem('userId', userId);

            navigate('/blogs');
        }
        catch(error) {
            setLoading(false);
            alert(`Error while signing in!: ${error} `);
            navigate('/signup');
        }
    }

    return (
        <div className="flex flex-col w-full justify-center items-center">
            <div className="flex flex-col w-[450px] py-10 px-5">
                <div className="text-center">
                    <h1 className="font-extrabold text-3xl">Create an account</h1>
                    <div className="flex justify-center items-center mt-2 gap-2">
                        <p className="font-medium text-slate-400">Already have an account? </p>
                        <Link className="underline text-slate-400" to={'/'}>Signin</Link>
                    </div>
                </div>

                <LabelledInput label="Email" value={postInput.email} placeholder="x@example.com" onChange={e => setPostInput({
                    ...postInput,
                    email:e.target.value})} />

                <LabelledInput label="Name" value={postInput.name} placeholder="Enter you name" onChange={e => setPostInput({
                    ...postInput,
                    name: e.target.value})}/>


                <LabelledInput label="About You" value={postInput.about} placeholder="Software Engineer @ XYZ" onChange={e => setPostInput({
                    ...postInput,
                    about: e.target.value})}/>
                
                <LabelledInput label="Password" value={postInput.password} placeholder="Min 8 characters" type="password" onChange={e => setPostInput({
                    ...postInput,
                    password: e.target.value})} />

                <div className="mt-5 w-full">
                    <button className="bg-black text-white font-bold rounded-md w-full p-3" onClick={signUp}>Sign Up</button>
                </div>
            </div>
        </div>
    );
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
}

function LabelledInput({label, placeholder, value, onChange, type}: LabelledInputType) {
    return (
        <div className="flex flex-col mt-[25px] gap-2">
            <label htmlFor={label} className="font-semibold">{label}</label>
            <input type={type || "text"} id={value} value={value} placeholder={placeholder} onChange={onChange} className="border-slate-500 rounded-md border focus:outline-none p-2"/>
        </div>
    );
}