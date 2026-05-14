
import toast from "react-hot-toast";
import AuthUser from "../../_Components/Auth/AuthUser/AuthUser";
import { LoginPageProps } from "./loginpage.types";
const REASON_MESSAGES: Record<string, string> = {
  SessionExpired: "Your session has expired. Please log in again.",
  RefreshTokenExpired: "Your session has expired. Please log in again.",
  RefreshAccessTokenError: "Authentication error. Please log in again.",
  MissingTokenData: "Something went wrong. Please log in again.",
};
export default async function page({ searchParams }: LoginPageProps) {
    const { reason } = await searchParams;
    const message = reason ? REASON_MESSAGES[reason] : null;
  return (
    <>
    {message && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                    {message}
                </div>
            )}
      <AuthUser />
    </>
  )
}
