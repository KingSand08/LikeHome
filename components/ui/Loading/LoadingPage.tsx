import React from 'react'
import AnimatedTextStyle from '@/app/styles/AnimatedLoadingText.module.scss';
import Lottie from 'react-lottie-player';
import LoadingIcon from './LoadingIcon';

export interface LoadingPageProps {
    className: string;
    iconClassName?: string;
    size_style: { width: string; height: string };
    iconSelf?: boolean;
}

const LoadingPage = ({ className, size_style, iconClassName }: LoadingPageProps) => {
    return (
        <div className={`${className} flex flex-col items-center space-y-0 relative`}>
            <LoadingIcon className={iconClassName || ""} size_style={size_style} iconSelf={false} />
            <div
                className={`text-[45px] absolute top-1/2 transform ${AnimatedTextStyle.loading}`}
            >
                <div className={`${AnimatedTextStyle.loading01} flex justify-center`}>
                    {"LOADING...".split("").map((char, idx) => (
                        <span key={idx}>{char}</span>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default LoadingPage