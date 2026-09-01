import WorldImage from '../../../assets/WORLD.png';

export default function WorldSection() {
    return (
        <div className="w-screen flex flex-col z-50">
            <div className="w-full flex flex-col -mt-24 relative z-50">
                <div className="w-full bg-[#A90C1F52] h-8"></div>
                <div className="w-full bg-[#A90C1F80] h-8"></div>
                <div className="w-full bg-[#A90C1Fc6] h-8"></div>
            </div>

            <div className="relative w-full min-h-screen pb-24 flex items-center flex-col bg-[#A90C1F]">
                <p className="font-depixel text-2xl mt-16 text-white text-center max-w-4xl px-4 z-10 relative">
                    Lorem ipsum dolor sit amet adispicing polije sip sip sip dupaktiting jos jis solid solid solid
                </p>

                <img
                    src={WorldImage}
                    alt="World"
                    className="w-full absolute bottom-0 left-0 right-0 object-cover object-bottom"
                />
            </div>
        </div>
    )
}
