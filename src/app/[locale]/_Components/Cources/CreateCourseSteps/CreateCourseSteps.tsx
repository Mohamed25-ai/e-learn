import { Check } from 'lucide-react';
type Step = {
    title: string;
    description: string;
};

const STEPS: Step[] = [
    { title: "Basic Information", description: "Step 1" },
    { title: "Course Content", description: "Step 2" },
    { title: "Pricing", description: "Step 3" },
    { title: "Publish", description: "Step 4" },
];

export default function CreateCourseSteps({currentStep = 0,}: {currentStep?: number;}) {
    return (
        <header className="flex items-center bg-amber-300 ps-0.5 md:ps-5  justify-between md:gap-x-4">
            {STEPS.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                return (
                    <div key={index} className="flex   items-center flex-1 gap-x-1.5 md:gap-x-3">

                        {/* 🔵 Circle */}
                        <div
                            className={`flex h-10 w-10  items-center justify-center rounded-full text-sm font-semibold border transition-all
                                    ${isCompleted
                                    ? "bg-(--primary-color) text-white border-(--primary-color) "
                                    : isActive
                                        ? "bg-(--primary-color) text-white border-(--primary-color)"
                                        : "bg-(--primary-light) text-(--text-secondary) border-borde "
                                }`}
                        >
                            {isCompleted?<Check />:index + 1}
                        </div>

                        {/* 🔵 Text */}
                        <div className="flex flex-col ">
                            <span className={`${isCompleted&& "text-(--primary-color)!" }  text-xs text-(--text-muted)`}>
                                {step.description}
                            </span>

                            <h2
                                className={`text-sm  font-bold transition-colors 
                    ${isActive
                                        ? "text-(--primary-color)"
                                        : "text-foreground"
                                    }
                `}
                            >
                                {step.title}
                            </h2>
                        </div>

                        {/* 🔵 Line */}
                        {index !== STEPS.length - 1 && (
                            <div className={`${isCompleted&& " bg-(--primary-color)! "} hidden  md:block flex-1 h-0.5 bg-border mx-2 `} />
                        )}
                    </div>
                );
            })}
        </header>
    );
}