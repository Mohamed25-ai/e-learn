export type UserData={
    name:string,
    email:string,
    image?:string
}
export type UserDropdownProps={
    isUserAuthenticated:boolean,
    user:UserData,
    userRoles?:string[]|string,
}
type NavbarLinksType={
    href:string,
    label:string
}
export type NavbarInMobileProps={
    currentPath:string,
    navbarLinks:NavbarLinksType[],
    toggleSidebar:()=>void
    toggleNavbar:()=>void
}