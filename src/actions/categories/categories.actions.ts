'use server'

import { listAllCategories } from "@/services/categories/categories.service"

export async function listAllCategoriesAction(locale?:string) {
    return await listAllCategories(locale);
}