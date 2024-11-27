
interface AvatarInputs {
    initial: string;
    bgColor: string;
}

export const Avatar = ({initial, bgColor}: AvatarInputs) => {
    const design = "relative inline-flex items-center justify-center w-full h-full overflow-hidden rounded-full " + bgColor;
    return (
        <div className={design}>
            <span className="font-medium text-white">{initial}</span>
        </div>
    );
}

