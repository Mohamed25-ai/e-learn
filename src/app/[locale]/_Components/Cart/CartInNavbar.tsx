"use client"
import { useAppSelector } from "@/hooks/hooks";
import { Link } from "@/i18n/navigation";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function CartInNavbar() {
    const { numberOfCartItems } = useAppSelector((state) => state.userCartSlice);

    return (
        <Link href={"/cart"} className="relative me-5 mt-2 ">
            <FontAwesomeIcon className="text-(--primary-color) cursor-pointer" size="xl" icon={faCartPlus} />
            <span className="absolute bottom-full translate-y-1/2 left-full
                bg-(--primary-color) rounded-full w-6 h-6 
                flex items-center justify-center text-(--primary-light)">{numberOfCartItems}</span>
        </Link>
    )
}
