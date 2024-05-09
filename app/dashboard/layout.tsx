'use client'
import Shell from '@/components/Shell'
import { usePathname } from 'next/navigation'

const Dashboard = ({ children, rsvps, events }) => {
  // props must match the @folder named components (except children)
  const path = usePathname() // current client component path string/ route
  // difficult to get the server component path because it breaks the optimizations of NextJS

  return (
    <Shell>
      {path === '/dashboard' ? (
        <div className="flex w-full h-full">
          <div className="w-1/2 border-r border-default-50">{rsvps}</div>
          <div className="w-1/2 flex flex-col">
            <div className="border-b border-default-50 w-full h-1/2">
              {events}
            </div>
            <div className="w-full h-1/2">{children}</div>
          </div>
        </div>
      ) : (
        <div>{children}</div> // not every page has the same layout
      )}
    </Shell>
  )
}

export default Dashboard
