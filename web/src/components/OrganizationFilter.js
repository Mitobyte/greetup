import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid";

const OrganizationFilter = ({ organizations, selectedOrganizationsChanged }) => {
  const [selectedOrganizations, setSelectedOrganizations] = React.useState([]);

  useEffect(() => {
    setSelectedOrganizations(organizations);
  }, [organizations]);

  useEffect(() => {
    selectedOrganizationsChanged(selectedOrganizations);
  }, [selectedOrganizations]);

  const handleOrganizationChange = (event, organization) => {
    if (event.target.checked) {
      setSelectedOrganizations([...selectedOrganizations, organization]);
    } else {
      setSelectedOrganizations(selectedOrganizations.filter((org) => org !== organization));
    }
  }

  return (
    <Grid container>
      <h2>Filter by Organization</h2>
      <Grid item xs={12}>
        {organizations.map((organization, index) => {
          return (
            <Grid key={`organization-${index}`}item xs={12}>
              <label>
                <input
                  type='checkbox'
                  checked={selectedOrganizations.includes(organization)}
                  onChange={(event) => handleOrganizationChange(event, organization)}
                ></input>
                {organization.name}
              </label>
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  )
}

export default OrganizationFilter;
