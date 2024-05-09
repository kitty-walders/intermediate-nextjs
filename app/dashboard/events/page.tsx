import { getAllEvents } from '@/utils/events'
import { getCurrentUser } from '@/utils/users'
import Link from 'next/link' // make sure not to use the Lucite one

const Events = async () => {
  const user = await getCurrentUser()
  const events = await getAllEvents(user.id)
  
  return (
    <div>
      These are links to the individual events:

      {events.map((event) => (
        <div key={event.id}>
          <Link href={`/dashboard/events/${event.id}`}>{event.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default Events
