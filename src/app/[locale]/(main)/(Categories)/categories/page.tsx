import { listAllCategories } from "@/services/categories/categories.service"
import CategoriesList from "../../../_Components/Categories/CategoriesList/CategoriesList";
import { CategoriesDataType, CategoriesType } from "./categories.type";
import { getLocale } from "next-intl/server";
import CategoriesPageHeader from "@/app/[locale]/_Components/Categories/CategoriesPageHeader/CategoriesPageHeader";
import MainCategoryCard from "@/app/[locale]/_Components/Categories/MainCategoryCard/MainCategoryCard";

export default async function page() {
    const locale = await getLocale();
    const categories = await listAllCategories(locale);
    console.log("categories", categories)
    return (
        <>
            <CategoriesPageHeader categories={categories?.data} inCategoriesPage />
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-5 py-5">
                {categories?.data?.data.map((categorie: CategoriesDataType) => (
                    <MainCategoryCard categorie={categorie} key={categorie?.id} />
                ))}
            </section>
        </>
    )
}
