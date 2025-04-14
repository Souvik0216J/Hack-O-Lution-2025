"use client";

import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";
import { BackgroundBeams } from "../components/ui/background-beams";

export function MarqueImg() {
    return (
        <div className="h-[100vh] rounded-md flex flex-col antialiased bg-white dark:bg-[#0a0a0a] dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <h1 className="text-4xl xs:text-4xl sm:text-5xl md:text-7xl text-yellow-100 p-5">Previous Year Galary</h1>
            <InfiniteMovingCards
                items={List1}
                direction="right"
                speed="normal"
            />
            <hr />
            <InfiniteMovingCards
                items={List2}
                direction="left"
                speed="normal"
            />
            <BackgroundBeams/>
        </div>
    );
}

const List1 = [
    {
        src: "/galary/1.JPG",
        alt: "img-1"
    },
    {
        src: "/galary/2.JPG",
        alt: "img-2"
    },
    {
        src: "/galary/3.JPG",
        alt: "img-3"
    },
    {
        src: "/galary/4.JPG",
        alt: "img-4"
    },
    {
        src: "/galary/5.JPG",
        alt: "img-5"
    },
    {
        src: "/galary/6.JPG",
        alt: "img-6"
    },
];

const List2 = [
    {
        src: "/galary/7.JPG",
        alt: "img-7"
    },
    {
        src: "/galary/8.JPG",
        alt: "img-8"
    },
    {
        src: "/galary/9.JPG",
        alt: "img-9"
    },
    {
        src: "/galary/10.JPG",
        alt: "img-10"
    },
    {
        src: "/galary/11.JPG",
        alt: "img-11"
    },
    {
        src: "/galary/12.JPG",
        alt: "img-12"
    },
];
