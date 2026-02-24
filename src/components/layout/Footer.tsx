import Link from 'next/link';
import { Twitter, Github, Linkedin, Cpu } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
    return (
        <footer className="bg-[#0B0E14] border-t border-white/5 pt-24 pb-12 text-slate-400">
            <div className="container mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-5 gap-10 mb-20">
                <div className="col-span-2 space-y-6">

                    <Link href="/" className="flex items-center gap-2 group z-50 relative">

                        <Image src="/logo/light-logo.png" alt="nodeMania" width={250} height={60} className="object-contain " />

                    </Link>
                    <p className="text-slate-500 mb-6 max-w-sm text-sm leading-relaxed font-medium">
                        Premium Node.js hosting infrastructure aimed at scalability, security, and developer experience.
                        Deploy in seconds, scale to millions.
                    </p>

                    <div className="flex gap-4 mb-6">
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all"><Github className="w-5 h-5" /></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all"><Linkedin className="w-5 h-5" /></a>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full w-fit shadow-lg shadow-emerald-500/5">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        All Systems Operational
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6">Hosting</h4>
                    <ul className="space-y-4 text-sm font-medium">
                        <li><Link href="#" className="hover:text-primary transition-colors">Shared Node</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">VPS Cloud</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Dedicated</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Kubernetes</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">WordPress</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6">Services</h4>
                    <ul className="space-y-4 text-sm font-medium">
                        <li><Link href="/web-security/ssl-certificate" className="hover:text-primary transition-colors">SSL Certificates</Link></li>
                        <li><Link href="/web-security/360-Monitoring" className="hover:text-primary transition-colors">360 Monitoring</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">NordVPN</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">SocialBee</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">E-mail Hosting</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6">Company</h4>
                    <ul className="space-y-4 text-sm font-medium">
                        <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Legal</Link></li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 border-t border-white/5 pt-8 text-center text-slate-600 text-sm font-medium flex flex-col md:flex-row justify-between items-center gap-4">
                <span>&copy; 2026 nodeMania Inc. All rights reserved.</span>
                <span className="flex items-center gap-6">
                    <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                    <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-md border border-white/10 shadow-sm hover:border-white/20 transition-all cursor-pointer text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                        <span>English (US)</span>
                    </div>
                </span>
            </div>
        </footer>
    )
}
