import React from 'react'
import Image from 'next/image';
import Modal from './Modal'

interface ImageModalProps {
    image: string;
    alt: string;
    onClose: () => void;
    className?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, alt, onClose, className }) => {
    return (
        <Modal
            className={`${className}`}
            show={!!image} onClose={onClose}
        >
            <Image
                src={image}
                alt={alt}
                width={1200}
                height={1200}
                quality={100}
                unoptimized
                className="w-fit h-96 mx-auto object-contain rounded-lg cursor-pointer bg-slate-900 bg-opacity-25 shadow-md"
            />
        </Modal>
    )
}

export default ImageModal