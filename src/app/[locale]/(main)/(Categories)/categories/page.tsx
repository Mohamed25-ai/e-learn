import { listAllCategories } from "@/services/categories/categories.service"
import CategoriesList from "../../../_Components/Categories/CategoriesList/CategoriesList";
import { CategoriesType } from "./categories.type";

export default async function page() {
    const categories:CategoriesType = await listAllCategories();
    return (
        <>
            <CategoriesList categories={categories}  />
        </>
    )
}
