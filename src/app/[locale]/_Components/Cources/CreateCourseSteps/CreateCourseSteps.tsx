import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

type Step = {
    titleKey: string;
    descriptionKey: string;
};

const STEPS: Step[] = [
    { titleKey: "basicInformation.title", descriptionKey: "basicInformation.description" },
    { titleKey: "courseContent.title", descriptionKey: "courseContent.description" },
    { titleKey: "pricing.title", descriptionKey: "pricing.description" },
    { titleKey: "publish.title", descriptionKey: "publish.description" },
];

export default function CreateCourseSteps({ currentStep = 0 }: { currentStep?: number }) {
    const t = useTranslations("Course.createcourse.steps");

    return (
    <header className="w-full lg:w-3/4 mx-auto flex items-center justify-between px-2 py-4 sm:px-4 md:px-6 md:py-5">
        {STEPS.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
                <div key={index} className="flex flex-1 items-center gap-x-1.5 sm:gap-x-2 md:gap-x-3">

                    {/* Circle */}
                    <div
                        className={`relative flex shrink-0 items-center justify-center rounded-full
                            border-2 font-bold transition-all duration-300
                            h-8 w-8 text-xs sm:h-9 sm:w-9 sm:text-sm md:h-11 md:w-11 md:text-sm
                            ${isCompleted
                                ? "border-(--primary-color) bg-(--primary-color) text-white shadow-[0_0_0_4px_color-mix(in_srgb,var(--primary-color)_15%,transparent)]"
                                : isActive
                                ? "border-(--primary-color) bg-(--primary-color) text-white shadow-[0_0_0_4px_color-mix(in_srgb,var(--primary-color)_15%,transparent)] scale-105"
                                : "border-border bg-(--primary-light) text-(--text-secondary)"
                            }`}
                    >
                        {isCompleted ? (
                            <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
                        ) : (
                            index + 1
                        )}
                        {isActive && (
                            <span className="absolute inset-0 rounded-full border-2 border-(--primary-color) opacity-40 animate-ping" />
                        )}
                    </div>

                    {/* Text */}
                    <div className="hidden flex-col sm:flex">
                        <span
                            className={`text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300 md:text-xs
                                ${isCompleted ? "text-(--primary-color)" : "text-(--text-muted)"}`}
                        >
                            {t(step.descriptionKey)}
                        </span>
                        <h2
                            className={`text-xs font-bold transition-colors duration-300 md:text-sm
                                ${isActive ? "text-(--primary-color)" : "text-foreground"}`}
                        >
                            {t(step.titleKey)}
                        </h2>
                    </div>

                    {/* Connector line */}
                    {index !== STEPS.length - 1 && (
                        <div className="relative mx-1 hidden h-0.5 flex-1 overflow-hidden rounded-full bg-border sm:block md:mx-2">
                            <div
                                className={`absolute inset-y-0 start-0 rounded-full bg-(--primary-color) transition-all duration-500
                                    ${isCompleted ? "w-full" : "w-0"}`}
                            />
                        </div>
                    )}
                </div>
            );
        })}
    </header>
);
}