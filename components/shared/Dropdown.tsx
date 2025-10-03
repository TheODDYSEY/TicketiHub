'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { createCategory, getAllCategories } from "@/lib/actions/category.actions";

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState('');
  
  const handleAddCategory = () => {
    createCategory({
      categoryName: newCategory.trim()
    })
    .then((category) => {
      setCategories((prevState) => [...prevState, category])
    })
  }

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      categoryList && setCategories(categoryList as ICategory[])
    }
    getCategories();
  }, [])

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field h-[55px] rounded-full bg-gray-50 border-0 px-6 focus:ring-2 focus:ring-primary-200 transition-all">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent className="rounded-xl border-gray-200 shadow-lg">
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="select-item p-regular-14 rounded-lg hover:bg-primary-50 cursor-pointer py-3 transition-colors"
            >
              {category.name}
            </SelectItem>
          ))}
        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500 transition-colors cursor-pointer font-medium mt-2 border-t border-gray-100">
            Add New Category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold text-gray-900">New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input 
                  type="text" 
                  placeholder="Category name" 
                  className="input-field mt-3 h-12 rounded-xl border-2 focus:ring-2 focus:ring-primary-200"
                  onChange={(e) => setNewCategory(e.target.value)} 
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-xl border-2 hover:bg-gray-50 font-semibold">Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => startTransition(handleAddCategory)}
                className="rounded-xl bg-primary-600 hover:bg-primary-700 font-semibold shadow-lg transition-all"
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;