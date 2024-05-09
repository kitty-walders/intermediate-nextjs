'use server' // hint to react compiler should be run in node js environment
import { cookies } from 'next/headers'
import { signin, signup } from '@/utils/authTools'
import { z } from 'zod' // runtime form validation library
import { redirect } from 'next/navigation'
import { COOKIE_NAME } from '@/utils/constants'

const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const registerUser = async (prevState: any, formData: FormData) => { 
  //prevState provides previous state of the form - always the first argument
  //formData is the form data object

  const data = authSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  try {
    const { token } = await signup(data)
    cookies().set(COOKIE_NAME, token) // using JWT token to authenticate user to set in localstorage
  } catch (e) {
    console.error(e)
    return { message: 'Failed to sign you up' }
  }
  redirect('/dashboard') // can't put into the Try/Catch - possible NextJS bug? Just put it at the end of the function
}

export const signinUser = async (prevState: any, formData: FormData) => {
  const data = authSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  try {
    const { token } = await signin(data)
    cookies().set(COOKIE_NAME, token)
  } catch (e) {
    console.error(e)
    return { message: 'Failed to sign you in' }
  }
  redirect('/dashboard') // can't put into the Try/Catch - possible NextJS bug? Just put it at the end of the function
}
