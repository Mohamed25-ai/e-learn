
// export const INPUT_STYLE=' bg-(--input-background) transition-all border-2 outline-2 focus-visible:ring-(--primary-light) focus-visible:border-(--primary-color)  border-(--primary-light) shadow-xl  rounded-xl p-6 text-foreground placeholder:text-(--text-muted) rtl:text-[13px] ';
// export const LABEL_STYLE="  text-foreground text-xl";
// export const BUTTON_STYLE=" my-5 py-6 px-7 rounded-xl bg-(--primary-color) text-white  transition-colors   hover:bg-(--primary-hover) border hover:border hover:border-(--primary-color) text-xl cursor-pointer ";
// export const MAIN_BUTTON=" rounded-xl hover:bg-(--primary-color) hover:text-white text-(--primary-color)  transition-colors   hover:bg-(--primary-hover) border-1  border-(--primary-color)  hover:border-(--primary-color)  cursor-pointer ";
export const INPUT_STYLE =
    'bg-(--input-background) transition-all border-2 outline-2 ' +
    'focus-visible:ring-(--primary-light) focus-visible:border-(--primary-color) ' +
    'border-(--primary-light) shadow-xl rounded-xl p-6 ' +
    'text-foreground placeholder:text-(--text-muted) rtl:text-[13px] ' +
    '[&_*]:text-foreground ' + // all children text
    'selection:bg-(--primary-color) selection:text-white '; // ← text selection color

export const LABEL_STYLE =
    'text-foreground text-xl';

export const BUTTON_STYLE =
    'my-5 py-6 px-7 rounded-xl bg-(--primary-color) text-white transition-colors ' +
    'hover:bg-(--primary-hover) border hover:border hover:border-(--primary-color) ' +
    'text-xl cursor-pointer ' +
    'selection:bg-white selection:text-(--primary-color)';

export const MAIN_BUTTON =
    'rounded-xl text-(--primary-color) transition-colors ' +
    'hover:bg-(--primary-color) hover:text-white ' +
    'border border-(--primary-color) hover:border-(--primary-color) ' +
    'cursor-pointer ' +
    'selection:bg-(--primary-color) selection:text-white';