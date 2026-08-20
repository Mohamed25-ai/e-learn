import { ListAllCategoriesProps } from './listallcategories.types'
import SecondaryCategorieCard from '../SecondaryCategorieCard/SecondaryCategorieCard'

export default function ListAllCategoriesBadges({ categories, inLandingPage }: ListAllCategoriesProps) {

    return (
        <>
            <header className='p-5'>
                <h2 className='text-foreground font-bold text-2xl'>All Categories</h2>
            </header>
            {!inLandingPage&&<div className='grid grid-cols-2 md:grid-cols-4 py-3 gap-4'>
                {categories?.data?.map((categorie) => {
                    return <SecondaryCategorieCard key={categorie.id} categorie={categorie} />
                })}
            </div>}
        </>)

}

