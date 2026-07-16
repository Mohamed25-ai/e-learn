"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PersonalInformationProps } from "./profile.details.types"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PersonalInformationForm from "./PersonalInformationForm"

export default function PersonalInformation({ userData }: PersonalInformationProps) {
  return (
    <Card className="mt-5">
      <CardHeader>
        <h2 className="text-foreground font-bold">
          <FontAwesomeIcon className="me-2 text-(--primary-color)" icon={faGear} />
          Personal Information
        </h2>
      </CardHeader>
      <CardContent>
        <PersonalInformationForm userData={userData}/>
      </CardContent>
    </Card>
  )
}
