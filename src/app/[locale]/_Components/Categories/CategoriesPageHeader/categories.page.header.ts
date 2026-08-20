import { CategoriesType } from "@/app/[locale]/(main)/(Categories)/categories/categories.type"

export type CategoriesPageHeaderProps = {
    categories: CategoriesType,
    inCategoriesPage?: boolean,
    inHomePage?: boolean,
}