'use client'
import { addCourseSectionAction, editCourseSectionAction } from "@/actions/courses/courses.actions"
import { ButtonLoader } from "@/app/[locale]/_Components/Loaders/ButtonLoader/ButtonLoader"
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
import { faArrowRight, faCheck, faPenToSquare, faPlus, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Pencil } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import toast from "react-hot-toast"
import fa from "zod/v4/locales/fa.cjs";


export function SectionCard() {
    const createCorseStore = useAppSelector((state) => state.createCourse);
    const dispatch = useAppDispatch();
    const [Sections, setSections] = useState(createCorseStore?.sectionCreatedSuccessifuly);
    const sortedSections=[...Sections].sort((a, b) => a - b);
    const [isLoading, setisLoading] = useState<boolean[]>(Array(Sections.length + 1).fill(false));
    const [addedSectionState, setaddedSectionState] = useState<boolean[]>(() => {
        const arr: boolean[] = [];
        Sections.forEach((num) => {
            arr[num] = true;
        });
        return arr;
    }
    );
    const [isCurrentEdit, setisCurrentEdit] = useState(Array(Sections.length + 1).fill(false))
    const sectionData = useRef<(HTMLInputElement | null)[]>(Array(Sections.length + 1).fill(null));
    async function handleRemoveSection(value: number, idx: number) {
        setSections((prev) =>
            prev.filter((_, currentIdx) => currentIdx !== idx)
        )
    }
    function nvaigationToLastStep() {
        dispatch(setCreateStep(2));
    }
    function handleAddedSectionState(index: number, value: boolean) {
        setaddedSectionState(prev => {
            const copy = [...prev];
            copy[index] = value;
            return copy;
        });
    }
    function getSectionCardsDifference() {
        const createdSectionsSorted = [...Sections].sort((a, b) => a - b);
        const copy = [...createdSectionsSorted]
        createdSectionsSorted.forEach((val, idx) => {
            const next = createdSectionsSorted[idx + 1]
            if (next !== undefined) {
                for (let i = val + 1; i < next; i++) {
                    copy.push(i)
                }
            }
        })
        return copy.sort((a, b) => a - b);
    }
    async function handleAddSection() {
        const result = getSectionCardsDifference()
        const max = result.length ? Math.max(...result) : 0;
        setSections(() => [...result, max + 1]);
    }
    function setLoading(index: number, value: boolean) {
        setisLoading(prev => {
            const copy = [...prev];
            copy[index] = value;
            return copy;
        });
    }
    function handleCurrentEditing(index: number, value: boolean) {
        setisCurrentEdit((prev) => {
            const copy = [...prev];
            copy[index] = value;
            return copy;
        })
    }
    function handleCancelEdit(index: number, value: boolean) {
        setisCurrentEdit((prev) => {
            const copy = [...prev];
            copy[index] = value;
            return copy;
        })
    }
    async function handleSubmitSection(value: number, idx: number) {
        const payload = sectionData.current[idx]?.value ?? "";
        const data: CreateSectionType = {
            title: payload,
            order: String(value),
            courseId: createCorseStore.createdCourseId,
        }
        setLoading(idx, true)
        const res = await addCourseSectionAction(data)
        if (res?.status === 200) {
            dispatch(setAddedOrder(value));
            if (res?.data) {
                dispatch(
                    setAddedSection({
                        sectionNum: value,
                        id: res.data,
                    })
                );
                handleAddedSectionState(value, true)
            }
            toast.success("Section Added Successifuly");
            setLoading(idx, false);
            return;
        }
        if (!res.IsSuccess) {
            toast.error(res?.Error?.Description)
        }
        setLoading(idx, false);
    }
    async function handleSubmitEditSection(value: number, idx: number) {
        const payload = sectionData.current[idx]?.value ?? "";
        const data: CreateSectionType = {
            title: payload,
            order: String(value),
            id: createCorseStore.section[value],
        }
        console.log(data)
        setLoading(idx, true)
        const res = await editCourseSectionAction(data)
        if (res?.status === 200) {
            handleAddedSectionState(value, true);
            handleCurrentEditing(idx, false);
            toast.success("Section Edited Successifuly");
            setLoading(idx, false);
            return;
        }
        if (!res.IsSuccess) {
            toast.error(res?.Error?.Description)
            console.log("Edit section error", res)
            handleAddedSectionState(value, true);
            handleCurrentEditing(idx, false);
            setLoading(idx, false);
            return
        }
        setLoading(idx, false);
        handleAddedSectionState(value, true);
        handleCurrentEditing(idx, false);
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
                {sortedSections.map((value, idx) => {
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
                                <CardHeader className="flex justify-between space-y-5 px-0">
                                    <Label htmlFor={String(idx)} className="text-foreground font-semibold ">Section Title</Label>
                                    <div className="space-x-2">
                                        {addedSectionState[value] && !isCurrentEdit[idx] &&
                                            <FontAwesomeIcon className="text-foreground cursor-pointer hover:text-(--primary-hover)"
                                                onClick={() => {
                                                    handleCurrentEditing(idx, true)
                                                    handleAddedSectionState(value, false)
                                                }} icon={faPenToSquare} />}
                                        {!addedSectionState[value] && isCurrentEdit[idx] && <span
                                            className="flex h-10 w-10 items-center cursor-pointer justify-center rounded-xl text-(--text-muted) transition-all duration-200 hover:bg-red-50 hover:text-red-500"
                                            onClick={() => {
                                                handleCancelEdit(idx, false)
                                                handleAddedSectionState(value, true)
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faXmark} />
                                        </span>}
                                        {!addedSectionState[value] && !isCurrentEdit[idx] && <FontAwesomeIcon onClick={() => {
                                            handleRemoveSection(value, idx)
                                        }}
                                            className={` select-none  text-(--text-muted) ${addedSectionState[value] || isCurrentEdit[idx] ? " cursor-no-drop " : " hover:text-red-500 cursor-pointer"}`}
                                            icon={faTrashCan} />}
                                    </div>
                                </CardHeader>
                                <CardContent className="px-0">
                                    <Input id={String(idx)} disabled={addedSectionState[value] || isLoading[idx]} key={value} ref={(element) => { sectionData.current[idx] = element }} className="shadow-none bg-transparent focus-visible:ring-0 border-0 border-b-2 border-border  rounded-none   py-5" placeholder={addedSectionState[value] ? "This section is added before" : "Enter Section Title"} />
                                </CardContent>
                            </div>
                        </div>
                        <CardFooter className={addedSectionState[value] ? "justify-end px-0 " : "justify-end  px-0"}>
                            {isCurrentEdit[idx] && <Button disabled={addedSectionState[value] || isLoading[idx]} onClick={() => handleSubmitEditSection(value, idx)} className={BUTTON_STYLE + " cursor-pointer  py-1/4 rounded-sm "} >
                                {isLoading[idx] ? <ButtonLoader /> : "Edit"}
                            </Button>}
                            {!isCurrentEdit[idx] && <Button disabled={addedSectionState[value] || isLoading[idx]} onClick={() => handleSubmitSection(value, idx)} className={BUTTON_STYLE + " cursor-pointer  py-1/4 rounded-sm "} >
                                {isLoading[idx] ? <ButtonLoader /> : "Add"}
                            </Button>}
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
                {createCorseStore?.sectionCreatedSuccessifuly?.length > 0 && <Button
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
                </Button>}
            </div>
        </section>
    )
}
