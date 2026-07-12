import Image from "next/image";
import { listAllCategories } from "@/services/categories/categories.service"
import { CategoriesType } from "../(main)/(Categories)/categories/categories.type";
import { getLocale } from "next-intl/server";
import LandingPage from "../_Components/Home/LandingPage/LandingPage";
import TopCategories from "../_Components/Home/TopCategories/TopCategories";
import FeaturedCourses from "../_Components/Home/FeaturedCourses/FeaturedCourses";
import { listAllCategoriesAction } from "@/actions/categories/categories.actions";

export default async function page() {
  const locale=await getLocale();
  const categoriesForTopCategories = await listAllCategoriesAction(locale);
  const categoriesForFeaturedCourses = await listAllCategoriesAction(locale,undefined,4);
  
  return (
    <section className="mt-12">
      <LandingPage />
      <TopCategories categories={categoriesForTopCategories?.data} inLandingPage />
      <FeaturedCourses categories={categoriesForFeaturedCourses}/>

    </section>
  )
}
