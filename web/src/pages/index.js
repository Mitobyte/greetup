import * as React from "react"
import OrganizationsPanel from "../components/organizationPanel"
import JSONData from "../../../data/combined.json"
import '../styles/tailwind.css';

export default function Home() {
  return (
    <div>
      <header className="bg-blue-500 p-4 text-white text-center">
        <h1 className="text-2xl font-semibold">Milwaukee Meetups</h1>
      </header>
      <div className="p-4">
        <p className="text-lg">
          Milwaukee is home to a vibrant tech community. Here are some of the
          organizations that help make it great.
        </p>
      </div>
      <div className="flex flex-wrap justify-around">
      {
        JSONData.map((organization, index) => {
          return <OrganizationsPanel key={`org-${index}`} organization={organization} />
        })
      }
      </div>
    </div>
  )
}
