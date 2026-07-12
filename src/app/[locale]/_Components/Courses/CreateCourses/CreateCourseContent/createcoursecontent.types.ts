import { SectionByCourseData } from "@/store/redux/createcourse/createcourseslice.types";
import { UseFormSetError, UseFormSetValue } from "react-hook-form";



export interface CreateContentDataType {
    Title: string,
    File: File,
    ContentType: "Video" | "Image" | "Document" | "Quiz";
    SectionId: string
}
export interface CreateContentType {
    data: CreateContentDataType[],
}
export interface CreateCourseContentFormPropsType {
    contentData: SectionByCourseData[],
}
export interface CourseContentFormPropsType {
    fromOrder: number,
    secionsData: SectionByCourseData[],
    removeCard:(value:number)=>void,
    cardIndex:number,
    handleAddedSuccessContent:(num:number,value:boolean)=>void,
    addedContent:Record<number,boolean>
    editCurrentCard:Record<number,boolean>,
    handleSetEditCard:(num:number,value:boolean)=>void
}
export type ContentType = "Video" | "Image" | "Pdf" ;

export interface FormValues {
    Title: string;
    CategoryId: string;
}
export interface SubmitContentFormType {
    Title: string,
    File?: File,
    // ContentType: ContentType,
    SectionId: string
}
export interface Section {
    id: string;
    title: string;
}
export interface CourseContentFilesProps {
    onChange: (value: string) => void,
    selectedField: string,
    SetSelectedFieldType: React.Dispatch<React.SetStateAction<ContentType>>;
    isFileExist: boolean,
    setisFileExist: (value: boolean) => void,
    isContentAddedBefore?:boolean
}
export interface FilesFieldPropsType {
    onChange: (value: File | undefined) => void,
    selectedFileType?: string,
    isFileExist: boolean,
    setisFileExist: (value: boolean) => void
    setfieldValue: UseFormSetValue<SubmitContentFormType>;
    setFieldError: UseFormSetError<SubmitContentFormType>;
    isFieldHasError:boolean,
    isContentAddedBefore?:boolean,
    isEditContent?:boolean
}
export interface FieldsErrorMessagePropsType{
    message:string|"Error Happend In Message",
    field:string
}
export interface CreateCourseContentInputsData {
    title: string;
    sectionId: string;
    publicId: string;
    url: string;
    resourceType: string;
    format: string;
    duration?: number;
    bytes: number;
}