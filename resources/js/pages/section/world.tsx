import WorldImage from '../../../assets/WORLD.png';

export default function WorldSection() {
    return (
        <div className="relative w-screen min-h-screen flex items-center flex-col z-50">
            <div className="w-screen bg-[#81081ec6] absolute -top-8 h-8"></div>
            <div className="w-screen bg-[#81081e80] absolute -top-16 h-8"></div>
            <div className="w-screen bg-[#81081e52] absolute -top-24 h-8"></div>

            <p className="font-depixel text-2xl mt-32 text-white text-center max-w-4xl px-4 z-10 relative">
                Lorem ipsum dolor sit amet adispicing polije sip sip sip dupaktiting jos jis solid solid solid
            </p>

            <img
                src={WorldImage}
                alt="World"
                className="w-full absolute -bottom-16 left-0 right-0 object-cover object-bottom"
            />
        </div>
    )
}
