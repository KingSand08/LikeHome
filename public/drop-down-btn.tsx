import React from "react";

const DropDownBtn = ({ color = "white", rotated = false }: { color?: string, rotated: boolean }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="-949 951 100 125"
            xmlSpace="preserve"
            enableBackground="new -949 951 100 100"
            fill="currentColor"
            style={{
                transform: rotated ? "rotate(0deg)" : "rotate(180deg)",
                transition: "transform 0.2s ease-in-out",
            }}
        >
            <g>
                <polygon points="-860.8,975.6 -851.5,986.8 -899,1026.4 -946.5,986.8 -937.2,975.6 -899,1007.5" />
            </g>
        </svg>
    );
};

export default DropDownBtn;
