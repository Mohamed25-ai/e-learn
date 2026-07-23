"use client"
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { faCircleCheck, faCircleUser, faEye, faEyeSlash, faKey, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Controller, useForm } from 'react-hook-form'
import { ChangePasswordFormValues, ProfileSecurityProps } from './profile.details.types'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { toggleUserChangeConfirmPassword, toggleUserChangePassword, toggleUserCurrentPassword } from '@/store/redux/togglers/togglers.slice'
import { changeProfileUserPasswordAction } from '@/actions/application-user/application-user.actions'
import toast from 'react-hot-toast'

export default function ProfileSecurity({ userData }: ProfileSecurityProps) {
    const { isUserChangeConfirmPasswordShown, isUserChangeCurrentPasswordShown
        , isUserChangePasswordShown } =
        useAppSelector((state) => state.changeUserProfilePasswordIconsTogglersSlice);
    const dispatch = useAppDispatch();
    const changePasswordForm = useForm<ChangePasswordFormValues>({
        defaultValues: {
            Email: userData.email,
            CurrentPassword: "",
            NewPassword: "",
            ConfirmNewPassword: ""
        },
        mode: "onChange"
    })
    const { control, handleSubmit, getValues } = changePasswordForm;
    async function handleChangeCurrentPassword(data: ChangePasswordFormValues) {
        const formData = new FormData();
        formData.append("Email", data.Email);
        formData.append("CurrentPassword", data.CurrentPassword);
        formData.append("NewPassword", data.NewPassword);
        formData.append("ConfirmNewPassword", data.ConfirmNewPassword);
        const res = await changeProfileUserPasswordAction(formData);
            console.log(res);
        if (res.status==200) {
            console.log("res from success",res);
            toast.success("Password Changed Successifuly");
            changePasswordForm.reset();
        }else{
            toast.error(res.data.error.description);
        }
    }
    return (
        <form onSubmit={handleSubmit(handleChangeCurrentPassword)} >
            <FieldGroup className=' bg-white mt-5 p-5  '>
                <div>
                    <Controller
                        name="CurrentPassword"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Current Password is required",
                            },
                        }}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-CurrentPassword">
                                    <FontAwesomeIcon className='text-(--text-secondary)'
                                        icon={faKey} />
                                    <span className='text-(--text-secondary)'>Current Password</span>
                                </FieldLabel>
                                {<div className='flex relative justify-between'>
                                    <Input
                                        {...field}
                                        className='p-5 ps-2 bg-gray-50'
                                        id="form-rhf-demo-CurrentPassword"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your current password"
                                        autoComplete="off"
                                        type={isUserChangeCurrentPasswordShown ? 'text' : 'password'}
                                    />
                                    <FontAwesomeIcon
                                        onClick={() => dispatch(toggleUserCurrentPassword())}
                                        className={` text-(--primary-color) 
                                            absolute right-0 top-1/2 -translate-y-1/2 me-2
                                            hover:text-(--primary-hover) `}
                                        icon={isUserChangeCurrentPasswordShown ? faEyeSlash : faEye}
                                    />

                                </div>
                                }
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>
                <div>
                    <Controller
                        name="NewPassword"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Password is required",
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/~`]).{8,}$/,
                                message:
                                    "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character.",
                            },
                            validate: (value) => {
                                return (
                                    value != getValues("CurrentPassword") ||
                                    "New Password Must be different from old password"
                                )
                            }
                        }}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-NewPassword">
                                    <FontAwesomeIcon className='text-(--text-secondary)'
                                        icon={faLock} />
                                    <span className='text-(--text-secondary)'>New Password</span>
                                </FieldLabel>
                                {<div className='relative flex justify-between'>
                                    <Input
                                        {...field}
                                        className='p-5 ps-2 bg-gray-50'
                                        id="form-rhf-demo-NewPassword"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter a new password"
                                        autoComplete="off"
                                        type={isUserChangePasswordShown ? 'text' : 'password'}
                                    />
                                    <FontAwesomeIcon
                                        onClick={() => dispatch(toggleUserChangePassword())}
                                        className={` text-(--primary-color) 
                                            absolute right-0 top-1/2 -translate-y-1/2 me-2
                                            hover:text-(--primary-hover) `}
                                        icon={isUserChangePasswordShown ? faEyeSlash : faEye}
                                    />
                                </div>
                                }
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>
                <div>
                    <Controller
                        name="ConfirmNewPassword"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Confirm Password is required",
                            },
                            validate: (value) => {
                                return (
                                    value === getValues("NewPassword") ||
                                    "Passwords do not match"
                                );
                            },
                        }}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-ConfirmNewPassword">
                                    <FontAwesomeIcon
                                        className='text-(--text-secondary)'
                                        icon={faLock} />
                                    <span className='text-(--text-secondary)'>Confirm New Password</span>
                                </FieldLabel>
                                {<div className='relative flex justify-between'>
                                    <Input
                                        {...field}
                                        className='p-5 ps-2 bg-gray-50'
                                        id="form-rhf-demo-ConfirmNewPassword"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Confirm your password"
                                        autoComplete="off"
                                        type={isUserChangeConfirmPasswordShown ? 'text' : 'password'}
                                    />
                                    <FontAwesomeIcon
                                        onClick={() => dispatch(toggleUserChangeConfirmPassword())}
                                        className={` text-(--primary-color) 
                                            absolute right-0 top-1/2 -translate-y-1/2 me-2
                                            hover:text-(--primary-hover) `}
                                        icon={isUserChangeConfirmPasswordShown ? faEyeSlash : faEye}
                                    />
                                </div>
                                }
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>
                <div>
                    <Button type='submit' className='bg-(--primary-color)
                    hover:shadow hover:bg-(--primary-color)
                    text-white font-bold w-full py-6 cursor-pointer rounded-2xl'>
                        <FontAwesomeIcon icon={faCircleCheck} />
                        Update Password
                    </Button>
                </div>
            </FieldGroup>
        </form>
    )
}
