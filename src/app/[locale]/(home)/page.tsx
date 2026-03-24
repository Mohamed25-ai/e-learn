import Image from "next/image";
import { listAllCategories } from "@/services/categories/categories.service"
import { CategoriesType } from "../(main)/(Categories)/categories/categories.type";
import SwiperCourses from "../_Components/Cources/SwiperCourses/SwiperCourses";

export default async function page() {
  const categories: CategoriesType = await listAllCategories();
  console.log(categories);
  return (
    <>
      {/* <CategoriesList categories={categories} /> */}
      {categories?.data?.map((categorie)=><SwiperCourses key={categorie?.id} name={categorie?.name} id={categorie?.id} />)}
      
      {/* <MainSwiper /> */}
    </>
  )
}
