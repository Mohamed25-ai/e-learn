import STATIC_COURSE_IMAGE from "@/assets/images/static_product_image.jpg";
import STATIC_PROFILE_IMAGE from "@/assets/images/blank-profile-picture-973460_960_720.png";
import { Card, CardContent } from "@/components/ui/card";
import { CartItemsProps } from "./cart.types";
import Image from "next/image";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RemoveCourseBtn from "./RemoveCourseBtn";
import { getTranslations } from "next-intl/server";

export default async function CartItems({ BasketItems }: CartItemsProps) {
  const t = await getTranslations();
  console.log("BasketItems",BasketItems)
  return (
    <div className="w-full lg:w-3/4 flex flex-col gap-3">
      <header className="flex  items-center gap-3">
        <h3 className="text-foreground font-semibold">{t('Cart.shoppingCart')}</h3>
        {BasketItems?.length>0 && (
          <p className="bg-gray-200 text-(--text-secondary) px-3 rounded-full ">
            {t('Cart.coursesCount', { count: BasketItems.length })}
          </p>
        )}
      </header>
      {BasketItems?.length==0 ? (
        <div>
          <h2 className="text-foreground text-2xl font-bold flex items-center justify-center">
            {t('Cart.emptyCart')}
          </h2>
        </div>
      ) : (
        <>
          {BasketItems?.map((item) => (
            <Card
              key={item.courseId}
              className="border-2 border-border shadow-none
                               bg-white group/removeicon rounded-2xl overflow-hidden
                               transition-all duration-200 hover:shadow-sm"
            >
              <CardContent
                className="p-4 flex sm:flex-row
                                            justify-between items-start sm:items-center gap-4"
              >
                {/* Left — image + info */}
                <div className="flex gap-3 flex-1 min-w-0">
                  {/* Thumbnail */}
                  <div className="relative w-32 sm:w-40 h-20 shrink-0 rounded-xl overflow-hidden">
                    <Image
                      fill
                      className="object-cover"
                      src={item.courseThumbnailUrl || STATIC_COURSE_IMAGE}
                      alt={item.courseTitle}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <span
                      className="bg-(--primary-light) text-nowrap text-(--primary-color)
                                                 text-xs font-medium px-3 py-0.5 rounded-full w-fit"
                    >
                      {t('Cart.webDevelopment')}
                    </span>
                    <h3
                      className="text-foreground font-semibold text-base
                                               leading-snug line-clamp-2"
                    >
                      {item.courseTitle}
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="relative w-6 h-6 rounded-full shrink-0  overflow-hidden">
                        <Image
                          fill
                          className="object-cover"
                          src={
                            item.instructorProfilePictureUrl ||
                            STATIC_PROFILE_IMAGE
                          }
                          alt={item.instructorName}
                        />
                      </div>
                      <span className="text-xs text-(--text-secondary) truncate">
                        {item.instructorName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right — price + delete */}
                <div className="flex items-center gap-1 md:gap-3 shrink-0">
                  {/* Price block */}
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="text-foreground font-bold text-base">
                      ${item.basePrice}
                    </span>
                    <span className="text-xs text-(--text-muted) line-through">
                      {t('Cart.discount')}
                    </span>
                    <span className="text-xs font-semibold text-(--success)">
                      {t('Cart.discountPercent')}
                    </span>
                  </div>

                  {/* Delete */}
                  <RemoveCourseBtn courseId={item.courseId} />
                </div>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}