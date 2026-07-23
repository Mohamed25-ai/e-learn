import { UserProfileData } from "../profile.types"

export type ProfileDetailsTogglerProps = {

}
export type ProfileDetailsProps = {
    userData: UserProfileData
}
export type PersonalInformationProps = {
    userData: UserProfileData

}
export type PersonalInformationFormProps = {
    userData: UserProfileData
}
export type ProfileSecurityProps = {
    userData: UserProfileData

}
export type ChangePasswordFormValues = {
    Email: string,
    CurrentPassword: string,
    NewPassword: string,
    ConfirmNewPassword: string
}