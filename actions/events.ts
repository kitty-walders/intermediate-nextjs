'use server'

import { db } from '@/db/db'
import { events } from '@/db/schema'
import { delay } from '@/utils/delay'
import { getCurrentUser } from '@/utils/users'
import randomName from '@scaleway/random-name'
import { revalidateTag } from 'next/cache'

export const createNewEvent = async () => {
  await delay(1000)
  const user = await getCurrentUser()

  await db.insert(events).values({
    startOn: new Date().toUTCString(),
    createdById: user.id,
    isPrivate: false,
    name: randomName('event', ' '),
  })

  revalidateTag('events') // revalidate the events page to make sure it has the latest info
  revalidateTag('dashboard:events') // need to revalidate the dashboard page as well to make sure it has the latest info
}
