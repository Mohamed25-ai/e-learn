"use client"
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { PersonalInformationFormProps } from './profile.details.types'
import { useAppSelector } from '@/hooks/hooks'

export default function PersonalInformationForm({ userData }: PersonalInformationFormProps) {
    const userProfileStore = useAppSelector((state) => state.userProfileSlice);
    const editPersonalInformationForm = useForm({
        defaultValues: {
            FullName: "",
            UserName: "",
            PhoneNumber: "",
            ProfilePicture: ""
        }
    })
    const { control } = editPersonalInformationForm;
    return (
        <form >
            <FieldGroup className='md:grid grid-cols-2'>
                <div>
                    <Controller
                        name="FullName"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-fullName">
                                    <span>Full Name</span>
                                </FieldLabel>
                                {userProfileStore.isUserEditNow&&<Input
                                    {...field}
                                    id="form-rhf-demo-fullName"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Login button not working on mobile"
                                    autoComplete="off"
                                />}
                                {userProfileStore.isUserEditNow&&fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                                <div>
                                    <p>{userData.fullName}</p>
                                </div>
                            </Field>
                        )}
                    />
                </div>
                <div>
                    <Controller
                        name="UserName"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-userName">
                                    <span>User Name</span>
                                </FieldLabel>
                                {userProfileStore.isUserEditNow&&<Input
                                    {...field}
                                    id="form-rhf-demo-userName"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Login button not working on mobile"
                                    autoComplete="off"
                                />}
                                {userProfileStore.isUserEditNow&&fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                                <div>
                                    <p>{userData.userName}</p>
                                </div>
                            </Field>
                        )}
                    />
                </div>
                <div>
                    <Controller
                        name="PhoneNumber"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-phoneNumber">
                                    <span>Phone Number</span>
                                </FieldLabel>
                                {userProfileStore.isUserEditNow&&<Input
                                    {...field}
                                    id="form-rhf-demo-phoneNumber"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Login button not working on mobile"
                                    autoComplete="off"
                                />}
                                {userProfileStore.isUserEditNow&&fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>
                <div>
                    <Controller
                        name="ProfilePicture"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-profilePicture">
                                    <span>Profile Picture</span>
                                </FieldLabel>
                                {userProfileStore.isUserEditNow&&<Input
                                    {...field}
                                    id="form-rhf-demo-profilePicture"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Login button not working on mobile"
                                    autoComplete="off"
                                />}
                                {userProfileStore.isUserEditNow&&fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>
            </FieldGroup>
        </form>
    )
}
