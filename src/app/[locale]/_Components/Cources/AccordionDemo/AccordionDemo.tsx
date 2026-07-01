'use client'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react"
import { AccordionDemoProps } from "./Accordion.demo.types"

export function AccordionDemo({contentData,section}:AccordionDemoProps) {
    const [accordionValue, setaccordionValue] = useState("")
    function handleAccordionValue(value:string){
        setaccordionValue(value)
    }
    const sectionid=section.id??""
    return (
        <Accordion
            type="single"
            collapsible
            // defaultValue="shipping"
            onValueChange={handleAccordionValue}
            className=" md:w-3/4 "
        >
            <AccordionItem className="border my-5  rounded-lg" value={section.id||""}>
                    <AccordionTrigger  className={`${accordionValue==sectionid&&"bg-(--primary-light) "} px-2`}>{section.title||""}</AccordionTrigger>
                    {contentData.map((content)=>(<AccordionContent className="p-3">
                        <div className="bg-amber-200">
                            <h2>{content.title}</h2>
                            <p></p>
                        </div>
                    </AccordionContent>))}
                
            </AccordionItem>
            {/* <AccordionItem className="border my-2 px-2 rounded-lg" value="returns">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                    Returns accepted within 30 days. Items must be unused and in original
                    packaging. Refunds processed within 5-7 business days.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem className="border my-2 px-2 rounded-lg" value="support">
                <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
                <AccordionContent>
                    Reach us via email, live chat, or phone. We respond within 24 hours
                    during business days.
                </AccordionContent>
            </AccordionItem> */}
        </Accordion>
    )
}
