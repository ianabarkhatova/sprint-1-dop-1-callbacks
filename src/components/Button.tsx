import React, {ButtonHTMLAttributes} from "react";

type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({title, onClick}: ButtonPropsType) => {
    return (
        <button onClick={onClick}>{title}</button>
    );
};