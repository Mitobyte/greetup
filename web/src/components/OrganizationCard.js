import React from 'react';
import { Card, CardContent } from '@mui/material';

const OrganizationCard = ({ children }) => {
  return (
    <Card className='mb-3'>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default OrganizationCard;
