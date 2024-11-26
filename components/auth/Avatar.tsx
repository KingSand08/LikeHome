import React from "react";
import Image from "next/image";

type AvatarProps = {
    image?: string;
    username?: string;
    className?: string;
    size: string;
    textSize?: string;
};

const Avatar: React.FC<AvatarProps> = ({ image, username, className = "", size, textSize = "text-xl" }) => {
    return (
        <div
            className={`flex items-center justify-center rounded-full overflow-hidden flex-shrink-0 ${className}`}
            style={{
                width: size || "3.6em",
                height: size,
                backgroundColor: image ? "transparent" : "#374151",
                aspectRatio: '1 / 1',
            }}
        >
            {image ? (
                <Image
                    src={image}
                    alt="Profile Image"
                    width={500}
                    height={500}
                    quality={100}
                    className="object-cover w-full h-full"
                    priority
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />
            ) : (
                <span
                    className={`${textSize} text-neutral-content`}
                    style={{
                        lineHeight: size,
                        textAlign: "center",
                    }}
                >
                    {username?.substring(0, 2)?.toUpperCase() || "?"}
                </span>
            )}
        </div>
    );
};

export default Avatar;
