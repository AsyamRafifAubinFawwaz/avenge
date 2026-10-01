import { router } from '@inertiajs/react';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function RouteLoadingScreen() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const pageReadyRef = useRef(false);
    const coverFinishedRef = useRef(false);

    const createCells = (canvas: HTMLCanvasElement) => {
        const grid = 8;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const cells: { x: number; y: number; width: number; height: number }[] = [];

        for (let y = 0; y < canvas.height; y += grid) {
            for (let x = 0; x < canvas.width; x += grid) {
                cells.push({
                    x,
                    y,
                    width: Math.min(grid, canvas.width - x),
                    height: Math.min(grid, canvas.height - y),
                });
            }
        }

        const getCellNoise = (cell: (typeof cells)[number]) => {
            const value = Math.sin(cell.x * 12.9898 + cell.y * 78.233) * 43758.5453;

            return value - Math.floor(value);
        };

        cells.sort((firstCell, secondCell) => {
            const firstDistance = Math.hypot(
                firstCell.x + firstCell.width / 2 - centerX,
                firstCell.y + firstCell.height / 2 - centerY,
            );
            const secondDistance = Math.hypot(
                secondCell.x + secondCell.width / 2 - centerX,
                secondCell.y + secondCell.height / 2 - centerY,
            );
            const firstPriority = firstDistance + (getCellNoise(firstCell) - 0.5) * grid * 8;
            const secondPriority = secondDistance + (getCellNoise(secondCell) - 0.5) * grid * 8;

            if (firstPriority !== secondPriority) {
                return firstPriority - secondPriority;
            }

            return Math.atan2(
                firstCell.y + firstCell.height / 2 - centerY,
                firstCell.x + firstCell.width / 2 - centerX,
            ) - Math.atan2(
                secondCell.y + secondCell.height / 2 - centerY,
                secondCell.x + secondCell.width / 2 - centerX,
            );
        });

        return cells;
    };

    const openScreen = () => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const context = canvas.getContext('2d');
        if (!context) {
            return;
        }

        const cells = createCells(canvas);
        const progress = { value: 0 };

        timelineRef.current?.kill();
        timelineRef.current = gsap.timeline({
            onComplete: () => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                canvas.classList.remove('is-visible');
            },
        });

        timelineRef.current.to(progress, {
            value: cells.length,
            duration: 0.7,
            ease: 'none',
            onUpdate: () => {
                const current = Math.floor(progress.value);

                for (let index = 0; index < current; index++) {
                    const cell = cells[index];
                    context.clearRect(cell.x, cell.y, cell.width, cell.height);
                }
            },
        });
    };

    const closeScreen = () => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const context = canvas.getContext('2d');
        if (!context) {
            return;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.classList.add('is-visible');
        context.clearRect(0, 0, canvas.width, canvas.height);

        const cells = createCells(canvas).reverse();
        const progress = { value: 0 };

        timelineRef.current?.kill();
        timelineRef.current = gsap.timeline({
            onComplete: () => {
                coverFinishedRef.current = true;

                if (pageReadyRef.current) {
                    requestAnimationFrame(() => {
                        requestAnimationFrame(openScreen);
                    });
                }
            },
        });

        timelineRef.current.to(progress, {
            value: cells.length,
            duration: 0.7,
            ease: 'none',
            onUpdate: () => {
                const current = Math.floor(progress.value);

                context.fillStyle = '#080808';

                for (let index = 0; index < current; index++) {
                    const cell = cells[index];
                    context.fillRect(cell.x, cell.y, cell.width, cell.height);
                }
            },
        });
    };

    useEffect(() => {
        const removeStartListener = router.on('start', () => {
            pageReadyRef.current = false;
            coverFinishedRef.current = false;
            closeScreen();
        });

        const removeFinishListener = router.on('finish', () => {
            pageReadyRef.current = true;

            if (coverFinishedRef.current) {
                requestAnimationFrame(() => {
                    requestAnimationFrame(openScreen);
                });
            }
        });

        return () => {
            removeStartListener();
            removeFinishListener();
            timelineRef.current?.kill();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="route-loading-screen"
            aria-hidden="true"
        />
    );
}
