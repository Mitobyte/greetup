import * as React from "react"
import OrganizationsPanel from "../components/organizationPanel"
import JSONData from "../../../data/combined.json"

export default function Home() {
  return (
    <div>
      <h1>Milwaukee Meetups</h1>
      {
        JSONData.map((organization, index) => {
          return <OrganizationsPanel organization={organization} />
        })
      }
    </div>
  )
}
