export interface InputPropsType {
    type?: string,
    placeholder:string,
    inputStyle: string,
    onChange:(value:string)=>void
}
export interface labelPropsType {
    title: string,
    labelStyle: string,
}
export interface ButtonPropsType {
    title: string,
    buttonStyle: string,
}