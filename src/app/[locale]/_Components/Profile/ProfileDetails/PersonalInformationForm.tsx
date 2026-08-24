"use client"
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import { PersonalInformationFormProps } from './profile.details.types'
import { useAppSelector } from '@/hooks/hooks'
import { faCircleUser, faEnvelope, faMobileButton, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslations } from 'next-intl'

export default function PersonalInformationForm({ userData }: PersonalInformationFormProps) {
    const t = useTranslations();
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
                            minLength: { value: 3, message: t('Profile.form.errors.fullNameMin') },
                            maxLength: { value: 20, message: t('Profile.form.errors.fullNameMax') },
                        }}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-fullName">
                                    <FontAwesomeIcon className='text-(--text-secondary)' icon={faUser} />
                                    <span className='text-(--text-secondary)'>{t('Profile.form.fullNameLabel')}</span>
                                </FieldLabel>
                                {userProfileStore.isUserEditNow && <Input
                                    {...field}
                                    className='p-5 ps-2 bg-gray-50'
                                    id="form-rhf-demo-fullName"
                                    aria-invalid={fieldState.invalid}
                                    placeholder={t('Profile.form.placeholder')}
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
                            minLength: { value: 5, message: t('Profile.form.errors.userNameMin') },
                            maxLength: { value: 20, message: t('Profile.form.errors.userNameMax') },
                        }}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-userName">
                                    <FontAwesomeIcon className='text-(--text-secondary)'
                                        icon={faCircleUser} />
                                    <span className='text-(--text-secondary)'>{t('Profile.form.userNameLabel')}</span>
                                </FieldLabel>
                                {userProfileStore.isUserEditNow && <Input
                                    {...field}
                                    className='p-5 ps-2 bg-gray-50'
                                    id="form-rhf-demo-userName"
                                    aria-invalid={fieldState.invalid}
                                    placeholder={t('Profile.form.placeholder')}
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
                            minLength: { value: 11, message: t('Profile.form.errors.phoneNumberLength') },
                            maxLength: { value: 11, message: t('Profile.form.errors.phoneNumberLength') },
                        }}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-phoneNumber">
                                    <FontAwesomeIcon className='text-(--text-secondary)' icon={faPhone} />
                                    <span className='text-(--text-secondary)'>{t('Profile.form.phoneNumberLabel')}</span>
                                </FieldLabel>
                                {userProfileStore.isUserEditNow && <Input
                                    {...field}
                                    className='p-5 ps-2 bg-gray-50'
                                    id="form-rhf-demo-phoneNumber"
                                    aria-invalid={fieldState.invalid}
                                    placeholder={t('Profile.form.placeholder')}
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
                        <span className='text-(--text-secondary)'>{t('Profile.form.emailLabel')}</span>
                    </FieldLabel>
                    <div className='mt-4'>
                        <p className='text-foreground font-bold '>{userData?.email}</p>
                    </div>
                </div>
            </FieldGroup>
        </form>
    )
}