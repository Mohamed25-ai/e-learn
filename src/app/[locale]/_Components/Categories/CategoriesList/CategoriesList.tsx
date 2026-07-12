import { Link } from "@/i18n/navigation";
import CategoriesCards from "../CategoriesCards/CategoriesCards";
import { CategoriesListProps } from "./categorieslist.type";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoriesOverview from "../CategoriesOverview/CategoriesOverview";
import ListAllCategories from "../ListAllCategoriesBadges/ListAllCategories";
import { getLocale } from 'next-intl/server';
export default async function CategoriesList({ categories,inLandingPage }: CategoriesListProps) {
    const locale = await getLocale();
    const isRtl = locale === 'ar';
    
    return (
        <div dir={isRtl ? "rtl" : "ltr"}>
            <header className="p-5 flex justify-between items-center">
                <div>
                    <h2 className="text-4xl font-bold leading-tight text-foreground">
                        Explore Categories
                    </h2>
                    <p className="mt-1.5 text-sm text-(--text-secondary)">
                        Discover courses across every field of expertise
                    </p>
                </div>

                <Link
                    href={inLandingPage?"/categories":"/courses"}
                    className="MAIN_BUTTON gap-2 whitespace-nowrap group"
                >
                    {inLandingPage?"Browse All Categories":"Browse All Courses"}
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                </Link>
            </header>
            <div className="px-5">
                <CategoriesOverview />
                <ListAllCategories categories={categories} inLandingPage={inLandingPage} />
            </div>
            {!inLandingPage&&categories?.data?.map((categorie) => <CategoriesCards key={categorie?.id} categorie={categorie} />)}
        </div>
    )
}
