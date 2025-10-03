"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryFilter = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    
    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getAllCategories();
            categoryList && setCategories(categoryList as ICategory[])
        }
        getCategories();
    }, [])

    const onSelectCategory = (category: string) => { 
        let newUrl = '';
        if (categories && category !== 'All') {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'category',
                value: category
            })
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['category']
            })
        }
        router.push(newUrl, { scroll: false });
    }
    
    return (
        <Select onValueChange={(value: string) => onSelectCategory(value)}>
            <SelectTrigger className="select-field h-[54px] rounded-full bg-white border-2 border-gray-200 px-6 hover:border-gray-300 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 transition-all">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                <SelectItem 
                    value="All" 
                    className="select-item p-regular-14 rounded-lg hover:bg-primary-50 cursor-pointer py-3 transition-colors"
                >
                    All
                </SelectItem>
                {categories.map((category) => (
                    <SelectItem 
                        value={category.name} 
                        key={category._id} 
                        className="select-item p-regular-14 rounded-lg hover:bg-primary-50 cursor-pointer py-3 transition-colors"
                    >
                        {category.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default CategoryFilter