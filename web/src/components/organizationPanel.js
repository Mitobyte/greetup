import * as React from "react"

export default function OrganizationPanel({ organization }) {
  return (
    <div>
      <h2>{organization.name}</h2>
      {
        organization.events.map((event, index) => {
          return <div>{event.name}</div>
        })
      }
    </div>
  )
}