import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FormInput } from '../components/common/FormElements'
import { Button } from '../components/common/Button'
import { useAlert } from '../components/hooks/UseAlert'
import { LoginRequest } from '../types/common'
import { useAuthGuard } from '../lib/auth/auth'
import { useCommonContext } from '../context/CommonContext'

function Login() {
  const [show, Alert] = useAlert()

  const [formState, setFormState] = useState<LoginRequest>({ email: '', password: '' })

  const { refetchUser, setUser } = useCommonContext()

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
    } catch (err) {
      show({ message: (err as { message: string })?.message || (err as string), type: 'error' })
    }
  }

  return (
    <div className="lg:flex lg:flex-row-reverse h-screen">
      <div className="flex flex-col justify-between px-6 lg:px-0 flex-1 h-full">
        <div className="w-full flex flex-col justify-center flex-1">
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
        </div>
      </div>
    </div>
  )
}

export default Login
