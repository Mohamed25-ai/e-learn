
import { CategorieCardsProps } from "./categorycards.type";
import CoursesByCategoryId from "../../Cources/CoursesByCategoryId/CoursesByCategoryId";

export default function CategoriesCards({ categorie }: CategorieCardsProps) {
    return (
        <section className="w-full ">
            <header>
                <h1>{categorie.name}</h1>
            </header>
            <section className="">
                <CoursesByCategoryId key={categorie.id} categoryid={categorie.id} />
            </section>
        </section>
    )
}
