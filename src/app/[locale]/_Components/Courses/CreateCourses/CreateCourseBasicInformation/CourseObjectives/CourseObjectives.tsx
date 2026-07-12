'use client'

import { Input } from "@/components/ui/input"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react"
import { CourseObjectivesProps } from "../createcoursecbasicinformation.types"
import { useTranslations } from "next-intl"

export default function CourseObjectives({ onChange }: CourseObjectivesProps) {
    const t = useTranslations("Course");
    const [objectivies, setobjectivies] = useState([1]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(objectivies.length).fill(null));
    const [objectivesValues, setObjectivesValues] = useState<string[]>([""]);
    function handleAddObjectives() {
        setobjectivies((prev) => {
            const maxElement = Math.max(...prev) || 0
            return [...prev, maxElement + 1].sort((a, b) => a - b);
        })
        setObjectivesValues(prev => [...prev]);
    }
    function handleRemoveObjective(index: number) {
        if (objectivies.length === 1) return;
        setobjectivies(prev => {
            const filtered = prev.filter((_, item) => item !== index);
            return filtered.map((_, i) => i + 1);
        });
        const updated = [...objectivesValues];
        updated.splice(index, 1)
        setObjectivesValues(updated);
        onChange(updated)
    }
    function handleObjectiveInput(index: number) {
        const value = inputRefs.current[index]?.value ?? "";
        const updated = [...objectivesValues];
        updated[index] = value;
        setObjectivesValues(updated);
        onChange(updated);
    }
    return (
        <div>
            {objectivies.map((objective, i) => (<div key={objective} className="my-2.5">
                <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 flex items-center justify-center
                    rounded-full bg-(--primary-light) text-(--primary-color)">
                        {objective}
                    </span>
                    <div className=" w-full">
                        <Input
                            id="Objectives"
                            placeholder={t("createcourse.objectives.placeholder")}
                            onChange={() => handleObjectiveInput(i)}
                            ref={(el) => { inputRefs.current[i] = el; }}
                            className="INPUT_STYLE "
                        />                    </div>
                    <div className="deleteIcon">
                        <FontAwesomeIcon className="text-(--primary-color)" onClick={() => handleRemoveObjective(i)} icon={faTrashCan} />
                    </div>
                </div>
            </div>))}
            <button type="button" className="my-3 cursor-pointer text-(--primary-color)" onClick={handleAddObjectives}>
                {t("createcourse.objectives.addButton")}
            </button>
        </div>
    )
}
