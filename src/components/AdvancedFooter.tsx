import Image from 'next/image';
import Link from 'next/link';

const AdvancedFooter: React.FC = () => {
    return (
        <footer className="bg-[#0a0a0a] text-white px-4 sm:px-6 py-8 w-full border-t border-gray-700">
            <div className="max-w-6xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                    {/* Organised By Section */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                        <h3 className="text-lg font-semibold mb-4 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-[2px] after:bg-white">
                            Organised By
                        </h3>
                        <div className="flex items-center gap-4 mt-5">
                            <div className="rounded-full p-1 flex items-center justify-center">
                                <Image
                                    src="/iem.png"
                                    alt="Hack{0}Lution Logo"
                                    width={60}
                                    height={60}
                                />
                            </div>
                            <p className="text-sm leading-relaxed">
                                Institute of Engineering and Management
                            </p>
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold mb-4 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-[2px] after:bg-white">
                            Links
                        </h3>
                        <ul className="space-y-3 text-sm mt-6">
                            <li>
                                <Link href="/" className="hover:underline hover:text-gray-300 transition-colors duration-200">
                                    HOME
                                </Link>
                            </li>
                            <li>
                                <Link href="#about" className="hover:underline hover:text-gray-300 transition-colors duration-200">
                                    ABOUT
                                </Link>
                            </li>
                            <li>
                                <Link href="/rules" className="hover:underline hover:text-gray-300 transition-colors duration-200">
                                    RULES
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="hover:underline hover:text-gray-300 transition-colors duration-200">
                                    LOGIN
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Socials Section */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold mb-4 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-[2px] after:bg-white">
                            Socials
                        </h3>
                        <ul className="space-y-3 text-sm mt-6">
                            <li>
                                <Link
                                    href="https://www.instagram.com/hack0lution/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline hover:text-gray-300 transition-colors duration-200"
                                >
                                    Instagram
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://www.linkedin.com/in/hack0lution-iem-634090359?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline hover:text-gray-300 transition-colors duration-200"
                                >
                                    LinkedIn
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://twitter.com/hackolution"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline hover:text-gray-300 transition-colors duration-200"
                                >
                                    Twitter
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://discord.gg/hjxtZZXsD4"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline hover:text-gray-300 transition-colors duration-200"
                                >
                                    Discord
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Map Section */}
                    <div className="w-full flex flex-col items-center lg:items-start lg:w-[300px] h-auto rounded-lg mx-auto lg:mx-0">
                        <h3 className="text-lg font-semibold mb-2 text-center lg:text-left">
                            IEM Ashram Campus
                        </h3>
                        <div className="w-full sm:w-[350px] h-[200px] rounded-lg overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.2394980853637!2d88.42711777589507!3d22.570144133059095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275b23d77ee27%3A0xcd498ec0d7bf6f54!2sInstitute%20of%20Engineering%20and%20Management%20(Ashram%20Building)!5e0!3m2!1sen!2sin!4v1746883359875!5m2!1sen!2sin"
                                className="border-0 w-full h-full"
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="IEM Ashram Campus"
                            />
                        </div>
                    </div>

                </div>

                {/* Copyright Section */}
                  <div className="text-center mt-10 pt-5 border-t border-gray-700 text-sm">
                <p className='text-lg'>© {new Date().getFullYear()} HACK&#123;<span className="text-green-400">0</span>&#125;LUTION. All rights reserved.</p>
            </div>
            </div>
        </footer>
    );
};

export default AdvancedFooter;