'use client';
import { Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-nav-bg text-nav-text font-body mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
   
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="font-semibold mb-2">About Us</h3>
                        <a href="/about" className="block hover:text-button transition-colors">
                            W&A Experiences
                        </a>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Policies</h3>
                        <a href="/policies" className="block hover:text-button transition-colors">
                            Refund and Refund Policy
                        </a>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Contact</h3>
                        <a href="/contact" className="block hover:text-button transition-colors">
                            Mendoza, Argentina
                        </a>
                        <a href="mailto:info@wine&andes.com" className="block hover:text-button transition-colors">
                            info@wine&andes.com
                        </a>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Reviews</h3>
                        <div className="flex space-x-4 mt-2">
                            {[Instagram, Twitter, Facebook].map((Icon, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="text-button hover:text-button-text transition-colors"
                                    aria-label="Social Icon"
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="border-t border-gray-500 w-11/12 mx-auto mb-4"></div>
                <div className="flex flex-col items-center text-sm text-gray-400 space-y-2">
                    <div className="flex justify-center items-center gap-2 md:gap-4">
                        <a href="/privacy" className="hover:text-button transition-colors">Privacy Policy</a>
                        <span className="text-gray-400">|</span>
                        <a href="/terms" className="hover:text-button transition-colors">Terms of Service</a>
                        <span className="text-gray-400">|</span>
                        <a href="/accessibility" className="hover:text-button transition-colors">Accessibility Statement</a>
                    </div>

                    <div>2025. All Rights Reserved.</div>
                </div>

            </div>
        </footer>
    );
}
