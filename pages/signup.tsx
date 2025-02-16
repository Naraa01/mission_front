import React, { useState } from 'react'
import { useAlert } from '../components/hooks/UseAlert'
import { LoginRequest, RegisterValidation } from '../types/common'
import { useCommonContext } from '../context/CommonContext'
import { useAuthGuard } from '../lib/auth/auth'
import { FormInput } from '../components/common/FormElements'
import { Button } from '../components/common/Button'
import Link from 'next/link'
import { CreateUserRequest } from '../models/backend'
import { restClient } from '../lib/httpClient'
import { HttpErrorResponse } from '../models/HttpErrorResponse'
import ErrorFeedback from '../components/common/ErrorFeedback'

function Signup() {
  const [show, Alert] = useAlert()

  const [formState, setFormState] = useState<CreateUserRequest>({
    email: '',
    password: '',
    passwordConfirmation: '',
    lastName: '',
    firstName: '',
  })
  const [errors, setErrors] = React.useState<HttpErrorResponse | undefined>(undefined)

  const { refetchUser, setUser } = useCommonContext()

  const { login } = useAuthGuard({ middleware: 'guest', redirectIfAuthenticated: '/' })

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = RegisterValidation.safeParse(formState)

    if (!result.success) {
      const messages = result?.error?.errors?.[0]?.message
      show({ message: messages, type: 'error' })
      return
    }

    restClient
      .createUser(formState)
      .then(() => {
        show({ message: 'Account created successfully', type: 'success' })

        setTimeout(() => {
            window.location.pathname = '/login'
        }, 2000)
        // setSuccess(true)
      })
      .catch((error) => {
        const errData = error.response.data as HttpErrorResponse
        setErrors(errData)
        // show({ message: (err as { message: string })?.message || (err as string), type: 'error' })
      })
      .finally(() => {
        // setIsLoading(false)
      })
  }

  return (
    <div className="lg:flex lg:flex-row-reverse h-screen">
      <div className="flex flex-col justify-between px-6 lg:px-0 flex-1 h-full">
        <div className="w-full flex flex-col justify-center flex-1">
          {/* <div className="flex justify-center items-center">
            <Link href="/">
              <Image src="/assets/mobile-logo.png" width={48} height={48} alt="" />
            </Link>
          </div> */}
          <div className="w-full md:w-[360px] mx-auto">
            <>
              <h1 className="font-semibold text-3xl text-center mt-6">{'Бүртгүүлэх'}</h1>
              <form className="mt-8 space-y-4 w-full flex flex-col" onSubmit={handleSignUp}>
                <FormInput
                  name={'email'}
                  type={'text'}
                  label="И-мэйл хаяг"
                  placeholder="Бүртгүүлэх И-Мэйл хаяг"
                  onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                />
                <FormInput
                  name={'pwd'}
                  type={'password'}
                  label="Нууц үг"
                  placeholder="Нууц үг оруулна уу"
                  onChange={(e) => setFormState((prev) => ({ ...prev, password: e.target.value }))}
                />
                <FormInput
                  name={'confirmPwd'}
                  type={'password'}
                  label="Баталгаажуулах нууц үг"
                  placeholder="Баталгаажуулах нууц үг оруулна уу"
                  onChange={(e) => setFormState((prev) => ({ ...prev, passwordConfirmation: e.target.value }))}
                />
                <FormInput
                  name={'pwd'}
                  type={'text'}
                  label="Овог"
                  placeholder="Овог оруулна уу"
                  onChange={(e) => setFormState((prev) => ({ ...prev, lastName: e.target.value }))}
                />
                <FormInput
                  name={'pwd'}
                  type={'text'}
                  label="Нэр"
                  placeholder="Нэр оруулна уу"
                  onChange={(e) => setFormState((prev) => ({ ...prev, firstName: e.target.value }))}
                />

                {/* <div className="flex justify-end items-center w-full text-[12px] md:text-[14px]">
                  <Link href="/forgot" className="font-semibold text-primary-600">
                    {'Нууц үгээ мартсан'}
                  </Link>
                </div> */}

                <ErrorFeedback data={errors} />

                <div className="flex flex-col md:items-center space-y-4 py-2 text-white font-bold w-full text-[14px]">
                  <Button
                    // loading={isLoading}
                    size="fullWidth"
                    rounded="xl"
                    type="submit"
                    disabled={!(formState.email && formState.password)}
                  >
                    {'Бүртгүүлэх'}
                  </Button>

                  <p className="text-slate-400 font-bold w-full text-center px-6">
                    {'Хэрэв та бүртгэлтэй бол '}
                    <Link href="/login" className="text-primary-600 underline ">
                      {'энд'}
                    </Link>
                    {' дарж нэвтэрнэ үү.'}
                  </p>
                </div>
              </form>
              <Alert />
            </>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
