import Image from "next/image";
import { listAllCategories } from "@/services/categories/categories.service"
import { CategoriesType } from "../(main)/(Categories)/categories/categories.type";
import SwiperCourses from "../_Components/Cources/SwiperCourses/SwiperCourses";
import { getLocale } from "next-intl/server";
import LandingPage from "../_Components/Home/LandingPage/LandingPage";
import TopCategories from "../_Components/Home/TopCategories/TopCategories";

export default async function page() {
  const locale=await getLocale();
  
  const categories = await listAllCategories(locale);
  return (
    <section className="mt-12">
      <LandingPage />
      <TopCategories categories={categories?.data} inLandingPage />
      {/* <CategoriesList categories={categories} /> */}
      {/* {categories?.data?.map((categorie)=><SwiperCourses key={categorie?.id} name={categorie?.name} id={categorie?.id} />)} */}
      {/* <MainSwiper /> */}
    </section>
  )
}
