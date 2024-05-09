import 'server-only'
import { db } from '@/db/db' // ORM instance in our case drizzle-orm
import { attendees, events, rsvps } from '@/db/schema' // tables themselves
import { memoize } from 'nextjs-better-unstable-cache'
import { eq, sql } from 'drizzle-orm' // filters for our queries - allows raw SQL
import { delay } from './delay'

export const getAttendeesCountForDashboard = memoize(
  // cache does not persist across routes so we need to use this 3rd party lib (unstable-cache for NextJS)
  // non request based server side cache
  // requires 2 params (see line 29)

  async (userId: string) => {
    await delay() // remove for production
    const counts = await db
      .select({
        totalAttendees: sql`count(distinct ${attendees.id})`,
      })
      .from(events)
      .leftJoin(rsvps, eq(rsvps.eventId, events.id))
      .leftJoin(attendees, eq(attendees.id, rsvps.attendeeId))
      .where(eq(events.createdById, userId))
      .groupBy(events.id)
      .execute()

    const total = counts.reduce((acc, count) => acc + count.totalAttendees, 0)
    return total
  },
  {
    persist: true, // persist across routes - keep it cached until I determine it needs to be refreshed
    revalidateTags: () => ['dashboard:attendees'], // on a mutatation > these are the tags we need to pass to cache bust -- good to put in the constant file to reuse
    // revalidateTags cannot be called by client.
    // On-demand revalidation allows you to revalidate data based on specific events, such as form submissions or data updates. This ensures the latest data is shown as soon as possible.
    
    suppressWarnings: true, //warnings if we use this in the client
    log: ['datacache', 'verbose', 'dedupe'], // useful for debugging - can be set per env
    logid: 'dashboard:attendees',
  }
)

export const getGuestList = memoize(
  async (userId: string) => {
    await delay()
    const uniqueAttendees = await db
      .selectDistinct({
        id: attendees.id,
        name: attendees.name,
        email: attendees.email,
      })
      .from(events)
      .leftJoin(rsvps, eq(rsvps.eventId, events.id))
      .leftJoin(attendees, eq(attendees.id, rsvps.attendeeId))
      .where(eq(events.createdById, userId))
      .execute()

    return uniqueAttendees
  },
  {
    persist: true,
    revalidateTags: () => ['guests'],
    suppressWarnings: true,
    log: ['datacache', 'verbose'],
    logid: 'guests',
  }
)
