import React from "react";

type IconButtonProps = {
    icon?: React.ReactNode;
    onClick?: () => void;
    text: string;
};

const IconButton = ({ icon, onClick, text }: IconButtonProps) => {
    return (
        <button className="btn" onClick={onClick}>
            {icon}
            {text}
        </button>
    );
};

export default IconButton;
