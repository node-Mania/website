import Link from "next/link";
import { Folder, ChevronRight } from "lucide-react";
import type { WPCategory } from "@/lib/types/wordpress.types";

interface CategoryListProps {
    categories: WPCategory[];
}

export function CategoryList({ categories }: CategoryListProps) {
    return (
        <section className="py-20 bg-slate-50/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                            <Folder className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-800">Browse by Category</h2>
                            <p className="text-slate-500 mt-1">Explore articles by topic to find what you need.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/category/${category.slug}`}
                                className="group flex items-center justify-between p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                        <Folder className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                            {category.name}
                                        </h3>
                                        {category.count !== undefined && (
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                {category.count} {category.count === 1 ? 'Article' : 'Articles'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:translate-x-1">
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {categories.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                            <Folder className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-800">No categories found</h3>
                            <p className="text-slate-500 mt-2">Check back later for new content.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
