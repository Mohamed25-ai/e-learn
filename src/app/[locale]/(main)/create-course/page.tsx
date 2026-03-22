'use client'
import { addInstrucorRuleAction } from '@/actions/courses/courses.actions'
import { Button } from '@/components/ui/button'
import { getUserToken } from '@/utils/getAuthenticatedUserToken/getAuthenticatedUserToken'
import { BUTTON_STYLE } from '@/utils/utils'
import axios from 'axios'

export default function page() {
    async function handleBecomeInstructor() {
        await addInstrucorRuleAction();
    }

    return (
        <div>
            <h1>Create a new cource</h1>
            <Button onClick={handleBecomeInstructor} className={BUTTON_STYLE}>Become istructor</Button>
        </div>
    )
}
