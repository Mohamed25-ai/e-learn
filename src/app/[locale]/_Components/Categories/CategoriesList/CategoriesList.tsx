import { Link } from "@/i18n/navigation";
import CategoriesCards from "../CategoriesCards/CategoriesCards";
import { CategoriesListProps } from "./categorieslist.type";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoriesOverview from "../CategoriesOverview/CategoriesOverview";
import { getLocale } from 'next-intl/server';
import ListAllCategoriesBadges from "../ListAllCategoriesBadges/ListAllCategoriesBadges";
export default async function CategoriesList({ categories, inLandingPage, inCoursesPage, inCategoriesPage }: CategoriesListProps) {
    const locale = await getLocale();
    const isRtl = locale === 'ar';

    return (
        <div dir={isRtl ? "rtl" : "ltr"}>
            <div className="px-5 mb-10">
                {/* <CategoriesOverview /> */}
                {/* {inCategoriesPage && <ListAllCategoriesBadges categories={categories} inLandingPage={inLandingPage} />} */}
            </div>
        </div>
    )
}
