import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React from 'react'

export type IfaruzAction =
    | 'idle_melee_L'
    | 'attack_melee_L'
    | 'slash_melee_L'
    | 'run_melee_L'
    | 'blink_melee_L'
    | 'parry_melee_L'
    | 'idle_mage_L'
    | 'run_mage_L'
    | 'dead_melee_L'
    | 'dead_mage_L'
    | 'idle_melee_R'
    | 'attack_melee_R'
    | 'slash_melee_R'
    | 'run_melee_R'
    | 'blink_melee_R'
    | 'parry_melee_R'
    | 'idle_mage_R'
    | 'run_mage_R'
    | 'dead_melee_R'
    | 'dead_mage_R'
    | 'blink_UL'
    | 'blink_UR'
    | 'blink_BL'
    | 'blink_BR'

interface IfaruzLottieProps {
    action?: IfaruzAction
    loop?: boolean
    className?: string
}

const ACTION_SEGMENTS: Record<IfaruzAction, [number, number]> = {
    'blink_BL': [0, 2],
    'blink_BR': [3, 5],
    'attack_melee_L': [6, 15],
    'blink_melee_L': [16, 18],
    'dead_mage_L': [19, 19],
    'idle_mage_L': [20, 22],
    'idle_melee_L': [23, 25],
    'dead_melee_L': [26, 26],
    'run_melee_L': [27, 29],
    'parry_melee_L': [30, 31],
    'run_mage_L': [32, 34],
    'slash_melee_L': [35, 39],
    'attack_melee_R': [40, 49],
    'blink_melee_R': [50, 52],
    'dead_mage_R': [53, 53],
    'idle_mage_R': [54, 56],
    'idle_melee_R': [57, 59],
    'dead_melee_R': [60, 60],
    'run_melee_R': [61, 63],
    'parry_melee_R': [64, 65],
    'run_mage_R': [66, 68],
    'slash_melee_R': [69, 73],
    'blink_UL': [74, 76],
    'blink_UR': [77, 79],
}

export default function IfaruzLottie({
    action = 'idle_melee_R',
    loop = true,
    className = ''
}: IfaruzLottieProps) {
    const currentSegment = ACTION_SEGMENTS[action] || ACTION_SEGMENTS['idle_melee_R']

    return (
        <div
            className={`
                ifaruz-pixel-wrapper w-full h-full flex items-center justify-center
                [&_canvas]:![image-rendering:pixelated]
                [&_canvas]:![image-rendering:-moz-crisp-edges]
                [&_canvas]:![image-rendering:crisp-edges]
                ${className}
            `}
        >
            <DotLottieReact
                src="/assets/lottie/ifaruz.lottie"
                segment={currentSegment}
                renderConfig={{
                    renderMode: 'canvas',
                    preserveAspectRatio: 'xMidYMid slice',
                    devicePixelRatio: 1, // penting biar pixel art tetap tajam
                } as any}
                loop={loop}
                autoplay
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    )
}