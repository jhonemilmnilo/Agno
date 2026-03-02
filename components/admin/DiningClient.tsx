"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal, MapPin, Utensils, Info, Phone, Store, Map as MapIcon } from "lucide-react";
import { addDining } from "@/app/admin/actions";
import { motion, AnimatePresence } from "framer-motion";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DiningClient({ diningData }: { diningData: any[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Framer motion variants for premium feel
    const containerVariants: import("framer-motion").Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: [0.25, 1, 0.5, 1], // Custom spring-like cubic bezier
                staggerChildren: 0.05
            }
        },
        exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };

    const filteredData = diningData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const res = await addDining(data);
        if (res.success) {
            setIsOpen(false);
        } else {
            alert("Failed to add dining.");
        }
        setLoading(false);
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">Kainan (Dining) Management</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Manage all local restaurants and eateries in Agno.</p>
                </motion.div>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 px-6">
                                <Plus size={16} className="mr-2" />
                                Add New Kainan
                            </Button>
                        </motion.div>
                    </DialogTrigger>

                    <DialogContent className="p-0 bg-transparent border-none max-w-2xl overflow-hidden shadow-2xl shadow-blue-900/20">
                        <AnimatePresence mode="wait">
                            {isOpen && (
                                <motion.div
                                    className="bg-white dark:bg-[#1e2330] rounded-2xl border border-slate-200 dark:border-[#2a3040] w-full flex flex-col max-h-[90vh] shadow-xl"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <DialogHeader className="p-6 border-b border-slate-200 dark:border-[#2a3040] bg-slate-50/80 dark:bg-[#1e2330]/80 backdrop-blur-xl shrink-0">
                                        <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                                            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center mr-3">
                                                <Store className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            Create New Dining Profile
                                        </DialogTitle>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 pl-13">Fill in the details to list a new restaurant in the system.</p>
                                    </DialogHeader>

                                    <div className="p-6 overflow-y-auto">
                                        <form id="diningForm" onSubmit={handleSubmit} className="space-y-6">

                                            {/* Section 1: Basic Info */}
                                            <motion.div variants={itemVariants} className="space-y-4">
                                                <div className="flex items-center space-x-2 text-blue-400 mb-2">
                                                    <Info className="w-4 h-4" />
                                                    <h4 className="text-sm font-semibold uppercase tracking-wider">Basic Information</h4>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="name" className="text-slate-300">Restaurant Name</Label>
                                                        <Input id="name" name="name" required className="bg-[#0f1117] border-[#2a3040] text-white focus:border-blue-500 transition-colors" placeholder="e.g. Agno Seafood" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="cuisineType" className="text-slate-300">Cuisine Type</Label>
                                                        <div className="relative">
                                                            <Utensils className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                            <Input id="cuisineType" name="cuisineType" className="bg-[#0f1117] border-[#2a3040] pl-10 text-white focus:border-blue-500 transition-colors" placeholder="Filipino, Seafood..." />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="description" className="text-slate-300">Description</Label>
                                                    <Textarea id="description" name="description" className="bg-[#0f1117] border-[#2a3040] text-white min-h-[100px] focus:border-blue-500" placeholder="Tell us what makes this place special..." />
                                                </div>
                                            </motion.div>

                                            {/* Section 2: Location */}
                                            <motion.div variants={itemVariants} className="space-y-4 pt-4 border-t border-[#2a3040]">
                                                <div className="flex items-center space-x-2 text-emerald-400 mb-2">
                                                    <MapIcon className="w-4 h-4" />
                                                    <h4 className="text-sm font-semibold uppercase tracking-wider">Location Setup</h4>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="address" className="text-slate-300">Complete Address</Label>
                                                    <div className="relative">
                                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                        <Input id="address" name="address" required className="bg-[#0f1117] border-[#2a3040] pl-10 text-white focus:border-blue-500" placeholder="Street, Barangay, Agno" />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="latitude" className="text-slate-300">Latitude (Optional)</Label>
                                                        <Input id="latitude" name="latitude" type="number" step="any" className="bg-[#0f1117] border-[#2a3040] text-slate-400" placeholder="16.123..." />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="longitude" className="text-slate-300">Longitude (Optional)</Label>
                                                        <Input id="longitude" name="longitude" type="number" step="any" className="bg-[#0f1117] border-[#2a3040] text-slate-400" placeholder="119.876..." />
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Section 3: Contact */}
                                            <motion.div variants={itemVariants} className="space-y-4 pt-4 border-t border-[#2a3040]">
                                                <div className="flex items-center space-x-2 text-orange-400 mb-2">
                                                    <Phone className="w-4 h-4" />
                                                    <h4 className="text-sm font-semibold uppercase tracking-wider">Contact & Hours</h4>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="openingHours" className="text-slate-300">Operating Hours</Label>
                                                        <Input id="openingHours" name="openingHours" className="bg-[#0f1117] border-[#2a3040] text-white" placeholder="8:00 AM - 10:00 PM" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="contactNumber" className="text-slate-300">Contact Number</Label>
                                                        <Input id="contactNumber" name="contactNumber" className="bg-[#0f1117] border-[#2a3040] text-white" placeholder="0912 345..." />
                                                    </div>
                                                </div>
                                            </motion.div>

                                        </form>
                                    </div>

                                    {/* Footer Actions */}
                                    <motion.div variants={itemVariants} className="p-4 border-t border-slate-200 dark:border-[#2a3040] bg-slate-50 dark:bg-[#1e2330] shrink-0 flex justify-end gap-3">
                                        <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#2a3040]">
                                            Cancel
                                        </Button>
                                        <Button type="submit" form="diningForm" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
                                            {loading ? "Creating..." : "Save Restaurant"}
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Main Table Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-white dark:bg-[#1e2330] border border-slate-200 dark:border-[#2a3040] rounded-xl overflow-hidden flex flex-col shadow-xl"
            >
                <div className="p-4 border-b border-slate-200 dark:border-[#2a3040] flex items-center justify-between bg-white dark:bg-[#1e2330]">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                        <Input
                            placeholder="Search restaurants..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 bg-slate-50 dark:bg-[#0f1117] border-slate-200 dark:border-[#2a3040] text-slate-900 dark:text-white placeholder:text-slate-500 w-full focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-50 dark:bg-[#0f1117]/50">
                            <TableRow className="border-slate-200 dark:border-[#2a3040] hover:bg-transparent">
                                <TableHead className="text-slate-600 dark:text-slate-400 font-medium h-12">Name</TableHead>
                                <TableHead className="text-slate-600 dark:text-slate-400 font-medium h-12">Cuisine</TableHead>
                                <TableHead className="text-slate-600 dark:text-slate-400 font-medium h-12">Location</TableHead>
                                <TableHead className="text-slate-600 dark:text-slate-400 font-medium h-12">Status</TableHead>
                                <TableHead className="text-slate-600 dark:text-slate-400 font-medium text-right h-12">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.length === 0 ? (
                                <TableRow className="border-slate-200 dark:border-[#2a3040]">
                                    <TableCell colSpan={5} className="text-center py-16 text-slate-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <Store className="w-12 h-12 text-slate-400 dark:text-slate-600 mb-3 opacity-50" />
                                            <p>No dining places found.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredData.map((item, index) => (
                                    <motion.tr
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        key={item.id}
                                        className="border-slate-200 dark:border-[#2a3040] hover:bg-slate-50 dark:hover:bg-[#2a3040]/50 transition-colors group"
                                    >
                                        <TableCell className="font-medium text-slate-900 dark:text-slate-200 py-4">
                                            <div>
                                                <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.name}</span>
                                                {item.openingHours && (
                                                    <span className="block text-xs text-slate-500 font-normal mt-1 flex items-center">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                                                        {item.openingHours}
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-400 py-4">
                                            {item.cuisineType ? (
                                                <Badge variant="outline" className="border-slate-600/50 bg-slate-800/50 text-slate-300 font-normal shadow-sm">
                                                    {item.cuisineType}
                                                </Badge>
                                            ) : (
                                                <span className="text-slate-600">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-slate-400 max-w-[200px] truncate py-4">
                                            <div className="flex items-start text-sm mt-1">
                                                <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-500 shrink-0 mt-0.5" />
                                                <span className="truncate">{item.address}</span>
                                            </div>
                                            {(item.latitude && item.longitude) && (
                                                <span className="block text-[10px] text-slate-500 font-mono mt-1 ml-5">
                                                    {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell className="py-4">
                                            {item.isPublished ? (
                                                <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-0 font-medium border-emerald-500/20 shadow-sm shadow-emerald-500/10">Active</Badge>
                                            ) : (
                                                <Badge variant="secondary" className="bg-slate-800 text-slate-400 border-0 hover:bg-slate-700">Hidden</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right py-4">
                                            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white hover:bg-[#343b4f] transition-all">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </motion.tr>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </motion.div>
        </div>
    );
}
