import CategoriesList from "../../Categories/CategoriesList/CategoriesList";
import CategoriesPageHeader from "../../Categories/CategoriesPageHeader/CategoriesPageHeader";
import { TopCategoriesProps } from "../home.types";
import TopCategoriesSwiper from "./TopCategoriesSwiper/TopCategoriesSwiper";

export default function TopCategories({ categories }: TopCategoriesProps) {
    return (
        <section className="py-6 px-5">
            <CategoriesPageHeader inHomePage categories={categories} />
            <TopCategoriesSwiper categories={categories} />
        </section>
    );
}