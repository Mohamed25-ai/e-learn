"use client"
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import { PersonalInformationFormProps } from './profile.details.types'
import { useAppSelector } from '@/hooks/hooks'
import { faCircleUser, faEnvelope, faMobileButton, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function PersonalInformationForm({ userData }: PersonalInformationFormProps) {
    const userProfileStore = useAppSelector((state) => state.userProfileSlice);
    const { control, } = useFormContext();
    return (
        <form >
            <FieldGroup className='md:grid grid-cols-2  md:p-5 md:pt-0 '>
                <div>
                    <Controller
                        name="FullName"
                        control={control}
                        rules={{
                            minLength: { value: 3, message: "Minimum Length is 3 Characters" },
                            maxLength: { value: 20, message: "Max Length is 20 Characters" },
                        }}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-fullName">
                                    <FontAwesomeIcon className='text-(--text-secondary)' icon={faUser} />
                                    <span className='text-(--text-secondary)'>Full Name</span>
                                </FieldLabel>
                                {userProfileStore.isUserEditNow && <Input
                                    {...field}
                                    className='p-5 ps-2 bg-gray-50'
                                    id="form-rhf-demo-fullName"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Login button not working on mobile"
                                    autoComplete="off"
                                />}
                                {userProfileStore.isUserEditNow && fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                                {!userProfileStore.isUserEditNow && <div className=''>
                                    <p className='text-foreground font-bold '>{userData.fullName}</p>
                                </div>}
                            </Field>
                        )}
                    />
                </div>
                <div>
                    <Controller
                        name="UserName"
                        control={control}
                        rules={{
                            minLength: { value: 5, message: "Minimum Length is 5 Characters" },
                            maxLength: { value: 20, message: "Max Length is 20 Characters" },
                        }}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-userName">
                                    <FontAwesomeIcon className='text-(--text-secondary)'
                                        icon={faCircleUser} />
                                    <span className='text-(--text-secondary)'>User Name</span>
                                </FieldLabel>
                                {userProfileStore.isUserEditNow && <Input
                                    {...field}
                                    className='p-5 ps-2 bg-gray-50'
                                    id="form-rhf-demo-userName"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Login button not working on mobile"
                                    autoComplete="off"
                                />}
                                {userProfileStore.isUserEditNow && fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                                {!userProfileStore.isUserEditNow && <div className=''>
                                    <p className='text-foreground font-bold '>{userData.userName}</p>
                                </div>}
                            </Field>
                        )}
                    />
                </div>
                <div>
                    <Controller
                        name="PhoneNumber"
                        control={control}
                        rules={{
                            minLength: { value: 11, message: "Phone Number must be 11 Characters" },
                            maxLength: { value: 11, message: "Phone Number must be 11 Characters" },
                        }}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-phoneNumber">
                                    <FontAwesomeIcon className='text-(--text-secondary)' icon={faPhone} />
                                    <span className='text-(--text-secondary)'>Phone Number</span>
                                </FieldLabel>
                                {userProfileStore.isUserEditNow && <Input
                                    {...field}
                                    className='p-5 ps-2 bg-gray-50'
                                    id="form-rhf-demo-phoneNumber"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Login button not working on mobile"
                                    autoComplete="off"
                                />}
                                {userProfileStore.isUserEditNow && fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                                {!userProfileStore.isUserEditNow && <div className=''>
                                    <p className='text-foreground font-bold '>{"01200000000"}</p>
                                </div>}
                            </Field>
                        )}
                    />
                </div>
                <div>
                    <FieldLabel htmlFor="form-rhf-demo-Email">
                        <FontAwesomeIcon className='text-(--text-secondary)'
                            icon={faEnvelope} />
                        <span className='text-(--text-secondary)'>Email</span>
                    </FieldLabel>
                    <div className='mt-4'>
                        <p className='text-foreground font-bold '>{userData?.email}</p>
                    </div>
                </div>
            </FieldGroup>
        </form>
    )
}
