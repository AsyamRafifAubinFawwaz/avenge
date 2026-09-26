import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React from 'react'
export type SoldierAction =
    | 'idle_R'
    | 'run_R'
    | 'attack_R'
    | 'dead_R'
    | 'idle_L'
    | 'run_L'
    | 'attack_L'
    | 'dead_L'

interface SoldierLottieProps {
    action?: SoldierAction
    loop?: boolean
    autoplay?: boolean
    className?: string
}

const ACTION_SEGMENTS: Record<SoldierAction, [number, number]> = {
    'idle_R':   [0, 2],     // R_idle_soldier_1 → 3
    'run_R':    [3, 5],     // R_run_soldier_1 → 3
    'attack_R': [6, 11],    // R_attack_commander_1 → 6
    'dead_R':   [12, 12],   // R_dead_soldier_1 → 1 frame

    'idle_L':   [13, 15],   // L_idle_soldier_1 → 3
    'run_L':    [16, 18],   // L_run_soldier_1 → 3
    'attack_L': [19, 24],   // L_attack_commander_1 → 6
    'dead_L':   [12, 12],
}

export default function SoldierLottie({
    action = 'idle_R',
    loop = true,
    autoplay = true,
    className = ''
}: SoldierLottieProps) {
    const currentSegment = ACTION_SEGMENTS[action] || ACTION_SEGMENTS['idle_R']

    return (
        <div className={`w-full [&_canvas]:[image-rendering:pixelated] ${className}`}>
            <DotLottieReact
                src="/assets/lottie/soldier_lottie.json"
                segment={currentSegment}
                renderConfig={{ renderMode: 'canvas' } as any}
                loop={loop}
                autoplay={autoplay}
            />
        </div>
    )
}