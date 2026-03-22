'use server'

import { listAllCategories } from "@/services/categories/categories.service"

export async function listAllCategoriesAction() {
    return await listAllCategories();
}