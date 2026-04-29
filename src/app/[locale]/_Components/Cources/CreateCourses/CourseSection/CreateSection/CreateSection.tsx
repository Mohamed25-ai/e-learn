import { CreateSectionProps } from "../createsection.type";
import { useAppSelector } from "@/hooks/hooks";
import { useDispatch } from "react-redux";
import { SectionCard } from "../SectionCard/SectionCard";
import { useEffect } from "react";
import { setCreateStep } from "@/store/redux/createcourse/createcourseslice";


export default  function CreateSection() {
    return (
        <>
            <SectionCard  />
        </>
    )
}
