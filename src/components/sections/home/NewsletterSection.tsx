'use client';

export function NewsletterSection() {
    return (
        <section className="py-20 w-full">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-primary rounded-2xl p-16 text-center shadow-2xl">
                    <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
                    <p className="text-secondary mb-8 max-w-2xl mx-auto">
                        Subscribe to our newsletter for the latest hosting tips and exclusive offers.
                    </p>
                    <div className="flex gap-2 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg border-0 outline-none text-slate-900"
                        />
                        <button className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
