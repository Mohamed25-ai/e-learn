import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function ProfileData() {
    
    return (
        <div className='w-1/4 h-100 bg-blue-500'>
            <div className="userBackground relative bg-(--primary-color) h-1/3 ">
                <div className="userImage ">
                    <span className='absolute rounded-full w-30 h-30 flex justify-center items-center
                      bg-red-600 top-1/2 left-1/13 '>
                        <FontAwesomeIcon size='7x' 
                            className='p-10 '
                            icon={faCircleUser} />
                        <img src="" alt="" />
                    </span>
                </div>
            </div>
            <div className="userDetails h-3/4">
            </div>
        </div>
    )
}
