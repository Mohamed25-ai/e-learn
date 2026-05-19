import { Button } from "@/components/ui/button";
import ProfileData from "./ProfileData";

export default function Profile() {
    return (
        <>
        <header>
            <div>
            <h2>My Profile</h2>
            <p>Manage your account and track your progress</p>
            </div>
            <div className="toDashBoard">
                <Button>Back to Dashboard</Button>
            </div>
        </header>
        <section>
            <div className="profileDetails w-full">
                <ProfileData />
            </div>
        </section>
        </>
    )
}
