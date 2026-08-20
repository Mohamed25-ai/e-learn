import { CategoriesDataType } from "@/app/[locale]/(main)/(Categories)/categories/categories.type";

export interface CategorieCardsProps{
    categorie:CategoriesDataType,
    inCoursesPage?:boolean
    inCategoriesPage?:boolean
}