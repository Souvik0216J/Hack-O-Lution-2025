import React from 'react'
import { FaInstagram } from 'react-icons/fa'
// import { DiscordIcon } from './icons'
// import { siteConfig, SiteConfig } from '@/config/site'
import Link from 'next/link'

export default function Footer() {
    return (
        <div className="h-[100px] bg-black/70 backdrop-blur-sm text-white flex justify-around items-center">
            <div className="text-xl">&#169; HACK&#123;0&#125;LUTION</div>

            <div className="flex justify-center items-center gap-4 ">
                {/* <Link href={siteConfig.links.instagram} target="_blank">
                    <FaInstagram className="scale-125 hover:text-white text-gray-300" />
                </Link>
                <Link href={siteConfig.links.discord} target="_blank">
                    <DiscordIcon className=" hover:text-white text-gray-300" />
                </Link> */}
            </div>
        </div>
    )
}