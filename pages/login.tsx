import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FormInput } from '../components/common/FormElements'
import { Button } from '../components/common/Button'
import { useAlert } from '../components/hooks/UseAlert'
import { LoginRequest } from '../types/common'
import { useAuthGuard } from '../lib/auth/auth'

function Login() {
  const [show, Alert] = useAlert()

  const [formState, setFormState] = useState<LoginRequest>({ email: '', password: '' })

  const { login } = useAuthGuard({ middleware: 'guest', redirectIfAuthenticated: '/' })

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      login({
        onError: (errors) => {
          // setErrors(errors)
          if (errors) {
            show({ message: 'Authentication failed', type: 'error' })
          }
        },
        props: formState,
      })

      // validation
      // const result = LoginValidation.safeParse(formState)

      // if (!result.success) {
      //   const messages = result?.error?.errors?.[0]?.message
      //   show({ message: messages, type: 'error' })
      //   return
      // }

      // const user = await login(formState).unwrap()
      // setUser?.({
      //   email: user.user?.email,
      //   firstName: user.user?.firstName,
      //   lastName: user.user?.lastName,
      //   profilePic: user.user?.profilePic,
      //   phone: user.user?.phone,
      //   id: user.user?.id,
      // })
      // dispatch(setCredentials(user))
      // router.push('/')
    } catch (err) {
      show({ message: (err as { message: string })?.message || (err as string), type: 'error' })
    }
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
              <h1 className="font-semibold text-3xl text-center mt-6">{'Нэвтрэх'}</h1>
              <form className="mt-8 space-y-4 w-full flex flex-col" onSubmit={handleLogin}>
                <FormInput
                  name={'email'}
                  type={'text'}
                  label="И-мэйл хаяг"
                  placeholder="Бүртгэлтэй И-Мэйл хаяг"
                  onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                />
                <FormInput
                  name={'pwd'}
                  type={'password'}
                  label="Нууц үг"
                  placeholder="Нууц үг оруул"
                  onChange={(e) => setFormState((prev) => ({ ...prev, password: e.target.value }))}
                />
                {/* <div className="flex justify-end items-center w-full text-[12px] md:text-[14px]">
                  <Link href="/forgot" className="font-semibold text-primary-600">
                    {'Нууц үгээ мартсан'}
                  </Link>
                </div> */}
                <div className="flex flex-col md:items-center space-y-4 py-2 text-white font-bold w-full text-[14px]">
                  <Button
                    // loading={isLoading}
                    size="fullWidth"
                    rounded="xl"
                    type="submit"
                    disabled={!(formState.email && formState.password)}
                  >
                    {'Нэвтрэх'}
                  </Button>

                  <p className="text-slate-400 font-bold w-full text-center px-6">
                    {'Хэрэв та бүртгэлгүй бол '}
                    <Link href="/signup" className="text-primary-600 underline ">
                      {'энд'}
                    </Link>
                    {' дарж бүртгүүлнэ үү.'}
                  </p>
                </div>
              </form>
              <Alert />
            </>
          </div>
          {/* <div className="w-full md:w-[360px] mx-auto">{children}</div> */}
        </div>
        {/* {type !== 'register' && (
          <footer className="p-8 text-center lg:text-end">{`© chatbot ${moment().format('YYYY')}`}</footer>
        )} */}
      </div>
      {/* <div className="hidden lg:block flex-1 relative">
        <Image src="/assets/login.jpg" fill alt="login" className="object-cover" />
      </div> */}
    </div>
  )
}

export default Login
