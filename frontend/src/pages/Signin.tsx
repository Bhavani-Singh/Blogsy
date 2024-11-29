import { useState } from "react";
import { Quotes } from "../components/Quotes";
import { SigninAuth } from "../components/SigninAuth";
import { LoadingSnipper } from "../components/LoadingSpinner";

export const Signin = () => {
    const [loading, setLoading] = useState(false);
    return (
        <>

            { !loading ? 
                <div className="w-dvw h-dvh lg:grid grid-cols-2">
                    <SigninAuth setLoading={setLoading}/>
                    <Quotes />
                </div>
            :
                <div className="w-dvh h-dvh flex justify-center items-center">
                    <LoadingSnipper />
                </div>
            } 

        </>
    )
}

export default Signin;