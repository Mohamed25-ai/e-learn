import { listAllCategories } from "@/services/categories/categories.service"
import CategoriesList from "../../../_Components/Categories/CategoriesList/CategoriesList";
import { getLocale } from "next-intl/server";
import CoursePageHeader from "@/app/[locale]/_Components/Courses/CoursePageHeader/CoursePageHeader";
import CategoriesCards from "@/app/[locale]/_Components/Categories/CategoriesCards/CategoriesCards";
import { CategoriesDataType } from "../../(Categories)/categories/categories.type";

export default async function page() {
    const locale = await getLocale();
    const categories = await listAllCategories(locale);
    return (
        <>
            <CoursePageHeader />
            {categories?.data?.data?.map((categorie: CategoriesDataType) => <CategoriesCards key={categorie?.id}
                categorie={categorie} inCoursesPage />)}
        </>
    )
}