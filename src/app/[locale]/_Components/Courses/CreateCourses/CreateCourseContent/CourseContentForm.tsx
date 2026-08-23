"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import {
  ContentType,
  CourseContentFormPropsType,
  SubmitContentFormType,
} from "./createcoursecontent.types";
import { Input } from "@/components/ui/input";
import { CategoryCombobox } from "../CreateCourseBasicInformation/BasicInformationCategoryCombobox";
import CourseContentFiles from "./CourseContentFiles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import FilesField from "./FilesField";
import { useState } from "react";
import {
  getFileRules,
  sectionRules,
  titleRules,
} from "./createCourseContent.validation";
import FieldsErrorMessage from "./FieldsErrorMessage";
import { createCourseContentAction, editCourseContentAction } from "@/actions/courses/courses.actions";
import { createCourseContent } from "@/services/courses/courses.service";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setAddedContent, setCreatedContentId } from "@/store/redux/createcourse/createcourseslice";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { ButtonLoader } from "../../../Loaders/ButtonLoader/ButtonLoader";
import {  uploadCloudinaryFiles } from "@/services/courses/cloudinary.service";




export default function CourseContentForm({
  fromOrder,
  removeCard,
  editCurrentCard,
  handleSetEditCard,
  cardIndex,
  secionsData,
  addedContent,
  handleAddedSuccessContent,
}: CourseContentFormPropsType) {
  const createCourseSote = useAppSelector((state) => state.createCourse);
  const dispatch = useAppDispatch();
  const [isFileExist, setisFileExist] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const isCardAddedBrefore = addedContent[fromOrder] === true;
  const isEditMode =
    !isLoading &&
    editCurrentCard?.[fromOrder] !== undefined;
  const submitContentForm = useForm<SubmitContentFormType>({
    defaultValues: {
      Title: "",
      SectionId: "",
      File: undefined,
    },
    mode: "onChange",
  });
  const { handleSubmit, control, formState } = submitContentForm;
  console.log(editCurrentCard[fromOrder])
  function handleSetExistedFile(value: boolean) {
    setisFileExist(value);
  }
  function handleEditCardContent(value: boolean) {
    handleSetEditCard(fromOrder, value);
    // submitContentForm.clearErrors();
    // submitContentForm.trigger();
    submitContentForm.reset(submitContentForm.getValues());
    // if (value) {
    // }
  }
  function handleCancelEditStep() {
    if (editCurrentCard[fromOrder]) {
      handleSetEditCard(fromOrder, false);
      return;
    }
  }
  async function handleSubmitCourseContent(
    data: SubmitContentFormType,
    isEdit: boolean,
  ) {
    try {
      setisLoading(true);
      // 2. Prepare payload for backend
      const formData=new FormData();
      formData.append("Title",data.Title)
      formData.append("SectionId",data.SectionId);
      if(data.File&&!isEdit){
        formData.append("File",data.File)
      }
      if(isEdit&&createCourseSote.createdContentId[fromOrder]){
        formData.append("Id",createCourseSote.createdContentId[fromOrder])
      }
      const isAddedBefore =
        createCourseSote.createdContentuccessifuly.includes(fromOrder);

      // 3. Edit
      if (isAddedBefore && isEdit && editCurrentCard[fromOrder]) {

        const res = await editCourseContentAction(formData);
        console.log("ers",res)
        if (res.status === 200) {
          toast.success("Changes saved successfully");
          handleEditCardContent(false);
        }
        return;
      }
      // 4. Create
      if (!isAddedBefore) {
        const res = await createCourseContentAction(formData);
        dispatch(setAddedContent(fromOrder));
        handleAddedSuccessContent(fromOrder, true);
        toast.success("Lesson added successfully");
        console.log("ressss",res)
        dispatch(
          setCreatedContentId({
            key: fromOrder,
            value: res.data,
          })
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload lesson");
    } finally {
      setisLoading(false);
    }
  }
  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (editCurrentCard[fromOrder]) {
          handleSubmitCourseContent(data, true);
          return;
        }
        handleSubmitCourseContent(data, false);
      })}
    >
      <Card className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all">
        <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-7">
          {/* Top Section */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
            {/* Order Badge */}
            <div className="flex justify-center lg:justify-start">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--primary-light) 
              text-sm font-semibold text-(--primary-color)">
                {fromOrder}
              </div>
            </div>
            {/* Main Content */}
            <div className="flex-1 space-y-6">
              {/* Header */}
              <CardHeader className="space-y-5 border-b border-border px-0 pb-6 pt-0">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Lesson Title */}
                  <div className="space-y-2">
                    <Controller
                      name="Title"
                      control={control}
                      rules={titleRules}
                      render={({ field, fieldState }) => (
                        <>
                          <Label
                            className={[
                              "LABEL_STYLE",
                              fieldState.error ? "text-(--error)" : "",
                            ].join(" ")}
                          >
                            Lesson Title
                          </Label>
                          <Input
                            {...field}
                            disabled={
                              isCardAddedBrefore && !editCurrentCard[fromOrder]
                            }
                            placeholder="e.g., Introduction to HTML Basics"
                            className={[
                              "INPUT_STYLE h-11 focus-visible:ring-0",
                              fieldState.error
                                ? "border-(--error) text-(--error) focus-visible:border-(--error)"
                                : "",
                            ].join(" ")}
                          />
                          {fieldState.error && (
                            <FieldsErrorMessage
                              field="Title"
                              message={fieldState.error.message ?? ""}
                            />
                          )}
                        </>
                      )}
                    />
                  </div>

                  {/* Section */}
                  <div className="space-y-2">
                    <Controller
                      name="SectionId"
                      control={control}
                      rules={sectionRules}
                      render={({ field, fieldState }) => {
                        const selectedCategory = secionsData?.find(
                          (section) => section.id === field.value,
                        );

                        return (
                          <>
                            <Label
                              className={[
                                "LABEL_STYLE",
                                fieldState.error ? "text-(--error)" : "",
                              ].join(" ")}
                            >
                              Section
                            </Label>

                            <CategoryCombobox
                              isStepThree
                              value={field.value}
                              isContentAddedBefore={
                                isCardAddedBrefore &&
                                !editCurrentCard[fromOrder]
                              }
                              onChange={field.onChange}
                              selectedLabel={selectedCategory?.title}
                              sectionsData={secionsData}
                            />

                            {fieldState.error && (
                              <FieldsErrorMessage
                                field="SectionId"
                                message={fieldState.error.message ?? ""}
                              />
                            )}
                          </>
                        );
                      }}
                    />
                  </div>
                </div>
              </CardHeader>

              {/* Content Type */}
              <CardContent className="space-y-4 px-0 py-0">
                {/* Upload */}
                <div className="space-y-2 pt-2">
                  <Controller
                    name="File"
                    control={control}
                    rules={getFileRules(editCurrentCard[fromOrder])}
                    render={({ field, fieldState }) => (
                      <>
                        <Label
                          className={[
                            "LABEL_STYLE",
                            fieldState.error && !editCurrentCard[fromOrder] ? "text-(--error)" : "",
                          ].join(" ")}
                        >
                          Upload File
                        </Label>
                        <CourseContentFiles />
                        <FilesField
                          onChange={field.onChange}
                          setfieldValue={submitContentForm.setValue}
                          setisFileExist={handleSetExistedFile}
                          setFieldError={submitContentForm.setError}
                          isFileExist
                          isEditContent={editCurrentCard[fromOrder]}
                          isContentAddedBefore={
                            isCardAddedBrefore && !editCurrentCard[fromOrder]
                          }
                          isFieldHasError={!!fieldState.error}
                        // selectedFileType={SelectedFileType?.type}
                        />
                        {fieldState.error && (
                          <FieldsErrorMessage
                            field="File"
                            message={fieldState.error.message ?? ""}
                          />
                        )}
                      </>
                    )}
                  />
                </div>
              </CardContent>
            </div>
            {/* Delete Button */}
            <div className="flex justify-end lg:justify-center">
              {!isCardAddedBrefore && (
                <button
                  onClick={() => removeCard(cardIndex)}
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-(--text-muted) transition-all duration-200 hover:bg-red-50 hover:text-red-500"
                >
                  {<FontAwesomeIcon icon={faTrashCan} />}
                </button>
              )}
              {isCardAddedBrefore && !editCurrentCard[fromOrder] && (
                <button
                  onClick={() => handleEditCardContent(true)}
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-(--text-muted) transition-all duration-200 "
                >
                  {
                    <FontAwesomeIcon
                      className="text-foreground cursor-pointer hover:text-(--primary-hover)"
                      icon={faPenToSquare}
                    />
                  }
                </button>
              )}
              {isCardAddedBrefore && editCurrentCard[fromOrder] && (
                <button
                  onClick={() => handleEditCardContent(false)}
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-(--text-muted) transition-all duration-200 cursor-pointer hover:bg-red-50 hover:text-red-500"
                >
                  {<FontAwesomeIcon icon={faXmark} />}
                </button>
              )}
            </div>
          </div>
          {/* Footer */}
          <CardFooter className="flex flex-col-reverse gap-3 border-t border-border px-0 pt-6 sm:flex-row sm:items-center sm:justify-end">
            <Button
              onClick={handleCancelEditStep}
              disabled={isCardAddedBrefore && !editCurrentCard[fromOrder]}
              type="button"
              className="MAIN_BUTTON my-0 py-2.5 px-6 text-(--primary-color) flex items-center gap-2 transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Cancel
            </Button>
            <Button
              disabled={isCardAddedBrefore && !editCurrentCard[fromOrder]}
              type="submit"
              className="MAIN_BUTTON my-0 py-2.5 px-6 text-(--primary-color) flex items-center gap-2 transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
            >
              {isLoading ? (
                <ButtonLoader size={16} />
              ) : editCurrentCard[fromOrder] ? (
                "Save Changes"
              ) : (
                "Save Lesson"
              )}
            </Button>
          </CardFooter>
        </div>
      </Card>
    </form>
  );
}
