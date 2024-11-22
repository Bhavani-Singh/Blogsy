import { Quotes } from "../components/Quotes";
import { SigninAuth } from "../components/SigninAuth";

export const Signin = () => {
    return (
        <div className="w-dvw h-dvh lg:grid grid-cols-2">
            <SigninAuth />
            <Quotes />
        </div>
    )
}

export default Signin;