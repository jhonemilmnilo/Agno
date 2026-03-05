"use client";

import { useResident } from "../providers";
import { Users, User, UserCheck } from "lucide-react";

export function ResidentCards() {
    const { residents } = useResident();

    const totalResidents = residents.length;
    const totalMale = residents.filter(r => r.gender === "Male").length;
    const totalFemale = residents.filter(r => r.gender === "Female").length;

    const cards = [
        {
            title: "Total Residents",
            value: totalResidents.toString(),
            icon: <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            bgColor: "bg-blue-100 dark:bg-blue-500/20"
        },
        {
            title: "Male",
            value: totalMale.toString(),
            icon: <User className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
            bgColor: "bg-indigo-100 dark:bg-indigo-500/20"
        },
        {
            title: "Female",
            value: totalFemale.toString(),
            icon: <UserCheck className="w-6 h-6 text-fuchsia-600 dark:text-fuchsia-400" />,
            bgColor: "bg-fuchsia-100 dark:bg-fuchsia-500/20"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, index) => (
                <div key={index} className="bg-white dark:bg-[#151b2b] p-6 rounded-2xl border border-slate-200 dark:border-[#2a3040] shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1">
                    <div className={`p-4 rounded-xl ${card.bgColor}`}>
                        {card.icon}
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.title}</h3>
                        <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{card.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
