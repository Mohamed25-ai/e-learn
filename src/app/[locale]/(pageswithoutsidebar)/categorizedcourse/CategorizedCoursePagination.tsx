"use client"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchParams } from "next/navigation"
import { CategorizedCoursePaginationProps } from "./categorizedcourse.types"
import { useRouter } from "@/i18n/navigation"
import { useTransition } from "react"
import { ButtonLoader } from "../../_Components/Loaders/ButtonLoader/ButtonLoader"
import { useLocale } from "next-intl"

export default function CategorizedCoursePagination({ currentPage, hasNextPage, hasPreviousPage,
    totalCount, totalPages, categoryId
}: CategorizedCoursePaginationProps) {
    const [isPending, startTransition] = useTransition();
    console.log("isPending", isPending)
    const router = useRouter()
    const hasPagination = hasNextPage || hasPreviousPage;
    const allPages = Array.from({ length: totalPages }, (_, i) => i + 1)
    const searchParams = useSearchParams();
    const currentPg = Number(searchParams.get("pageNumber"));
    const locale = useLocale();
    const isRtl = locale === 'ar';
    function handlePagination(page: number) {
        const currentPage = Number(searchParams.get("pageNumber"))
        if (currentPage > totalPages) {
            return;
        }
        if (page == currentPage) {
            return
        }
        const params = new URLSearchParams(searchParams.toString());
        params.set("pageNumber", String(page));
        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    }
    function handlePreviousPage() {
        const currentPage = Number(searchParams.get("pageNumber"))
        if (currentPage <= totalPages && currentPage > 1) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("pageNumber", String(currentPage - 1));
            startTransition(() => {
                router.push(`?${params.toString()}`);
            });
        }
    }
    function handleNextPage() {
        const currentPage = Number(searchParams.get("pageNumber"))
        if (currentPage < totalPages) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("pageNumber", String(currentPage + 1));
            startTransition(() => {
                router.push(`?${params.toString()}`);
            });
        }
    }
    return (
        <>
            {hasPagination && <Pagination dir={isRtl?"rtl":"ltr"}>
                {isPending && <ButtonLoader size={20} />}
                {!isPending && <PaginationContent >
                    <PaginationItem >
                        <PaginationPrevious className="cursor-pointer" onClick={handlePreviousPage} />
                    </PaginationItem>
                    {allPages.map((page) => (
                        <PaginationLink key={page} className="cursor-pointer" onClick={() => handlePagination(page)} isActive={page == currentPg} >
                            {page}
                        </PaginationLink>
                    ))}
                    <PaginationItem >
                        <PaginationNext  className="cursor-pointer" onClick={handleNextPage} />
                    </PaginationItem>
                </PaginationContent>}
            </Pagination>}
        </>
    )
}



