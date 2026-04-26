
import toast from "react-hot-toast";
import AuthUser from "../../_Components/Auth/AuthUser/AuthUser";
import { LoginPageProps } from "./loginpage.types";

export default async function page({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  if(params?.error === "true"){
    toast.error("Please, relogin again");
  }
  return (
    <>
      {params?.error === "true" && (
        <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
          Your session expired. Please login again.
        </div>
      )}
      <AuthUser />
    </>
  )
}
