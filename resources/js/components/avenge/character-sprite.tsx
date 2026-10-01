import { useEffect, useRef } from 'react';

interface CharacterSpriteProps {
    src: string;
    alt: string;
    className?: string;
    onClick?: () => void;
    staticPreview?: boolean;
}

export default function CharacterSprite({
    src,
    alt,
    className = '',
    onClick,
    staticPreview = false,
}: CharacterSpriteProps) {
    const imageRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const image = imageRef.current;
        const canvas = canvasRef.current;

        if (!staticPreview || !image?.complete || !canvas) {
            return;
        }

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext('2d');

        if (context) {
            context.imageSmoothingEnabled = false;
            context.drawImage(image, 0, 0);
        }
    }, [src, staticPreview]);

    function drawPreview() {
        const image = imageRef.current;
        const canvas = canvasRef.current;

        if (!image || !canvas) {
            return;
        }

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext('2d');

        if (context) {
            context.imageSmoothingEnabled = false;
            context.drawImage(image, 0, 0);
        }
    }

    if (staticPreview) {
        return (
            <>
                <img
                    ref={imageRef}
                    src={src}
                    alt=""
                    aria-hidden="true"
                    className="hidden"
                    onLoad={drawPreview}
                />
                <canvas
                    ref={canvasRef}
                    aria-label={alt}
                    className={`object-contain ${className}`}
                    onClick={onClick}
                    style={{ imageRendering: 'pixelated' }}
                />
            </>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={`object-contain ${className}`}
            onClick={onClick}
            style={{ imageRendering: 'pixelated' }}
        />
    );
}