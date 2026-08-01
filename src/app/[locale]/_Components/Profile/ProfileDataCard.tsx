"use client"
import { faAward, faBookOpen, faCamera, faCircleCheck, faCircleUser, faClock, faFloppyDisk, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProfileDataCardProps, ProfileProps } from './profile.types'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { setEditUserProfileState, setTemporaryProfileImageForEdit, toggleEditUserProfile } from '@/store/redux/userprofile/userprofile.slice'
import { Input } from '@/components/ui/input'
import { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ButtonLoader } from '../Loaders/ButtonLoader/ButtonLoader'
import { useSession } from 'next-auth/react'


export default function ProfileDataCard({ data, onSubmit }: ProfileDataCardProps) {
    const { isUserEditNow, temporaryProfileImageForEditUrl, temporaryProfileImageForEdit } = useAppSelector((state) => state.userProfileSlice);
    const temporayProfileImageEdited = useRef<HTMLInputElement | null>(null);
    const userSession=useSession();
    const { formState } = useFormContext();
    const [imageUrl, setimageUrl] = useState<string | null>("")
    const dispatch = useAppDispatch();
    function handleEnableEditUserProfile() {
        dispatch(toggleEditUserProfile());
    }
    function handleDisableEditUserProfile() {
        temporayProfileImageEdited.current = null;
        setimageUrl(data.profilePictureUrl);
        dispatch(setEditUserProfileState(false));
    }
    function handlePreviewEditedImage() {
        const file = temporayProfileImageEdited.current?.files?.[0];
        if (!file) return
        const imageFileUrl = URL.createObjectURL(file);
        dispatch(setTemporaryProfileImageForEdit(file));
        setimageUrl(imageFileUrl);
    }
    function handleSaveEditUserProfile() {
        onSubmit();
    }
    return (
        <div className=' md:w-1/4  bg-white rounded-2xl'>
            <div className="userBackground relative h-30 bg-(--primary-color) rounded-tl-2xl rounded-tr-2xl  ">
                <div className="userImage ">
                    {!data.profilePictureUrl && <span className='absolute rounded-full w-30 h-30 flex justify-center items-center
                      bg-(--primary-light) top-1/2 left-1/13 '>
                        <FontAwesomeIcon size='7x'
                            className='p-10 text-(--primary-color)'
                            icon={faCircleUser} />
                    </span>}
                    <div>
                        {data.profilePictureUrl && <div className='absolute rounded-full w-30 h-30 flex 
                    justify-center items-center
                      bg-(--primary-light) top-1/2 left-1/13 '>
                            <div className='relative w-30 h-30 '>
                                {<Image className='rounded-full ' fill src={data.profilePictureUrl} alt={data.fullName} />}
                            </div>
                        </div>}
                        {isUserEditNow && temporaryProfileImageForEdit && <div className='absolute rounded-full w-30 h-30 flex 
                    justify-center items-center
                      bg-(--primary-light) top-1/2 left-1/13 '>
                            <div className='relative w-30 h-30 '>
                                {imageUrl && <Image className='rounded-full ' fill src={imageUrl!} alt={data.fullName} />}
                            </div>
                        </div>}
                        {isUserEditNow&&!userSession.data?.isLoggedByGoogle && (
                            <label
                                htmlFor="profile-image"
                                className="bg-(--primary-color) mt-5 w-10 h-10
                                            flex items-center justify-center
                                            rounded-full absolute top-full right-5
                                            cursor-pointer"
                            >
                                <Input
                                    id="profile-image"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={temporayProfileImageEdited}
                                    onChange={handlePreviewEditedImage}
                                />
                                <FontAwesomeIcon
                                    className="text-white"
                                    icon={faCamera}
                                />
                            </label>
                        )}
                    </div>
                </div>
            </div>
            <div className="userDetails  mt-12 ">
                <div className='flex items-center py-5 justify-center flex-col'>
                    <h3 className='text-foreground text-xl font-bold'>{data.fullName}</h3>
                    <span className='text-(--text-secondary)'>Software Developer</span>
                    <span className='text-(--text-secondary)'>Joined January 2024</span>
                </div>
                <div className='grid grid-cols-2 mx-2 gap-3 mt-2'>
                    <div className='bg-[#FAFBFC] rounded-xl px-2 py-4 flex 
                    flex-col items-center justify-center'>
                        <span className='w-10 h-10 flex items-center justify-center bg-(--primary-light) rounded-full'>
                            <FontAwesomeIcon className='text-(--primary-color)' icon={faBookOpen} />
                        </span>
                        <span className='text-foreground font-bold text-xl'>12</span>
                        <span>Courses Enrolled</span>
                    </div>
                    <div className='bg-[#FAFBFC] rounded-xl px-2 py-4 flex 
                    flex-col items-center justify-center'>
                        <span className='w-10 h-10 flex items-center justify-center bg-(--primary-light) rounded-full'>
                            <FontAwesomeIcon className='text-(--primary-color)' icon={faCircleCheck} />
                        </span>
                        <span className='text-foreground font-bold text-xl'>8</span>
                        <span>Completed</span>
                    </div>
                    <div className='bg-[#FAFBFC] rounded-xl px-2 py-4 flex 
                    flex-col items-center justify-center'>
                        <span className='w-10 h-10 flex items-center justify-center bg-(--primary-light) rounded-full'>
                            <FontAwesomeIcon className='text-(--primary-color)' icon={faClock} />
                        </span>
                        <span className='text-foreground font-bold text-xl'>4</span>
                        <span>In Progress</span>
                    </div>
                    <div className='bg-[#FAFBFC] rounded-xl px-2 py-4 flex 
                    flex-col items-center justify-center'>
                        <span className='w-10 h-10 flex items-center justify-center bg-(--primary-light) rounded-full'>
                            <FontAwesomeIcon className='text-(--primary-color)' icon={faAward} />
                        </span>
                        <span className='text-foreground font-bold text-xl'>12</span>
                        <span>Certificates</span>
                    </div>
                </div>
                {!isUserEditNow && <div className="edit-btn my-5 p-2">
                    <button onClick={handleEnableEditUserProfile} className='p-4 cursor-pointer bg-(--primary-color)
                     text-white font-bold w-full rounded-2xl '>
                        <FontAwesomeIcon className='me-2' icon={faPenToSquare} />
                        Edit Profile
                    </button>
                </div>}
                {isUserEditNow && <div className="edit-btn flex gap-2 my-5 p-2">
                    <button onClick={handleDisableEditUserProfile} className='p-4 cursor-pointer border bg-white
                        text-(--text-secondary) font-bold w-full rounded-2xl
                        hover:border-(--primary-color) hover:text-(--primary-color)'>
                        <FontAwesomeIcon icon={faXmark} />
                        Cancel
                    </button>
                    <button onClick={handleSaveEditUserProfile} className='p-4 cursor-pointer bg-(--primary-color)
                     text-white font-bold w-full rounded-2xl '>
                        {formState.isSubmitting ? <ButtonLoader /> : <>
                            <FontAwesomeIcon className='me-1' icon={faFloppyDisk} />save changes
                        </>
                        }
                    </button>
                </div>}
            </div>
        </div>
    )
}
