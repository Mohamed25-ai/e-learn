'use client'
import { addCourseSectionAction } from "@/actions/courses/courses.actions"
import { Button } from "@/components/ui/button"
import {
    Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { CreateSectionType } from "@/services/courses/coursesapi.types"
import { setAddedOrder, setAddedSection, setCreateStep } from "@/store/redux/createcourse/createcourseslice"
import { BUTTON_STYLE, INPUT_STYLE } from "@/utils/utils"
import { faArrowRight, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"


export function SectionCard() {
    const createCorseStore = useAppSelector((state) => state.createCourse);
    const dispatch = useAppDispatch();
    const [sectionLength, setsectionLength] = useState(createCorseStore?.sectionCreatedSuccessifuly?.length + 1);
    const NUMOFSECTIONS = Array.from({ length: sectionLength }, (_, i) => i + 1);
    const sectionData = useRef<(HTMLInputElement | null)[]>(Array(sectionLength).fill(null));
    async function handleRemoveSection(value: number, idx: number) {
        if (sectionLength > 1) {
            const copy = [...NUMOFSECTIONS]
            const newarr = copy.filter((val) => {
                return val != value
            })
            setsectionLength(newarr.length)
        }
    }
    function nvaigationToLastStep() {
        dispatch(setCreateStep(2));
    }
    async function handleSubmitSection(value: number, idx: number) {
        const payload = sectionData.current[idx]?.value ?? "";
        const data: CreateSectionType = {
            title: payload,
            order: String(value),
            courseId: createCorseStore.createdCourseId,
        }

        const res = await addCourseSectionAction(data)
        if (res?.status === 200) {
            console.log("Create section res", res?.data)
            dispatch(setAddedOrder(value));
            if (res?.data) {
                dispatch(
                    setAddedSection({
                        sectionNum: value,
                        id: res.data,
                    })
                );
            }
            setsectionLength(prev => prev + 1);
            toast.success("Section Added Successifuly");
            return;
        }
        if (!res.IsSuccess) {
            toast.error(res?.Error?.Description)
            console.log("Create section error", res)
        }

        console.log(payload)
        console.log(value, idx)
    }
    async function handleAddSection() {
        setsectionLength((prev) => prev + 1);
    }
    return (
        <section className="px-5 md:px-0">
            <header className="md:w-3/4 mx-auto space-y-1 mb-4">
                <div >
                    <h2 className="text-foreground font-bold ">Section Content </h2>
                </div>
                <p className="text-(--text-secondry) ">Organize your course into sections</p>
            </header>
            <div className="space-y-4 md:w-3/4 mx-auto ">
                {NUMOFSECTIONS.map((value, idx) => {
                    const isAddedBefore = createCorseStore?.sectionCreatedSuccessifuly.includes(value);
                    return <Card key={value} className="  gap-0 px-3">
                        <div className="flex w-full gap-4">
                            <div className="flex items-center gap-x-2">
                                <span
                                    className="w-10 h-10 rounded-full text-foreground 
                                        bg-(--primary-light) flex justify-center items-center"
                                >
                                    {value}
                                </span>
                            </div>
                            <div className="flex-1">
                                <CardHeader className="flex justify-between space-y-3 px-0">
                                    <Label htmlFor={String(idx)} className="text-foreground font-semibold ">Section Title</Label>
                                    <FontAwesomeIcon onClick={() => !isAddedBefore && handleRemoveSection(value, idx)} className={` select-none  text-(--text-muted) ${isAddedBefore ? " cursor-no-drop " : " hover:text-red-500 cursor-pointer"}`} icon={faTrashCan} />

                                </CardHeader>
                                <CardContent className="px-0">
                                    <Input id={String(idx)} disabled={isAddedBefore} key={value} ref={(element) => { sectionData.current[idx] = element }} className="INPUT_STYLE py-5" placeholder={isAddedBefore ? "This section is added before" : "Enter Section Title"} />
                                </CardContent>
                            </div>
                        </div>
                        <CardFooter className="flex justify-end px-0">
                            <Button disabled={isAddedBefore} onClick={() => handleSubmitSection(value, idx)} className={BUTTON_STYLE + " cursor-pointer  py-1/4 rounded-sm "} >
                                Add
                            </Button>
                        </CardFooter>
                    </Card>
                }
                )}
                <div>
                    <Button onClick={handleAddSection} className="w-full flex justify-center py-5  bg-white border-dashed border-2 border-(--primary-color) cursor-pointer text-(--primary-color) hover:bg-(--primary-light)">
                        <span >
                            <FontAwesomeIcon className="text-(--primary-color)" icon={faPlus} />
                        </span>
                        Add New Section
                    </Button>
                </div>
                <Button
                    onClick={nvaigationToLastStep}
                    className="w-full flex justify-center py-5 bg-white border-dashed border-2 border-(--primary-color) cursor-pointer text-(--primary-color) hover:bg-(--primary-light)"
                >
                    <span>
                        <FontAwesomeIcon
                            className="text-(--primary-color)"
                            icon={faArrowRight}
                        />
                    </span>
                    {"Go to Next Step"}
                </Button>
            </div>
        </section>
    )
}
