import Image from "next/image";
import { listAllCategories } from "@/services/categories/categories.service"
import { getLocale } from "next-intl/server";
import TopCategories from "../_Components/Home/TopCategories/TopCategories";
import FeaturedCourses from "../_Components/Home/FeaturedCourses/FeaturedCourses";
import { listAllCategoriesAction } from "@/actions/categories/categories.actions";
import HeroSection from "../_Components/Home/HeroSection/HeroSection";
import Testimonial from "../_Components/Home/Testimonial/Testimonial";
import StartLearning from "../_Components/Home/StartLearning/StartLearning";
import Footer from "../_Components/Layout/Footer/Footer";

export default async function page() {
  const locale=await getLocale();
  const categoriesForTopCategories = await listAllCategoriesAction(locale);
  const categoriesForFeaturedCourses = await listAllCategoriesAction(locale,undefined,4);
  
  return (
    <section className="mt-12">
      <HeroSection />
      <TopCategories categories={categoriesForTopCategories?.data} inLandingPage />
      <FeaturedCourses categories={categoriesForFeaturedCourses}/>
      <Testimonial />
      <StartLearning />
      <Footer/>
    </section>
  )
}
