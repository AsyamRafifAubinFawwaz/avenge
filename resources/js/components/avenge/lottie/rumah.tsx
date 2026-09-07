import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React, { useRef } from 'react'
import RumahLottieSrc from '../../../../assets/rumahterbakar_lottie.json'

export default function RumahLottie() {
    const boxRef = useRef<HTMLDivElement>(null);

    //   useGSAP(() => {

    //   })

    return (
        <div ref={boxRef} className='w-6xl'>
            <DotLottieReact data={RumahLottieSrc} loop autoplay />
        </div>
    )
}
