import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-primary",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg disabled:bg-blue-400 ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}