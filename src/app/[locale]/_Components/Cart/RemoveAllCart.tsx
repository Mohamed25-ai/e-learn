"use client";
import { removeAllItemsCartAction } from "@/actions/cart/cart.actions";
import { useRouter } from "@/i18n/navigation";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import toast from "react-hot-toast";
import { ButtonLoader } from "../Loaders/ButtonLoader/ButtonLoader";
import { RemoveAllCartProps } from "./cart.types";
import FormLoader from "../Loaders/FormLoader/FormLoader";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setNumberOfCartItems } from "@/store/redux/cart/cart.slice";
import WallpaperLoader from "../Loaders/WallpaperLoader/WallpaperLoader";

export default function RemoveAllCart({}: RemoveAllCartProps) {
  const cartStore = useAppSelector((state) => state.userCartSlice);
  const dispatch=useAppDispatch();
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  async function removeAllCart() {
    setisLoading(true);
    const res = await removeAllItemsCartAction();
    console.log("All delted", res);
    if (res.status == 200) {
      toast.success("Cart is empty");
      dispatch(setNumberOfCartItems(0));
      router.refresh();
    } else {
    }
    setisLoading(false);
  }
  return (
    <>
      {isLoading ? (
        <WallpaperLoader />
      ) : (
        <button
          onClick={removeAllCart}
          className="text-red-500 cursor-pointer 
      px-3 hover:bg-red-100 rounded-2xl"
        >
          <FontAwesomeIcon icon={faTrashCan} className="text-sm me-1" />
          Remove All
        </button>
      )}
    </>
  );
}
