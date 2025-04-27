'use client';

import { useState, useRef } from 'react';

export default function MusicButton() {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleClick = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Handler for when audio naturally ends
    const handleAudioEnded = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0; // Reset to beginning
            audioRef.current.play();          // Start playing again
        }
    };

    return (
        <div className="fixed top-6 right-4 hidden md:block z-50">
            {/* Audio element with loop attribute */}
            <audio 
                ref={audioRef} 
                src="/music.mp3" 
                preload="auto" 
                loop={true}
                onEnded={handleAudioEnded} // backup in case loop doesn't work
            />

            {/* SVG Button */}
            <button onClick={handleClick} className="p-2 hover:cursor-pointer">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                    width="70"
                    height="70"
                    style={{
                        shapeRendering: "auto",
                        display: "block",
                        background: "transparent",
                    }}
                >
                    <g>
                        <rect fill="#7bf1a8" height={isPlaying ? "40" : "40"} width="15" y={isPlaying ? "30" : "30"} x="17.5">
                            {isPlaying && (
                                <>
                                    <animate
                                        attributeName="y"
                                        values="18;30;30"
                                        keyTimes="0;0.5;1"
                                        dur="0.9s"
                                        repeatCount="indefinite"
                                        begin="-0.18s"
                                        calcMode="spline"
                                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                                    />
                                    <animate
                                        attributeName="height"
                                        values="64;40;40"
                                        keyTimes="0;0.5;1"
                                        dur="0.9s"
                                        repeatCount="indefinite"
                                        begin="-0.18s"
                                        calcMode="spline"
                                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                                    />
                                </>
                            )}
                        </rect>

                        <rect fill="#7bf1a8" height={isPlaying ? "40" : "40"} width="15" y={isPlaying ? "30" : "30"} x="42.5">
                            {isPlaying && (
                                <>
                                    <animate
                                        attributeName="y"
                                        values="21;30;30"
                                        keyTimes="0;0.5;1"
                                        dur="0.9s"
                                        repeatCount="indefinite"
                                        begin="-0.09s"
                                        calcMode="spline"
                                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                                    />
                                    <animate
                                        attributeName="height"
                                        values="58;40;40"
                                        keyTimes="0;0.5;1"
                                        dur="0.9s"
                                        repeatCount="indefinite"
                                        begin="-0.09s"
                                        calcMode="spline"
                                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                                    />
                                </>
                            )}
                        </rect>

                        <rect fill="#7bf1a8" height={isPlaying ? "40" : "40"} width="15" y={isPlaying ? "30" : "30"} x="67.5">
                            {isPlaying && (
                                <>
                                    <animate
                                        attributeName="y"
                                        values="21;30;30"
                                        keyTimes="0;0.5;1"
                                        dur="0.9s"
                                        repeatCount="indefinite"
                                        begin="0s"
                                        calcMode="spline"
                                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                                    />
                                    <animate
                                        attributeName="height"
                                        values="58;40;40"
                                        keyTimes="0;0.5;1"
                                        dur="0.9s"
                                        repeatCount="indefinite"
                                        begin="0s"
                                        calcMode="spline"
                                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                                    />
                                </>
                            )}
                        </rect>
                    </g>
                </svg>
            </button>
        </div>
    );
}