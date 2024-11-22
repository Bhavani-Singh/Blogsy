import { SignupAuth } from "../components/SignupAuth";
import { Quotes } from "../components/Quotes";

export const Signup = () => {
    return (
        <div className="w-dvw h-dvh lg:grid grid-cols-2">
            <SignupAuth />
            <Quotes />
        </div>
    )
}

export default Signup;