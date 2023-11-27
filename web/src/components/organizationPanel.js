import * as React from "react"
import OrganizationCard from "./OrganizationCard";

export default function OrganizationPanel({ organization }) {
  return (
    <OrganizationCard>
      <h2 className="text-xl font-semibold mb-2">{organization.name}</h2>

      {organization.events.map((event, index) => {
          return <div key={`event-${index}`}>{event.name}</div>
      })}
    </OrganizationCard>
  )
}