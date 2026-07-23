import CategoriesList from "../../Categories/CategoriesList/CategoriesList";
import { TopCategoriesProps } from "../home.types";
import TopCategoriesSwiper from "./TopCategoriesSwiper/TopCategoriesSwiper";

export default function TopCategories({ categories, inLandingPage }: TopCategoriesProps) {
    return (
        <section className="py-6 px-5">
            <CategoriesList categories={categories} inLandingPage={inLandingPage} />
            <TopCategoriesSwiper categories={categories} />
        </section>
    );
}