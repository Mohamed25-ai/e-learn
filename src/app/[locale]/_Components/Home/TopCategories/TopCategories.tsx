import CategoriesList from "../../Categories/CategoriesList/CategoriesList";
import ListAllCategories from "../../Categories/ListAllCategoriesBadges/ListAllCategories";
import { TopCategoriesProps } from "../home.types";
import TopCategoriesSwiper from "./TopCategoriesSwiper/TopCategoriesSwiper";

export default function TopCategories({ categories,inLandingPage}: TopCategoriesProps) {
    console.log("object",categories)
    return (
        <section>
            <div className="categories">
                <CategoriesList categories={categories}  inLandingPage={inLandingPage} />
                <TopCategoriesSwiper categories={categories} />
            </div>
        </section>
    )
}
