import React from 'react'

const LoadingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900">
            <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
            <p className="text-lg mb-6">
                {`We couldn't load the hotel data. Please try again later.`}
            </p>
            <button
                className="btn btn-primary text-base-100 px-6 py-3 rounded-lg"
                onClick={() => window.location.reload()}
            >
                Reload Page
            </button>
        </div>
    )
}

export default LoadingPage