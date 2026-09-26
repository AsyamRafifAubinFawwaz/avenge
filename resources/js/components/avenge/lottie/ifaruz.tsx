import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import type { DotLottie } from '@lottiefiles/dotlottie-react'
import React, { useCallback, useEffect, useRef } from 'react'

export type IfaruzAction =
    | 'idle_melee_L' | 'attack_melee_L' | 'slash_melee_L' | 'run_melee_L'
    | 'blink_melee_L' | 'parry_melee_L' | 'idle_mage_L' | 'run_mage_L'
    | 'dead_melee_L' | 'dead_mage_L' | 'idle_melee_R' | 'attack_melee_R'
    | 'slash_melee_R' | 'run_melee_R' | 'blink_melee_R' | 'parry_melee_R'
    | 'idle_mage_R' | 'run_mage_R' | 'dead_melee_R' | 'dead_mage_R'
    | 'blink_UL' | 'blink_UR' | 'blink_BL' | 'blink_BR'

interface IfaruzLottieProps {
    action?: IfaruzAction
    loop?: boolean
    autoplay?: boolean
    className?: string
}

const ACTION_SEGMENTS: Record<IfaruzAction, [number, number]> = {
    'blink_BL': [0, 2], 'blink_BR': [3, 5],
    'attack_melee_L': [6, 15], 'blink_melee_L': [16, 18],
    'dead_mage_L': [19, 19], 'idle_mage_L': [20, 22],
    'idle_melee_L': [23, 25], 'dead_melee_L': [26, 26],
    'run_melee_L': [27, 29], 'parry_melee_L': [30, 31],
    'run_mage_L': [32, 34], 'slash_melee_L': [35, 39],
    'attack_melee_R': [40, 49], 'blink_melee_R': [50, 52],
    'dead_mage_R': [53, 53], 'idle_mage_R': [54, 56],
    'idle_melee_R': [57, 59], 'dead_melee_R': [60, 60],
    'run_melee_R': [61, 63], 'parry_melee_R': [64, 65],
    'run_mage_R': [66, 68], 'slash_melee_R': [69, 73],
    'blink_UL': [74, 76], 'blink_UR': [77, 79],
}

const NATIVE_FPS = 24
const NATIVE_ART_SIZE = 64
const SOURCE_RENDER_SIZE = 512

function getFrameCount([start, end]: [number, number]) {
    return end - start + 1
}

export default function IfaruzLottie({
    action = 'idle_melee_R',
    loop = true,
    autoplay = true,
    className = ''
}: IfaruzLottieProps) {
    const dotLottieRef = useRef<DotLottie | null>(null)
    const sourceWrapperRef = useRef<HTMLDivElement>(null)
    const outputCanvasRef = useRef<HTMLCanvasElement>(null)
    const rafRef = useRef<number>(0)
    const isRunningRef = useRef(false)

    const currentSegment = ACTION_SEGMENTS[action] || ACTION_SEGMENTS['idle_melee_R']
    const frameCount = getFrameCount(currentSegment)
    const speed = frameCount / NATIVE_FPS

    const dotLottieRefCallback = useCallback((dotLottie: DotLottie | null) => {
        dotLottieRef.current = dotLottie
    }, [])

    // Main animation loop
    useEffect(() => {
        const outputCanvas = outputCanvasRef.current
        if (!outputCanvas) return

        const outCtx = outputCanvas.getContext('2d', { alpha: true })
        if (!outCtx) return

        outputCanvas.width = NATIVE_ART_SIZE
        outputCanvas.height = NATIVE_ART_SIZE
        outCtx.imageSmoothingEnabled = false

        const tick = () => {
            const sourceCanvas = sourceWrapperRef.current?.querySelector('canvas')
            if (sourceCanvas) {
                outCtx.clearRect(0, 0, NATIVE_ART_SIZE, NATIVE_ART_SIZE)
                outCtx.drawImage(
                    sourceCanvas,
                    0, 0, sourceCanvas.width, sourceCanvas.height,
                    0, 0, NATIVE_ART_SIZE, NATIVE_ART_SIZE
                )
            }
            if (isRunningRef.current) {
                rafRef.current = requestAnimationFrame(tick)
            }
        }

        if (autoplay) {
            isRunningRef.current = true
            tick()
        } else {
            isRunningRef.current = false
            cancelAnimationFrame(rafRef.current)
        }

        return () => {
            isRunningRef.current = false
            cancelAnimationFrame(rafRef.current)
        }
    }, [autoplay])

    // Restart animation when action changes
    useEffect(() => {
        if (autoplay && dotLottieRef.current) {
            // Optional: force restart segment if needed
            // dotLottieRef.current.play()
        }
    }, [action, autoplay])

    return (
        <div className={`ifaruz-pixel-wrapper w-full h-full relative ${className}`}>
            {/* Hidden Lottie source */}
            <div
                ref={sourceWrapperRef}
                style={{
                    position: 'absolute',
                    width: SOURCE_RENDER_SIZE,
                    height: SOURCE_RENDER_SIZE,
                    opacity: 0,
                    pointerEvents: 'none',
                    overflow: 'hidden'
                }}
            >
                <DotLottieReact
                    src="/assets/lottie/ifaruz.lottie"
                    segment={currentSegment}
                    speed={speed}
                    dotLottieRefCallback={dotLottieRefCallback}
                    renderConfig={{
                        renderMode: 'canvas',
                        preserveAspectRatio: 'xMidYMid slice',
                        devicePixelRatio: 1,
                    }}
                    loop={loop}
                    autoplay={autoplay}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>

            {/* Pixelated output canvas */}
            <canvas
                ref={outputCanvasRef}
                className="w-full h-full"
                style={{
                    imageRendering: 'pixelated',
                    width: '100%',
                    height: '100%',
                }}
            />
        </div>
    )
}