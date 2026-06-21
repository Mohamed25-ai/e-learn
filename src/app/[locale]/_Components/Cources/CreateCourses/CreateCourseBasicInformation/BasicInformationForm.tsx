import { ArrowRight, Check, ChevronsUpDown, Image as ImageIcon, Images } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { CategoryCombobox } from "./BasicInformationCategoryCombobox";
import {  useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { BasicInformationFormType, BasicInformationProps } from "./createcoursecbasicinformation.types";
import { createCourseBasicInformationAction } from "@/actions/courses/courses.actions";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { setCourseID, setCreateStep } from "@/store/redux/createcourse/createcourseslice";
import { useAppDispatch } from "@/hooks/hooks";
import { useRouter } from "@/i18n/navigation";
import { ButtonLoader } from "../../../Loaders/ButtonLoader/ButtonLoader";


export default function BasicInformationForm({ data }: BasicInformationProps) {
    const dispatch = useAppDispatch();
    const router=useRouter();
    const t = useTranslations("Course");
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [isLoading, setisLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const imageInput = useRef<HTMLInputElement>(null)
    const { control, handleSubmit, setValue, setError, formState } = useForm<BasicInformationFormType>({
        defaultValues: {
            Thumbnail: undefined,
            Title: '',
            Description: '',
            Price: '',
            DiscountPercentage: '',
            CategoryId: ''
        },
        mode: "onChange"
    });
    const { errors } = formState;
    function handleImagePreview(file: File) {
        if (file.size > 5 * 1024 * 1024) { // 5MB
            setError("Thumbnail", { message: "Image must be less than 5MB" });
            return false;
        }
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
        setThumbnail(file);
        return true;
    }
    function handleClearImagePreview() {
        if (imageInput.current) {
            imageInput.current.value = "";
        }
        setPreview(null);
        setThumbnail(null);
        setValue("Thumbnail", null);
        setError("Thumbnail", { message: t("createcourse.thumbnail.required") });
    }
    function cancelFirstStep(){
        router.push('/');
    }
    async function handleBasicInformationStep(data: BasicInformationFormType) {
        setisLoading(true);
        const formdata = new FormData();
        if (thumbnail) {
            formdata.append("Thumbnail", thumbnail);
        }
        formdata.append("Title", data.Title);
        formdata.append("Description", data.Description);
        formdata.append("Price", data.Price);
        data.DiscountPercentage ? formdata.append("DiscountPercentage", data.DiscountPercentage) : formdata.append("DiscountPercentage", "0");
        formdata.append("CategoryId", data.CategoryId);
        const res = await createCourseBasicInformationAction(formdata);
        if (res.status === 200) {
            dispatch(setCreateStep(1));
            dispatch(setCourseID(res?.data));
            setisLoading(false);
            return
        }
        toast.error(res?.data.Error?.Description);
        setisLoading(false);
    }
    return (<>
        {/* {isLoading && <div className="w-full lg:w-3/4 mx-auto ">
            <FormLoader />
        </div>} */}
        {<form onSubmit={handleSubmit(handleBasicInformationStep)}>
            <Card className="w-full lg:w-3/4 mx-auto rounded-lg border-border bg-card shadow-sm">
                <CardHeader className="space-y-3 relative">
                    {thumbnail && (
                        <span
                            onClick={handleClearImagePreview}
                            className="z-20 absolute text-foreground bg-(--error) right-10 top-10 flex items-center justify-center w-7 h-7 rounded-full cursor-pointer transition-colors"
                            // style={{ backgroundColor: "", color: "var(--primary-foreground)" }}
                        >
                            <FontAwesomeIcon icon={faXmark} size="sm" />
                        </span>
                    )}

                    <Label className="LABEL_STYLE flex flex-col relative items-start gap-y-3">
                        <span>{t("createcourse.thumbnail.label")}</span>
                        <Label
                            htmlFor="thumbnail"
                            className={`w-full flex flex-col justify-center rounded-2xl border gap-y-1 cursor-pointer border-dashed items-center py-6 px-4 transition-colors
                            ${errors.Thumbnail
                                    ? "border-(--error) hover:border-(--error)"
                                    : "hover:border-(--primary-color)"
                                }`}
                        >
                            <div className={`${thumbnail && "h-40"} text-(--primary-color) w-full flex justify-center`}>
                                {thumbnail != null
                                    ? <div ><img className="w-full h-full" src={preview ?? ""} alt="" /></div>
                                    : <span><ImageIcon size={60} /></span>
                                }
                            </div>
                            <p className="text-foreground font-semibold mb-1 text-center">
                                {!thumbnail && t("createcourse.thumbnail.cta")}
                            </p>
                            <p className="text-sm text-[#9AA0B4] text-center">
                                {!thumbnail && t("createcourse.thumbnail.hint")}
                            </p>
                            <Controller
                                name="Thumbnail"
                                control={control}
                                rules={{ validate: (value) => (!value || value === null ? t("createcourse.thumbnail.required") : true) }}
                                render={({ field }) => {
                                    return (
                                        <Input
                                            id="thumbnail"
                                            type="file"
                                            className="hidden bg-transparent"
                                            ref={(element) => {
                                                field.ref(element);
                                                imageInput.current = element
                                            }}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0] ?? null;
                                                if (file) {
                                                    const isValid = handleImagePreview(file);
                                                    if (isValid) {
                                                        field.onChange(file);
                                                    }
                                                } else {
                                                    field.onChange(null);
                                                }
                                            }}
                                        />
                                    );
                                }}
                            />
                        </Label>
                        {errors.Thumbnail && (
                            <p className="text-sm" style={{ color: "var(--error)" }}>
                                {errors.Thumbnail.message}
                            </p>
                        )}
                    </Label>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Title */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="title" className="LABEL_STYLE ">
                                {t("createcourse.title.label")}
                            </Label>
                            <Controller
                                name="Title"
                                control={control}
                                rules={{
                                    required: { value: true, message: t("createcourse.title.required") },
                                    minLength: { value: 3, message: t("createcourse.title.minLength") },
                                    maxLength: { value: 100, message: t("createcourse.title.maxLength") },
                                }}
                                render={({ field }) => (
                                    <Input
                                        id="title"
                                        placeholder={t("createcourse.title.placeholder")}
                                        className={`$INPUT_STYLE ${errors.Title && "input-error"}`}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.Title && (
                                <p className="text-sm" style={{ color: "var(--error)" }}>
                                    {errors.Title.message}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="description" className="LABEL_STYLE">
                                {t("createcourse.description.label")}
                            </Label>
                            <Controller
                                name="Description"
                                control={control}
                                rules={{
                                    required: { value: true, message: t("createcourse.description.required") },
                                    minLength: { value: 10, message: t("createcourse.description.minLength") },
                                }}
                                render={({ field }) => (
                                    <Textarea
                                        id="description"
                                        placeholder={t("createcourse.description.placeholder")}
                                        className={`INPUT_STYLE min-h-32 resize-none ${errors.Description ? "input-error" : ""}`}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.Description && (
                                <p className="text-sm" style={{ color: "var(--error)" }}>
                                    {errors.Description.message}
                                </p>
                            )}
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <Label htmlFor="price" className={"LABEL_STYLE"}>
                                {t("createcourse.price.label")}
                            </Label>
                            <Controller
                                name="Price"
                                control={control}
                                rules={{
                                    required: { value: true, message: t("createcourse.price.required") },
                                    min: { value: 0, message: t("createcourse.price.min") },
                                }}
                                render={({ field }) => (
                                    <div className="relative">
                                        <span className={`absolute start-3 top-1/2 -translate-y-1/2 text-sm
                    ${errors.Price ? "text-(--error)" : "text-muted-foreground"}`}>
                                            {t("createcourse.price.currency")}
                                        </span>
                                        <Input
                                            id="price"
                                            type="number"
                                            min={0}
                                            step="0.01"
                                            placeholder="0"
                                            className={`INPUT_STYLE ps-12 ${errors.Price ? "input-error" : ""}`}
                                            {...field}
                                        />
                                    </div>
                                )}
                            />
                            {errors.Price && (
                                <p className="text-sm" style={{ color: "var(--error)" }}>
                                    {errors.Price.message}
                                </p>
                            )}
                        </div>

                        {/* Discount Percentage */}
                        <div className="space-y-2">
                            <Label htmlFor="discountPercentage" className="LABEL_STYLE">
                                {t("createcourse.discount.label")}
                            </Label>
                            <Controller
                                name="DiscountPercentage"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <Input
                                            id="discountPercentage"
                                            type="number"
                                            min={0}
                                            max={100}
                                            placeholder="0"
                                            className="INPUT_STYLE pe-8"
                                            {...field}
                                        />
                                        <span className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                            %
                                        </span>
                                    </div>
                                )}
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2 md:col-span-2">
                            <Label className="LABEL_STYLE">
                                {t("createcourse.category.label")}
                            </Label>
                            <Controller
                                name="CategoryId"
                                control={control}
                                rules={{ required: { value: true, message: t("createcourse.category.required") } }}
                                render={({ field, fieldState }) => {
                                    const selectedCategory = data?.find((category) => category.id === field.value);
                                    return (
                                        <CategoryCombobox
                                            isStepone
                                            value={field.value}
                                            onChange={field.onChange}
                                            selectedLabel={selectedCategory?.name}
                                            categoriesData={data}
                                        />
                                    );
                                }}
                            />
                            {errors.CategoryId && (
                                <p className="text-sm text-(--error)">
                                    {errors.CategoryId.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Button
                            onClick={cancelFirstStep}
                            disabled={isLoading}
                            className="MAIN_BUTTON my-0 py-2.5 px-6 text-(--primary-color) flex items-center gap-2 transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-xs"
                        >
                            {t("createcourse.actions.cancel")}
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading || !formState.isValid}
                            className="MAIN_BUTTON my-0 py-2.5 px-6 text-(--primary-color) flex items-center gap-2 transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-xs"
                        >
                            {isLoading&&<span className="py-2.5 px-6" ><ButtonLoader /></span>}
                            {!isLoading&&t("createcourse.actions.submit")}
                            {!isLoading&&<ArrowRight className="h-4 w-4 rtl:rotate-180" />}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>}
    </>
    )
}
