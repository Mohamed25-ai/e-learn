import CategoriesCards from "../CategoriesCards/CategoriesCards";
import { CategoriesListProps } from "./categorieslist.type";

export default async function CategoriesList({categories}:CategoriesListProps) {
    const {data}=categories;

    return (
        <>
        {data?.map((categorie)=> <CategoriesCards key={categorie.id} categorie={categorie} />)}
        </>
    )
}
