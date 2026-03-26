import { addInstrucorRuleAction } from '@/actions/courses/courses.actions'
import CreateCourse from '@/app/[locale]/_Components/Cources/CreateCourse/CreateCourse'
import { Button } from '@/components/ui/button'
import { getUserToken } from '@/utils/getAuthenticatedUserToken/getAuthenticatedUserToken'
import { BUTTON_STYLE } from '@/utils/utils'
import axios from 'axios'

export default function page() {

    return (
        <>
            <CreateCourse />
            
        </>
    )
}
