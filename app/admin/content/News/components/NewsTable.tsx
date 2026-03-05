"use client";

import { useNews } from "../providers/NewsProvider";
import { deleteNews, toggleNewsStatus } from "@/app/admin/actions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Edit2, Trash2, Calendar, Newspaper, User } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useState } from "react";

export function NewsTable() {
    const { newsData, searchTerm, setEditingData, setIsAddModalOpen, selectedCategory } = useNews();
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [togglingId, setTogglingId] = useState<string | null>(null);

    const filteredData = newsData.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleEdit = (item: any) => {
        setEditingData(item);
        setIsAddModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this article?")) return;
        setDeletingId(id);
        try {
            await deleteNews(id);
            toast.success("News deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete news.");
        } finally {
            setDeletingId(null);
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        setTogglingId(id);
        try {
            await toggleNewsStatus(id, !currentStatus);
            toast.success(`News ${!currentStatus ? 'published' : 'unpublished'} successfully!`);
        } catch (error) {
            toast.error("Failed to update status.");
        } finally {
            setTogglingId(null);
        }
    };

    if (filteredData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center border-t border-slate-200 dark:border-[#2a3040]">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <Newspaper className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Articles Found</h3>
                <p className="text-slate-500 max-w-sm">
                    No news articles match your search criteria. Try adjusting your filters or publish a new article.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50/50 dark:bg-[#1a1f2e] hover:bg-slate-50/50 dark:hover:bg-[#1a1f2e] border-y border-slate-200 dark:border-[#2a3040]">
                        <TableHead className="w-[300px] font-bold text-slate-900 dark:text-slate-100 h-12">Article</TableHead>
                        <TableHead className="font-bold text-slate-900 dark:text-slate-100">Category</TableHead>
                        <TableHead className="font-bold text-slate-900 dark:text-slate-100">Author</TableHead>
                        <TableHead className="font-bold text-slate-900 dark:text-slate-100">Publish Date</TableHead>
                        <TableHead className="font-bold text-slate-900 dark:text-slate-100 text-center">Published</TableHead>
                        <TableHead className="text-right font-bold text-slate-900 dark:text-slate-100">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.map((item) => (
                        <TableRow key={item.id} className="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors border-b border-slate-200 dark:border-[#2a3040]">
                            <TableCell className="font-medium">
                                <div className="flex flex-col space-y-1">
                                    <span className="text-slate-900 dark:text-white font-bold leading-tight">{item.title}</span>
                                    <span className="text-xs text-slate-500 line-clamp-1">{item.content}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                                    {item.category}
                                </span>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                                    <User className="w-3.5 h-3.5 mr-1" />
                                    {item.author || "Admin"}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                                    <Calendar className="w-3.5 h-3.5 mr-1" />
                                    {format(new Date(item.publishDate), "MMM d, yyyy")}
                                </div>
                            </TableCell>
                            <TableCell className="text-center">
                                <Switch
                                    checked={item.isPublished}
                                    onCheckedChange={() => handleToggleStatus(item.id, item.isPublished)}
                                    disabled={togglingId === item.id}
                                    className="data-[state=checked]:bg-blue-600"
                                />
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleEdit(item)}
                                                    className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/50"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Edit News</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(item.id)}
                                                    disabled={deletingId === item.id}
                                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Delete News</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
