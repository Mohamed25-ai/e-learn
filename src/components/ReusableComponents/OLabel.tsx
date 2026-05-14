import { Label } from "../ui/label";
import { labelPropsType } from "./reusablecomponents.types";

export default function OLabel({labelStyle,title}:labelPropsType) {
  return (
    <>
      <Label className={labelStyle}>{title}</Label>
    </>
  )
}
