"use client"
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AddToCartBtnProps } from './cart.types'
import { addCourseToCartAction } from '@/actions/cart/cart.actions'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { ButtonLoader } from '../Loaders/ButtonLoader/ButtonLoader'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { setAddedCourseToCart, setNumberOfCartItems } from '@/store/redux/cart/cart.slice'
import { useSession } from 'next-auth/react'

export default function AddToCartBtn({ courseId }: AddToCartBtnProps) {
    const { numberOfCartItems,addedCourses } = useAppSelector((state) => state.userCartSlice);
    const userSession=useSession();
    console.log(userSession)
    const dispatch = useAppDispatch();
    const [isLoading, setisLoading] = useState(false);
    async function handleAddCourseToCart() {
        if(userSession.status=="unauthenticated"){
            toast.error("Login First To Add This Course");
            return;
        }
        if(addedCourses.includes(courseId)){
            toast.error("Course Is Already in Cart");
            return;
        }
        setisLoading(true);
        const res = await addCourseToCartAction(courseId);
        if (res.status == 200) {
            toast.success("Course is Added Successifuly");
            dispatch(setAddedCourseToCart(courseId));
            dispatch(setNumberOfCartItems(numberOfCartItems + 1));
        } else {
            toast.error(res.data?.error.description);
        }
        setisLoading(false);
        console.log("sdsdasdasdasd", res)
    }
    return (
        <>
            {!isLoading && <button onClick={handleAddCourseToCart} className="MAIN_BUTTON text-xs px-3  shrink-0">
                <FontAwesomeIcon icon={faCartShopping} />
                Add
            </button>}
            {isLoading && <ButtonLoader size={25} />}
        </>

    )
}
