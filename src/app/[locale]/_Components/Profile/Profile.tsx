import { Button } from "@/components/ui/button";
import { ProfileProps } from "./profile.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import ProfileDataCard from "./ProfileDataCard";
import ProfileDetails from "./ProfileDetails/ProfileDetails";
import { Link } from "@/i18n/navigation";

export default function Profile({ data }: ProfileProps) {
    return (
        <section>
            <header className="bg-white border-b px-5">
                <div className="flex items-center justify-between py-6">
                    <div>
                        <h2 className="text-2xl text-foreground font-bold">My Profile</h2>
                        <p className="text-(--text-secondary)">Manage your account and track your progress</p>
                    </div>

                    <Link href={'/'} className="bg-(--primary-color) px-2 md:px-5 py-3 text-nowrap 
                    font-bold rounded-2xl text-white hover:bg-(--primary-color) ">
                        <FontAwesomeIcon className="me-2" icon={faBookOpen} />
                        Back to Dashboard</Link>
                </div>
            </header>
            <div className="px-5 mt-5 md:flex gap-5">
                <ProfileDataCard data={data} />
                <ProfileDetails userData={data} />
            </div>
        </section>
    );
}
