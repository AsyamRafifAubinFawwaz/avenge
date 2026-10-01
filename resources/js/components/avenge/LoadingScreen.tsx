"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import LogoAvenge from "../../../assets/logo_avenge.png";

interface LoadingScreenProps {
    onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fireCanvasRef = useRef<HTMLCanvasElement>(null);
    const screenRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const fireCanvas = fireCanvasRef.current;
        const screen = screenRef.current;

        if (!canvas || !fireCanvas || !screen) {
            return;
        }

        const ctx = canvas.getContext("2d");
        const fireCtx = fireCanvas.getContext("2d");

        if (!ctx || !fireCtx) {
            return;
        }

        ctx.imageSmoothingEnabled = false;
        fireCtx.imageSmoothingEnabled = false;

        let cancelled = false;
        let started = false;
        let timeline: gsap.core.Timeline | undefined;
        const img = new Image();
        const releaseInitialScreen = () => {
            document.getElementById("initial-loading-screen")?.remove();
        };

        const startAnimation = () => {
            if (cancelled || started) {
                return;
            }

            started = true;

            const WIDTH = img.width;
            const HEIGHT = img.height;
            const GRID = 4;
            const EXIT_GRID = 8;
            const viewportWidth = Math.max(window.innerWidth, 1);
            const viewportHeight = Math.max(window.innerHeight, 1);
            const logoOffsetX = Math.floor((viewportWidth - WIDTH) / 2);
            const logoOffsetY = Math.floor((viewportHeight - HEIGHT) / 2);

            canvas.width = viewportWidth;
            canvas.height = viewportHeight;
            fireCanvas.width = viewportWidth;
            fireCanvas.height = viewportHeight;

            ctx.clearRect(0, 0, viewportWidth, viewportHeight);
            ctx.fillStyle = "#080808";
            ctx.fillRect(0, 0, viewportWidth, viewportHeight);
            fireCtx.clearRect(0, 0, viewportWidth, viewportHeight);
            releaseInitialScreen();

            // Canvas temporer untuk membaca piksel logo
            const tempCanvas = document.createElement("canvas");
            const tempCtx = tempCanvas.getContext("2d");

            if (!tempCtx) {
                return;
            }

            tempCanvas.width = WIDTH;
            tempCanvas.height = HEIGHT;
            tempCtx.imageSmoothingEnabled = false;
            tempCtx.drawImage(img, 0, 0);

            let imageData: ImageData | null = null;
            let canRevealPixels = true;

            try {
                imageData = tempCtx.getImageData(0, 0, WIDTH, HEIGHT);
            } catch {
                canRevealPixels = false;
                ctx.drawImage(
                    img,
                    logoOffsetX,
                    logoOffsetY,
                    WIDTH,
                    HEIGHT
                );
            }

            const cells: {
                x: number;
                y: number;
                width: number;
                height: number;
            }[] = [];

            // Cari block yang memiliki piksel logo (non-transparan)
            for (let y = 0; y < HEIGHT; y += GRID) {
                for (let x = 0; x < WIDTH; x += GRID) {
                    let found = false;

                    for (
                        let py = y;
                        py < Math.min(y + GRID, HEIGHT);
                        py++
                    ) {
                        for (
                            let px = x;
                            px < Math.min(x + GRID, WIDTH);
                            px++
                        ) {
                            const index = (py * WIDTH + px) * 4;
                            const alpha = imageData?.data[index + 3] ?? 0;

                            if (alpha > 50) {
                                found = true;
                                break;
                            }
                        }

                        if (found) {
                            break;
                        }
                    }

                    if (found) {
                        cells.push({
                            x: logoOffsetX + x,
                            y: logoOffsetY + y,
                            width: Math.min(GRID, WIDTH - x),
                            height: Math.min(GRID, HEIGHT - y),
                        });
                    }
                }
            }

            if (cells.length === 0) {
                cells.push({
                    x: logoOffsetX,
                    y: logoOffsetY,
                    width: WIDTH,
                    height: HEIGHT,
                });
            }

            // Acak urutan sel piksel
            for (let i = cells.length - 1; i > 0; i--) {
                const randomIndex = Math.floor(
                    Math.random() * (i + 1)
                );

                [cells[i], cells[randomIndex]] = [
                    cells[randomIndex],
                    cells[i],
                ];
            }

            const viewportCenterX = viewportWidth / 2;
            const viewportCenterY = viewportHeight / 2;
            const getCellNoise = (cell: typeof cells[number]) => {
                const value = Math.sin(cell.x * 12.9898 + cell.y * 78.233) * 43758.5453;

                return value - Math.floor(value);
            };

            const exitCells = [] as typeof cells;

            for (let y = 0; y < viewportHeight; y += EXIT_GRID) {
                for (let x = 0; x < viewportWidth; x += EXIT_GRID) {
                    exitCells.push({
                        x,
                        y,
                        width: Math.min(EXIT_GRID, viewportWidth - x),
                        height: Math.min(EXIT_GRID, viewportHeight - y),
                    });
                }
            }

            exitCells.sort((firstCell, secondCell) => {
                const firstCellCenterX = firstCell.x + firstCell.width / 2;
                const firstCellCenterY = firstCell.y + firstCell.height / 2;
                const secondCellCenterX = secondCell.x + secondCell.width / 2;
                const secondCellCenterY = secondCell.y + secondCell.height / 2;
                const firstDistance = Math.hypot(
                    firstCellCenterX - viewportCenterX,
                    firstCellCenterY - viewportCenterY
                );
                const secondDistance = Math.hypot(
                    secondCellCenterX - viewportCenterX,
                    secondCellCenterY - viewportCenterY
                );
                const firstPriority =
                    firstDistance + (getCellNoise(firstCell) - 0.5) * EXIT_GRID * 8;
                const secondPriority =
                    secondDistance + (getCellNoise(secondCell) - 0.5) * EXIT_GRID * 8;

                if (firstPriority !== secondPriority) {
                    return firstPriority - secondPriority;
                }

                return (
                    Math.atan2(
                        firstCellCenterY - viewportCenterY,
                        firstCellCenterX - viewportCenterX
                    ) -
                    Math.atan2(
                        secondCellCenterY - viewportCenterY,
                        secondCellCenterX - viewportCenterX
                    )
                );
            });

            const progress = { value: 0 };
            let previous = 0;

            // Menggambar potongan gambar logo asli, bukan kotak putih (#ffffff)
            const drawCell = (cell: typeof cells[number]) => {
                if (!canRevealPixels) {
                    return;
                }

                const sourceX = cell.x - logoOffsetX;
                const sourceY = cell.y - logoOffsetY;

                ctx.drawImage(
                    tempCanvas,
                    sourceX,
                    sourceY,
                    cell.width,
                    cell.height,
                    cell.x,
                    cell.y,
                    cell.width,
                    cell.height
                );
            };

            const drawFire = (cell: typeof cells[number], frame: number) => {
                const cellCenterX = cell.x + cell.width / 2;
                const cellCenterY = cell.y + cell.height / 2;
                const seed = cell.x * 17.31 + cell.y * 9.17 + frame * 0.73;
                const colors = ["#fff2a6", "#ffc400", "#ff7a00", "#e73512"];

                for (let i = 0; i < 7; i++) {
                    const particleSeed = seed + i * 19.37;
                    const randomX = Math.sin(particleSeed) * 0.5 + 0.5;
                    const randomY = Math.sin(particleSeed * 1.71) * 0.5 + 0.5;
                    const size = 2 + (i % 3);
                    const x = Math.floor(
                        cellCenterX + (randomX - 0.5) * (cell.width + 18)
                    );
                    const y = Math.floor(
                        cellCenterY + (randomY - 0.72) * (cell.height + 24)
                    );

                    fireCtx.fillStyle = colors[i % colors.length];
                    fireCtx.fillRect(x, y, size, size);
                }
            };

            const progressBar = screen.querySelector(
                ".loading-line-fill"
            ) as HTMLElement;

            timeline = gsap.timeline();

            timeline.to({}, { duration: 0.25 });

            // Animasikan kemunculan piksel logo
            timeline.to(progress, {
                value: cells.length,
                duration: 1.8,
                ease: "none",
                onUpdate: () => {
                    const current = Math.floor(progress.value);

                    for (let i = previous; i < current; i++) {
                        drawCell(cells[i]);
                    }

                    previous = current;

                    const percentage = Math.floor(
                        (current / cells.length) * 100
                    );

                    if (progressBar) {
                        progressBar.style.transform = `scaleX(${percentage / 100})`;
                    }
                },
            });

            // Snap effect
            timeline.to(canvas, {
                scale: 1.025,
                duration: 0.08,
                ease: "steps(1)",
            });

            timeline.to(canvas, {
                scale: 1,
                duration: 0.08,
                ease: "steps(1)",
            });

            timeline.to({}, { duration: 0.25 });

            const exitProgress = { value: 0 };
            let cleared = 0;

            // Hapus logo dari tengah ke luar, satu block piksel pada satu waktu.
            timeline.to(exitProgress, {
                value: exitCells.length,
                duration: 1.35,
                ease: "none",
                onUpdate: () => {
                    const current = Math.floor(exitProgress.value);

                    fireCtx.clearRect(0, 0, viewportWidth, viewportHeight);

                    for (let i = cleared; i < current; i++) {
                        const cell = exitCells[i];

                        ctx.clearRect(
                            cell.x,
                            cell.y,
                            cell.width,
                            cell.height
                        );
                    }

                    cleared = current;

                    if (current < exitCells.length) {
                        drawFire(exitCells[current], current);
                    }
                },
            });

            // Tutup overlay setelah semua pixel logo terhapus.
            timeline.to(screen, {
                opacity: 0,
                duration: 0.08,
                ease: "steps(4)",
                onComplete: () => {
                    fireCtx.clearRect(0, 0, viewportWidth, viewportHeight);
                    screen.style.display = "none";
                    onComplete?.();
                },
            });
        };

        img.onload = startAnimation;
        img.onerror = () => {
            releaseInitialScreen();
            screen.style.display = "none";
        };
        img.crossOrigin = "anonymous";
        img.src = LogoAvenge;

        if (img.complete && img.naturalWidth > 0) {
            startAnimation();
        }

        return () => {
            cancelled = true;
            img.onload = null;
            img.onerror = null;
            timeline?.kill();
            fireCtx.clearRect(0, 0, fireCanvas.width, fireCanvas.height);
        };
    }, []);

    return (
        <div ref={screenRef} className="loading-screen">
            <div className="loading-wrapper">
                <canvas ref={canvasRef} className="loading-logo" />
                <canvas ref={fireCanvasRef} className="loading-fire" />

                <div className="loading-line">
                    <div className="loading-line-fill" />
                </div>
            </div>
        </div>
    );
}