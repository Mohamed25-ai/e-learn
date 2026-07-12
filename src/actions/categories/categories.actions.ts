'use server'

import { listAllCategories } from "@/services/categories/categories.service"

export async function listAllCategoriesAction(locale?:string,PageNumber?:number,PageSize?:number,Search?:string) {
    return await listAllCategories(locale,PageNumber,PageSize,Search);
}