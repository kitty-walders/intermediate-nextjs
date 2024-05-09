'use client'

import { Button } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'

// Using a generic Submit button so we can reuse this component in multiple forms and get form status state

const Submit = ({ label, ...btnProps }) => {
  const { pending } = useFormStatus() // if used in a form action > always would know if the form is pending.

  return (
    <Button {...btnProps} 
      type="submit" //must define as a Submit type button
      isLoading={pending} //shows loading spinner if form is pending for "free"
      > 
      {label}
    </Button>
  )
}

export default Submit
