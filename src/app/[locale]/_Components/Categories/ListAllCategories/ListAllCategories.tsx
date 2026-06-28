import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTrendUp, faCode, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { ListAllCategoriesProps } from './listallcategories.types'
import { Link } from '@/i18n/navigation'

export default function ListAllCategories({ categorie }: ListAllCategoriesProps) {
    function splitCategoryName(name: string) {
        const index = name.indexOf("&")
        if (index == -1) {
            return [name.trim(), null]
        }
        return [name.slice(0, index).trim(), name.slice(index).trim()]
    }
    return (
        <>
            <header className='p-5'>
                <h2 className='text-foreground font-bold text-2xl'>All Categories</h2>
            </header>
            <div className='grid grid-cols-2 md:grid-cols-4 py-3 gap-4'>
                {categorie?.map((categorie) => {
                    const [firstLine, secondLine] = splitCategoryName(categorie.name);
                    return (
                        (
                            <Link href={`#${categorie.id}`}
                                key={categorie.id}
                                className='bg-white p-5 rounded-2xl border-2 border-border flex flex-col gap-4
                                            transition-all duration-200 hover:-translate-y-1
                                            hover:shadow-[0_6px_20px_rgba(73,187,189,0.12)] cursor-pointer'
                            >
                                {/* Icon / Thumbnail */}
                                <div>
                                    {categorie.thumbnailUrl != null
                                        ? <img
                                            src={categorie.thumbnailUrl}
                                            alt={categorie.name.trim()}
                                            className='w-14 h-14 rounded-2xl object-cover'
                                        />
                                        : <span className='w-14 h-14 rounded-2xl bg-(--primary-light) text-(--primary-color) flex items-center justify-center text-xl'>
                                            <FontAwesomeIcon icon={faCode} />
                                        </span>
                                    }
                                </div>

                                {/* Name + Hot badge */}
                                <div className='flex items-start justify-between gap-2'>
                                    <h3 className='text-foreground font-bold text-base leading-snug flex-1'>
                                        {firstLine}
                                        {secondLine && (
                                            <>
                                                <br />
                                                {secondLine}
                                            </>
                                        )}
                                    </h3>
                                    {/* {categorie.isHot && (
                                        <span className='flex items-center gap-1 text-xs font-semibold text-[var(--success)] bg-[var(--primary-light)] px-2 py-0.5 rounded-full whitespace-nowrap'>
                                            <FontAwesomeIcon icon={faArrowTrendUp} />
                                            Hot
                                        </span>
                                    )} */}
                                </div>
                                {/* Stats */}
                                <div className='flex flex-col gap-1.5'>
                                    <span className='text-sm text-(--text-secondary)'>
                                        courses
                                    </span>
                                    <span className='text-sm text-(--text-secondary) flex items-center gap-1.5'>
                                        <FontAwesomeIcon icon={faUserGroup} className='text-xs' />
                                        students
                                    </span>
                                </div>
                            </Link>
                        ))
                })}
            </div>
        </>)

}

