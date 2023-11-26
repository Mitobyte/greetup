import * as React from "react"

export default function OrganizationPanel({ organization }) {
  return (
    <div className="bg-white p-4 m-2 border rounded-md w-1/2">
      <h2 className="text-xl font-semibold mb-2">{organization.name}</h2>

      {organization.events.map((event, index) => {
          return <div key={`event-${index}`}>{event.name}</div>
      })}
    </div>
  )
}