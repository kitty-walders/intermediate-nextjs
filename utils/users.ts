import 'server-only' // throw error if imported in client code
import { COOKIE_NAME } from './constants'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUserFromToken } from './authTools'
import { cache } from 'react'

export const getCurrentUser = cache(async () => {
  // on server component > cache is default on. But it is possible to turn off.

  // because we are using cookies in line 14 > NextJS determines that this is a dynamic call and does not cache it.
  // If you remove cache from line 8, the call getCurrentUser will be called multiple times
  // But if we want to overide this behavior, we cache it manually in line 8

  // cache function means on the same request, we only call this once and memoize the result

  const token = cookies().get(COOKIE_NAME) 
  if (!token) redirect('/signin') // don't need a return here. "Redirect" returns type never

  const user = await getUserFromToken(token)
  if (!user) redirect('/signin') // don't need a return here. "Redirect" returns type never

  return user
})
