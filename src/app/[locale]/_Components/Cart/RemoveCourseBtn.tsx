"use client";
import { removeCourseFromCartAction } from "@/actions/cart/cart.actions";
import { useRouter } from "@/i18n/navigation";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RemoveCourseBtnProps } from "./cart.types";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  setAddedCourseToCart,
  setNumberOfCartItems,
} from "@/store/redux/cart/cart.slice";
import { useState } from "react";
import { ButtonLoader } from "../Loaders/ButtonLoader/ButtonLoader";
import { useTranslations } from "next-intl";

export default function RemoveCourseBtn({ courseId }: RemoveCourseBtnProps) {
  const t = useTranslations();
  const { numberOfCartItems, addedCourses } = useAppSelector(
    (state) => state.userCartSlice,
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  async function handleRemoveCourseFromCart() {
    setisLoading(true);
    const res = await removeCourseFromCartAction(courseId);
    console.log("remove Course res", res);
    if (res.status == 200) {
      toast.success(t('Cart.removeSuccess'));
      dispatch(setNumberOfCartItems(numberOfCartItems - 1));
      // dispatch(setAddedCourseToCart(addedCourses.filter((course)=>course!=courseId)))
      router.refresh();
    } else {
      toast.error(t('Cart.genericError'));
    }
    setisLoading(false);
  }
  return isLoading ? (
    <ButtonLoader size={25} />
  ) : (
    <button
      onClick={handleRemoveCourseFromCart}
      className="w-8 h-8 rounded-full flex items-center justify-center
                                            lg:opacity-0 lg:group-hover/removeicon:opacity-100
                                           hover:bg-red-50 transition-all duration-200
                                           text-(--text-muted) hover:text-red-500
                                           cursor-pointer"
    >
      <FontAwesomeIcon icon={faTrashCan} className="text-sm" />
    </button>
  );
}