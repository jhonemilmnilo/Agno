"use client";

import { useState, useEffect, useRef } from "react";
import { useNews } from "../providers/NewsProvider";
import { useNewsForm } from "../hooks/useNewsForm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image as ImageIcon, X, Loader2, Newspaper, Info, Calendar } from "lucide-react";

export function AddNewsModal() {
    const { isAddModalOpen, setIsAddModalOpen, editingData, setEditingData } = useNews();
    const { handleSubmit, loading } = useNewsForm();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editingData?.imageUrl) {
            setImagePreview(editingData.imageUrl);
        } else {
            setImagePreview(null);
        }
    }, [editingData]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const categories = ["Announcement", "Local News", "Advisory", "Project Update", "Other"];

    const formatDateForInput = (dateString: string | undefined) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
    };

    return (
        <Dialog open={isAddModalOpen} onOpenChange={(open) => {
            setIsAddModalOpen(open);
            if (!open) {
                setEditingData(null);
                setImagePreview(null);
            }
        }}>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0f1117] border-slate-200 dark:border-[#2a3040] p-0 gap-0 shadow-2xl rounded-2xl">
                <DialogHeader className="p-8 pb-4 bg-slate-50/50 dark:bg-[#151b2b] sticky top-0 z-10 border-b border-slate-200 dark:border-[#2a3040]">
                    <div className="flex items-center space-x-3 mb-1">
                        <div className="p-2 bg-blue-600 rounded-lg">
                            <Newspaper className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {editingData ? "Edit News Article" : "Publish News Article"}
                            </DialogTitle>
                            <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium">
                                Keep the community informed with the latest local news and announcements.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Left Column: Article Logic */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 mb-2">
                                <Info className="w-4 h-4" />
                                <h3 className="text-sm font-bold uppercase tracking-wider">Article Information</h3>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-300 font-bold">Headline Title</Label>
                                <Input
                                    name="title"
                                    required
                                    defaultValue={editingData?.title}
                                    placeholder="e.g. Agno Suspends Classes During Typhoon"
                                    className="h-12 bg-slate-50 dark:bg-[#1a1f2e] border-slate-200 dark:border-[#2a3040] focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-700 dark:text-slate-300 font-bold">Category</Label>
                                    <Select name="category" defaultValue={editingData?.category || "Announcement"}>
                                        <SelectTrigger className="h-12 bg-slate-50 dark:bg-[#1a1f2e] border-slate-200 dark:border-[#2a3040]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white dark:bg-[#151b2b] border-slate-200 dark:border-[#2a3040]">
                                            {categories.map(cat => (
                                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700 dark:text-slate-300 font-bold">Author</Label>
                                    <Input
                                        name="author"
                                        defaultValue={editingData?.author || "Municipal Office"}
                                        placeholder="e.g. Mayor's Office"
                                        className="h-12 bg-slate-50 dark:bg-[#1a1f2e] border-slate-200 dark:border-[#2a3040]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-300 font-bold flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" /> Publish Date
                                </Label>
                                <Input
                                    type="datetime-local"
                                    name="publishDate"
                                    required
                                    defaultValue={formatDateForInput(editingData?.publishDate || new Date().toISOString())}
                                    className="h-12 bg-slate-50 dark:bg-[#1a1f2e] border-slate-200 dark:border-[#2a3040]"
                                />
                            </div>

                            <div className="space-y-2 flex-grow">
                                <Label className="text-slate-700 dark:text-slate-300 font-bold">Article Content</Label>
                                <Textarea
                                    name="content"
                                    required
                                    defaultValue={editingData?.content}
                                    placeholder="Write the full news story here..."
                                    className="min-h-[220px] bg-slate-50 dark:bg-[#1a1f2e] border-slate-200 dark:border-[#2a3040] resize-none"
                                />
                            </div>
                        </div>

                        {/* Right Column: Media */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 mb-2">
                                <ImageIcon className="w-4 h-4" />
                                <h3 className="text-sm font-bold uppercase tracking-wider">Featured Image</h3>
                            </div>

                            <div className="space-y-2">
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="group relative h-64 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 bg-slate-50 dark:bg-[#1a1f2e] transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center"
                                >
                                    {imagePreview ? (
                                        <>
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button type="button" variant="secondary" size="sm" className="font-bold">Change Image</Button>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-2 right-2 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setImagePreview(null);
                                                    if (fileInputRef.current) fileInputRef.current.value = "";
                                                }}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center text-slate-400 group-hover:text-blue-500 transition-colors">
                                            <ImageIcon className="w-10 h-10 mb-2" />
                                            <p className="text-sm font-bold uppercase tracking-wide">Upload Photo</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        name="imageFile"
                                        accept="image/*"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                    />
                                    {editingData?.imageUrl && imagePreview === editingData.imageUrl && (
                                        <input type="hidden" name="imageUrl" value={editingData.imageUrl} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="pt-8 border-t border-slate-200 dark:border-[#2a3040] gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setIsAddModalOpen(false)}
                            className="h-12 px-8 font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-12 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {loading ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Publishing...</>
                            ) : (
                                editingData ? "Update Article" : "Publish Article"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
