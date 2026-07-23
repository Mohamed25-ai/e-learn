"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CategorieHeaderProps } from "./categorie.header.types"
import { faArrowRight, faCode, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { Link } from "@/i18n/navigation"

export default function CategorieHeader({ categorie, inCategoriesPage }: CategorieHeaderProps) {
    return (
        <header className="flex justify-between items-center gap-4">

            <div className="flex items-center gap-3">
                {/* Icon / Thumbnail */}
                {categorie.thumbnailUrl != null
                    ? <img
                        src={categorie.thumbnailUrl}
                        alt={categorie.name}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover shrink-0"
                    />
                    : <span className="w-12 h-12 md:w-14 md:h-14 rounded-2xl shrink-0
                                       bg-(--primary-light) text-(--primary-color)
                                       flex items-center justify-center text-lg md:text-xl">
                        <FontAwesomeIcon icon={faCode} />
                    </span>
                }

                {/* Title + stats */}
                <div className="flex flex-col gap-0.5">
                    <h2 className="text-foreground font-bold text-base md:text-xl leading-snug">
                        {categorie.name.trim()}
                    </h2>
                    <div className="flex items-center gap-2 text-xs md:text-sm
                                    text-(--text-secondary)">
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span className="flex items-center gap-1.5">
                            <FontAwesomeIcon icon={faUserGroup} className="text-xs" />
                            students
                        </span>
                    </div>
                </div>
            </div>

            {/* See all */}
            {inCategoriesPage && (
                <Link
                    href={`/categorized-course/${categorie.id}?pageNumber=1`}
                    className="MAIN_BUTTON text-nowrap shrink-0"
                >
                    See All
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                </Link>
            )}

        </header>
    )
}