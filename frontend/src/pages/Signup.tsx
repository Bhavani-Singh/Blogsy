import { SignupAuth } from "../components/SignupAuth";
import { Quotes } from "../components/Quotes";
import { useState } from "react";
import { LoadingSnipper } from "../components/LoadingSpinner";

export const Signup = () => {
    const [loading, setLoading] = useState(false);

    return (
        <>

            { !loading ? 
                <div className="w-dvw h-dvh lg:grid grid-cols-2">
                    <SignupAuth setLoading={setLoading}/>
                    <Quotes />
                </div>
            :
                <div className="w-dvh h-dvh flex justify-center items-center">
                    <LoadingSnipper />
                </div>
            } 

        </>
    );
}

export default Signup;