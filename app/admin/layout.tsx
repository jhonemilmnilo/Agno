import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LayoutDashboard, Newspaper, Utensils, BedDouble, Map, AlertTriangle, Briefcase, Settings, LogOut } from "lucide-react";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "ADMIN") {
        redirect("/auth/login");
    }

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-[#0f1117] text-slate-900 dark:text-slate-200 font-sans transition-colors duration-300">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-white dark:bg-[#1e2330] border-r border-slate-200 dark:border-[#2a3040] flex flex-col justify-between hidden md:flex transition-colors duration-300">
                <div>
                    {/* Logo & Branding */}
                    <div className="p-6 flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                            <Map className="text-teal-600 w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-slate-900 dark:text-slate-100 font-bold text-lg leading-tight">Agno Admin</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-xs">Municipality of Agno</p>
                        </div>
                    </div>

                    <nav className="px-4 space-y-1">
                        <Link href="/admin/dashboard" className="flex items-center space-x-3 px-3 py-2.5 bg-blue-600 text-white rounded-lg font-medium transition-colors">
                            <LayoutDashboard size={18} />
                            <span>Dashboard</span>
                        </Link>

                        <div className="pt-4 pb-2">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3">Content</p>
                        </div>

                        <Link href="/admin/news" className="flex items-center space-x-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-[#2a3040] rounded-lg transition-colors">
                            <Newspaper size={18} />
                            <span>News & Updates</span>
                        </Link>

                        <Link href="/admin/dining" className="flex items-center space-x-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-[#2a3040] rounded-lg transition-colors">
                            <Utensils size={18} />
                            <span>Kainan (Dining)</span>
                        </Link>

                        <Link href="/admin/stays" className="flex items-center space-x-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-[#2a3040] rounded-lg transition-colors">
                            <BedDouble size={18} />
                            <span>Tuluyan (Stay)</span>
                        </Link>

                        <Link href="/admin/tourism" className="flex items-center space-x-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-[#2a3040] rounded-lg transition-colors">
                            <Map size={18} />
                            <span>Tourism Spots</span>
                        </Link>

                        <div className="pt-4 pb-2">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3">Management</p>
                        </div>

                        <Link href="/admin/reports" className="flex items-center justify-between px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-[#2a3040] rounded-lg transition-colors">
                            <div className="flex items-center space-x-3">
                                <AlertTriangle size={18} />
                                <span>Public Reports</span>
                            </div>
                            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
                        </Link>

                        <Link href="/admin/jobs" className="flex items-center space-x-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-[#2a3040] rounded-lg transition-colors">
                            <Briefcase size={18} />
                            <span>Job Postings</span>
                        </Link>

                    </nav>
                </div>

                <div className="p-4 space-y-2">
                    <ThemeToggle />
                    <Link href="/admin/settings" className="flex items-center space-x-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-[#2a3040] rounded-lg transition-colors">
                        <Settings size={18} />
                        <span>Settings</span>
                    </Link>

                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-[#2a3040] flex items-center justify-between px-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                                {session.user?.name?.charAt(0) || "A"}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-slate-200 leading-none">{session.user?.name}</p>
                                {/* Normally this is a sign out button/link */}
                                <p className="text-xs text-slate-500 mt-1 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer transition-colors">Logout</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
