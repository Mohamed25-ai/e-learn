export type UserProfileData = {
    email: string,
    fullName: string,
    id: string,
    profilePictureUrl: string,
    userName: string
}
export type ProfileProps = {
    data: UserProfileData,
}
export type ProfileDataCardProps = {
    data: UserProfileData,
    onSubmit: () => void,
}
