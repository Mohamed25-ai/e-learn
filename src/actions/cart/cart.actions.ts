"use server"
import { addCourseToCart } from "@/services/cart/cart.service"

export async function addCourseToCartAction(courseId:string) {
    return await addCourseToCart(courseId);
}