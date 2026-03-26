import { ArrowRight, Check, ChevronsUpDown, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { CategoryCombobox } from "./BasicInformationCategoryCombobox";
import { ChangeEvent, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { BasicInformationFormType, BasicInformationProps } from "./createcoursecbasicinformation.types";
import { createCourseBasicInformationAction } from "@/actions/courses/courses.actions";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";


export default function BasicInformationForm({ data, setstep }: BasicInformationProps) {
    const t = useTranslations("Course");
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const imageInput = useRef<HTMLInputElement>(null);
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
            // show error to user before even submitting
            setError("Thumbnail", { message: "Image must be less than 5MB" });
            return;
        }
        const imageUrl = URL.createObjectURL(file!);
        setPreview(imageUrl);
        setThumbnail(file ?? null);
    }
    function handleClearImagePreview() {
        setPreview(null);
        setThumbnail(null);
        setValue("Thumbnail", null);    //→ RHF value reset
        if (imageInput.current) {
            imageInput.current.value = "";
            console.log(imageInput.current.value)
        }
    }
    async function handleBasicInformationStep(data: BasicInformationFormType) {
        const formdata = new FormData();
        formdata.append("Title", data.Title);
        formdata.append("Description", data.Description);
        formdata.append("Thumbnail", data.Thumbnail!);
        formdata.append("Price", data.Price);
        data.DiscountPercentage ? formdata.append("DiscountPercentage", data.DiscountPercentage) :formdata.append("DiscountPercentage", "0");
        formdata.append("CategoryId", data.CategoryId);
        const res = await createCourseBasicInformationAction(formdata);
        if(res.succeeded){
            console.log("creation Course  ReSault", res);
            toast.success(res.message, {
            });
            setstep(1);
            return
        }
            console.log("creation Course  ReSault", res);

        toast.error(res?.Message);
    }
    return (
        <form onSubmit={handleSubmit(handleBasicInformationStep)}>
            <Card className="w-full lg:w-3/4 mx-auto rounded-(--radius) border-border bg-card shadow-sm">
                <CardHeader className="space-y-3 relative">
                    {thumbnail && (
                        <span
                            onClick={handleClearImagePreview}
                            className="z-20 absolute right-10 top-10 flex items-center justify-center w-7 h-7 rounded-full cursor-pointer transition-colors"
                            style={{ backgroundColor: "var(--error)", color: "var(--primary-foreground)" }}
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
                                    ? <div className="bg-amber-600"><img className="w-full h-full" src={preview ?? ""} alt="" /></div>
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
                                    const mergeRefs = (node: HTMLInputElement | null) => {
                                        field.ref(node);
                                        imageInput.current = node;
                                    };
                                    return (
                                        <Input
                                            id="thumbnail"
                                            ref={mergeRefs}
                                            type="file"
                                            className="hidden bg-transparent"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0] ?? null;
                                                if (file) { handleImagePreview(file); }
                                                else { setPreview(null); setThumbnail(null); }
                                                field.onChange(file);
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
                            <Label htmlFor="title" className="LABEL_STYLE">
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
                                        className={`INPUT_STYLE ${errors.Title ? "input-error" : ""}`}
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
                            <Label htmlFor="price" className="LABEL_STYLE">
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
                                            value={field.value}
                                            onChange={field.onChange}
                                            error={fieldState.error?.message}
                                            selectedLabel={selectedCategory?.name}
                                            data={data}
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
                            type="button"
                            variant="outline"
                            className="MAIN_BUTTON px-5 py-2.5 hover:border-(--primary-color) hover:text-(--primary-color) transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            {t("createcourse.actions.cancel")}
                        </Button>
                        <Button
                            type="submit"
                            variant="outline"
                            className="MAIN_BUTTON my-0 py-2.5 px-6 text-(--primary-color) flex items-center gap-2 transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            {t("createcourse.actions.submit")}
                            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}
