'use client';

const services = [
    { icon: '🔒', title: 'SSL Certificates', desc: 'Secure your user data and boost SEO rankings with our premium SSL options.' },
    { icon: '📧', title: 'Email Solutions', desc: 'Professional business email addresses with spam protection and webmail.' },
    { icon: '🛡️', title: 'NordVPN', desc: 'Secure your internet connection and protect your privacy online.' },
    { icon: '🔍', title: 'SiteLock', desc: 'Automatic malware scanning and removal to keep your site safe.' },
    { icon: '💾', title: 'CodeGuard', desc: 'Daily automated backups and one-click restore functionality.' },
    { icon: '📱', title: 'SocialBee', desc: 'Automate your social media posting and management effortlessly.' },
    { icon: '☁️', title: 'Cloud VPS', desc: 'Scalable virtual private servers with full root access.' },
    { icon: '⚡', title: 'WordPress', desc: 'Optimized managed WordPress hosting with auto-updates.' },
];

export function SolutionsSection() {
    return (
        <section className="py-20 bg-slate-50 w-full">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Comprehensive Solutions</h2>
                    <p className="text-slate-600">
                        Everything you need to build, secure, and grow your online presence.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className="group bg-white p-6 rounded-lg border border-slate-200 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-primary/50 cursor-pointer"
                        >
                            <div className="w-12 h-12 bg-secondary text-primary rounded-lg flex items-center justify-center text-2xl mb-4 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                                <span className="group-hover:scale-110 transition-transform duration-300 group-hover:brightness-0 group-hover:invert">{service.icon}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                            <p className="text-sm text-slate-600">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
