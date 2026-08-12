"use server"
import { addCourseToCart, payUserCart, getUserCart, removeCourseFromCart, removeAllItemsCart } from "@/services/cart/cart.service"

export async function addCourseToCartAction(courseId:string) {
    return await addCourseToCart(courseId);
}
export async function removeCourseFromCartAction(courseId:string) {
    return await removeCourseFromCart(courseId);
}
export async function payUserCartAction(basketId:string) {
    return await payUserCart(basketId);
}
export async function getUserCartAction() {
    return await getUserCart();
}
export async function removeAllItemsCartAction() {
    return await removeAllItemsCart();
}