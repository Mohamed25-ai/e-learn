import BecomeInstructorFooter from "./BecomeInstructorFooter";
import BecomeInstructorHowItWorks from "./BecomeInstructorHowItWorks";
import BecomeInstructorShareKnowledge from "./BecomeInstructorShareKnowledge";
import BecomeInstructorWhyTeach from "./BecomeInstructorWhyTeach";

export default function BecomeInstructorLanding() {
  return (
    <div>
      <BecomeInstructorShareKnowledge />
      <BecomeInstructorWhyTeach />
      <BecomeInstructorHowItWorks />
      <BecomeInstructorFooter/>
    </div>
  )
}
