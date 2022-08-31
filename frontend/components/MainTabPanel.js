import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

export default function MainTabPanel({ active_tab, setActiveTab }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Tabs value={active_tab} onChange={handleChange} aria-label="icon label tabs example">
      <Tab icon={<PhoneIcon />} label="Quote" />
      <Tab icon={<FavoriteIcon />} label="Reply" />
    </Tabs>
  );
}
