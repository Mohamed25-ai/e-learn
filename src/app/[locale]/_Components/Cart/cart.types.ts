export type BasketItemsType = {
    basePrice: number,
    cartId: string,
    courseId: string
    courseTitle: string
    createdAt: string
    discount: number
    id: string
    totalPrice: number
    updatedAt: string,
    category:string,
    courseThumbnailUrl:string,
    instructorName:string,
    instructorProfilePictureUrl:string,
    noOfLectures:number,
    totalHours:number,
    averageRating:number
}

export interface CartDataTypes {
    basketItems:BasketItemsType[]
    clientSecret?: string
    createdAt: string
    customerId: string
    id: string
    paymentIntentId?: string
    totalBasePrice: number
    totalDiscountPrice: number
    totalPrice: number
    updatedAt: string
}
export type CartProps={
    cartData:CartDataTypes
}
export type CartInvoiceProps={
    cartData:CartDataTypes
}
export type AddToCartBtnProps = {
    courseId: string,
}
export type CartItemsProps={
    BasketItems:BasketItemsType[]
}
export type RemoveCourseBtnProps={
    courseId:string
}
export type PayUserCartInvoiceProps={
    baskedId:string
}
export type RemoveAllCartProps={
    // cartItemsLength:number
}
export type PaymentModalDialogProps={
    isDialogOpen:boolean,
    setisDialogOpen:(dialogState:boolean)=>void,
    isPaymentSucceeded?:boolean,
    isPaymentFailed?:boolean,
    paymentFailedMessage?:string,
    closPayment:()=>void
}