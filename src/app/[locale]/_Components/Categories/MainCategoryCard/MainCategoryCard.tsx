import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MainCategoryCardProps } from "./main.category.card.types";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import CATRGORY_STATIC_IMAGE from '@/assets/images/Static course image.jpg'
import { Link } from "@/i18n/navigation";

export default function MainCategoryCard({ categorie }: MainCategoryCardProps) {
  return (
    <Link href={`/categorized-course/${categorie.id}`}>
      <Card className="p-0 overflow-hidden border border-border shadow-sm
                 transition-all duration-200 hover:-translate-y-1
                 hover:shadow-[0_6px_20px_rgba(73,187,189,0.12)] cursor-pointer">

        <CardHeader className="p-0">
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              src={categorie.thumbnailUrl || CATRGORY_STATIC_IMAGE}
              alt={categorie.name}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex flex-col gap-2">
          <h2 className="font-bold text-foreground text-base leading-snug">
            {categorie.name}
          </h2>
          <p className="text-sm text-(--text-secondary) leading-relaxed line-clamp-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
