import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} shadow-sm hover:shadow transition-shadow duration-200 disabled:opacity-60 disabled:cursor-not-allowed`}
            {...props}
        >
            {children}
        </button>
    );
}