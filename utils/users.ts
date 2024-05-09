import 'server-only' // throw error if imported in client code
import { COOKIE_NAME } from './constants'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUserFromToken } from './authTools'
import { cache } from 'react'

export const getCurrentUser = cache(async () => {
  const token = cookies().get(COOKIE_NAME) 
  if (!token) redirect('/signin') // don't need a return here. "Redirect" returns type never

  const user = await getUserFromToken(token)
  if (!user) redirect('/signin') // don't need a return here. "Redirect" returns type never

  return user
})
