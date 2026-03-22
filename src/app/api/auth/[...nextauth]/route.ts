import { nextAuthConfig } from "@/next-auth/nextauth.config";
import NextAuth from "next-auth";

const auth=NextAuth(nextAuthConfig);
export {auth as GET,auth as POST}