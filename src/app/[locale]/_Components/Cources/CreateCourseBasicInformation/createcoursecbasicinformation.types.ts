import { CategoriesDataType } from "@/app/[locale]/(main)/(Categories)/categories/categories.type";

export interface BasicInformationProps {
    data: CategoriesDataType[],
    setstep: (step: number) => void,
}
export type CategoryComboboxProps = {
    value?: string;
    onChange: (value: string) => void;
    error?: string;
    selectedLabel?: string;
    data: CategoriesDataType[]
};
export interface BasicInformationFormType {
    Thumbnail: File|null,
    Title: string,
    Description: string,
    Price: string,
    DiscountPercentage: string,
    CategoryId: string
}