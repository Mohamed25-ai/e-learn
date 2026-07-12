import { CategoriesDataType } from "@/app/[locale]/(main)/(Categories)/categories/categories.type";
import { SectionByCourseData } from "@/store/redux/createcourse/createcourseslice.types";
import { UseFormSetError, UseFormSetValue } from "react-hook-form";

export interface BasicInformationProps {
    data: CategoriesDataType[],
}
export type CategoryComboboxProps = {
    value?: string;
    onChange: (value: string) => void;
    error?: string;
    selectedLabel?: string;
    categoriesData?: CategoriesDataType[],
    sectionsData?: SectionByCourseData[],
    isStepone?: boolean,
    isStepThree?: boolean,
    isContentAddedBefore?: boolean
};
export interface BasicInformationFormType {
    Thumbnail: File | null,
    Title: string,
    TotalHours: number,
    Description: string,
    Objectives?: string[],
    Price: string,
    DiscountPercentage: string,
    CategoryId: string
}
export interface CourseObjectivesProps {
    onChange: (value: string[]) => void;
}