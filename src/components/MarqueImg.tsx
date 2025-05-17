"use client";

import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";

export function MarqueImg() {
    return (
        <div className="h-[100vh] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 glitch-text-sm text-center" data-text="STORY OF HACKOLUTION">
                PREVIOUS YEAR MOMENTS
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-center mb-6">
                A visual throwback to the energy and innovation of last year&apos;s HACK&#123;<span className="text-green-400">0</span>&#125;LUTION.
            </p>
            <div className="w-full px-4 md:px-8">
                <InfiniteMovingCards
                    items={List1}
                    direction="right"
                    speed="normal"
                    className="mb-6"
                />
                <InfiniteMovingCards
                    items={List2}
                    direction="left"
                    speed="normal"
                />
            </div>
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