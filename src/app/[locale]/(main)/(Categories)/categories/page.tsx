import { listAllCategories } from "@/services/categories/categories.service"
import CategoriesList from "../../../_Components/Categories/CategoriesList/CategoriesList";
import { CategoriesType } from "./categories.type";
import { getLocale } from "next-intl/server";

export default async function page() {
    const locale = await getLocale();
    const categories = await listAllCategories(locale);
    return (
        <>
            <CategoriesList categories={categories.data}  />
        </>
    )
}
