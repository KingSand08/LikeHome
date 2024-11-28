import React from 'react'
import AnimatedTextStyle from '@/app/styles/AnimatedLoadingText.module.scss';
import Lottie from 'react-lottie-player';

const LoadingPage = () => {
    return (
        <div className="flex flex-col items-center space-y-0 min-h-screen relative">
            <Lottie
                loop
                play
                path="/animations/likehome-load.json"
                style={{ width: '400px', height: '400px' }}
                className="absolute top-1/2 transform -translate-y-[calc(50%+9em)] p-0 m-0"
            />
            <div
                className={`text-[50px] sm:text-[70px] absolute top-1/2 transform ${AnimatedTextStyle.loading}`}
            >
                <div className={`${AnimatedTextStyle.loading01} flex justify-center`}>
                    <span>L</span>
                    <span>O</span>
                    <span>A</span>
                    <span>D</span>
                    <span>I</span>
                    <span>N</span>
                    <span>G</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </div>
            </div>
        </div>
    )
}

export default LoadingPage