import React from 'react'
import { FaDiscord, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from 'next/link'

export default function Footer() {
    return (
        <div className="mt-4 h-[60px] bg-[#0a0a0a] backdrop-blur-sm text-white flex justify-around items-center">
            <div className="text-xl">&#169; HACK&#123;0&#125;LUTION</div>

            <div className="flex justify-center items-center gap-4 ">
                <Link href={"https://discord.gg/hjxtZZXsD4"} target="_blank">
                    <FaDiscord className=" hover:text-white text-gray-300" />
                </Link>
                <Link href={"https://www.instagram.com/hack0lution/"} target="_blank">
                    <FaInstagram className="scale-125 hover:text-white text-gray-300" />
                </Link>
                <Link href={"https://www.linkedin.com/in/hack0lution-iem-634090359?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"} target="_blank">
                    <FaLinkedin className=" hover:text-white text-gray-300" />
                </Link>
            </div>
        </div>
    )
}