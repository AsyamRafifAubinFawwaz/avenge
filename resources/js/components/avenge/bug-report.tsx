import { Bug, X } from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import cornerCerita from '../../../assets/corner_cerita_aku_pengen_pulkam.png';

export default function BugReport() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const submitReport = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitted(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setIsSubmitted(false);
        setImagePreview(null);
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        setImagePreview(file ? URL.createObjectURL(file) : null);
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Laporkan bug"
                title="Laporkan bug"
                className="fixed right-4 bottom-20 z-120 grid h-11 w-11 cursor-pointer place-items-center border-2 border-amber-300 bg-[#180507]/90 text-amber-300 shadow-[3px_3px_0_#000] backdrop-blur-sm transition-[background-color,color,transform] hover:bg-amber-300 hover:text-[#180507] active:translate-y-0.5 sm:right-6 sm:bottom-22"
            >
                <Bug className="h-5 w-5" aria-hidden="true" />
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-130 flex items-center justify-center bg-[#080204]/85 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="bug-report-title"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closeModal();
                        }
                    }}
                >
                    <div className="relative w-full max-w-lg border-2 border-amber-300 bg-[#241014] p-5 text-white shadow-[6px_6px_0_#000] sm:p-7">
                        {(['-top-1.5 -left-1.5', '-top-1.5 -right-1.5', '-bottom-1.5 -left-1.5', '-bottom-1.5 -right-1.5'] as const).map((position, index) => (
                            <img
                                key={position}
                                src={cornerCerita}
                                alt=""
                                aria-hidden="true"
                                className={`pointer-events-none absolute z-20 w-8 ${position} ${index === 1 || index === 3 ? '' : '-scale-x-100'} ${index > 1 ? '-scale-y-100' : ''}`}
                            />
                        ))}
                        <button
                            type="button"
                            onClick={closeModal}
                            aria-label="Tutup bug report"
                            title="Tutup"
                            className="absolute top-3 right-3 grid h-8 w-8 cursor-pointer place-items-center border border-amber-300 text-amber-300 transition-colors hover:bg-amber-300 hover:text-[#241014]"
                        >
                            <X className="h-4 w-4" aria-hidden="true" />
                        </button>

                        {isSubmitted ? (
                            <div className="pr-8">
                                <h2 id="bug-report-title" className="font-kemco text-xl text-amber-300 sm:text-2xl">
                                    REPORT DITERIMA
                                </h2>
                                <p className="mt-3 font-depixel text-xs leading-6 text-white/75">
                                    Terima kasih. Laporan bug kamu sudah berhasil dikirim.
                                </p>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="pixel-button pixel-button--amber mt-6 px-5 py-2 font-depixel text-xs"
                                >
                                    Tutup
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={submitReport}>
                                <div className="pr-8">
                                    <h2 id="bug-report-title" className="font-kemco text-xl text-amber-300 sm:text-2xl">
                                        BUG REPORT
                                    </h2>
                                    <p className="mt-2 font-depixel text-[11px] leading-5 text-white/70">
                                        Ceritakan masalah yang kamu temukan.
                                    </p>
                                </div>

                                <label className="mt-5 block font-depixel text-xs text-amber-100">
                                    Screenshot bug
                                    <input
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        required
                                        onChange={handleImageChange}
                                        className="mt-2 block w-full cursor-pointer border border-amber-300/60 bg-[#14070a] px-3 py-2 font-depixel text-xs text-white file:mr-3 file:border-0 file:bg-amber-300 file:px-2 file:py-1 file:font-depixel file:text-[10px] file:text-[#14070a]"
                                    />
                                </label>

                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview screenshot bug"
                                        className="mt-3 max-h-36 w-full object-contain border border-amber-300/40 bg-[#14070a] p-1"
                                    />
                                )}

                                <label className="mt-4 block font-depixel text-xs text-amber-100">
                                    Deskripsi
                                    <textarea
                                        name="description"
                                        required
                                        rows={4}
                                        className="mt-2 block w-full resize-y border border-amber-300/60 bg-[#14070a] px-3 py-2 font-depixel text-xs leading-5 text-white outline-none placeholder:text-white/35 focus:border-amber-300"
                                        placeholder="Jelaskan langkah atau kondisi saat bug terjadi..."
                                    />
                                </label>

                                <button
                                    type="submit"
                                    className="pixel-button pixel-button--amber mt-5 px-5 py-2 font-depixel text-xs"
                                >
                                    Kirim Report
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
