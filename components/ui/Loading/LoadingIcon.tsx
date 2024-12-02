import React from 'react'
import Lottie from 'react-lottie-player';
import { LoadingPageProps } from './LoadingPage';


const LoadingIcon = ({ className, size_style, iconClassName, iconSelf = false }: LoadingPageProps) => {
    return (
        <div className={iconSelf ? `${className} flex flex-col items-center space-y-0 relative` : "flex flex-row items-center justify-center"}>
            <Lottie
                loop
                play
                path="/animations/likehome-load.json"
                style={size_style}
                className={`${iconClassName} ${iconSelf ? "" : "absolute top-1/2 transform -translate-y-[calc(50%+9em)] p-0 m-0"}`}
            />
        </div>
    )
}

export default LoadingIcon