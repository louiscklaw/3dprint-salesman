import { FormHelperText } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';
import CONST_URGENCY from '../constants/urgency';

export default function UrgencySelect({ formik }) {
  const handleChange = event => {
    formik.setFieldValue('urgency', event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
        <Select value={formik.values.urgency} onChange={handleChange} name="urgency" displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
          <MenuItem value={CONST_URGENCY.NOT_URGENT}> 唔急 ( 7日 )</MenuItem>
          <MenuItem value={CONST_URGENCY.NORMAL}> 一般急 ( 4日 )</MenuItem>
          <MenuItem value={CONST_URGENCY.URGENT}> 急到瀨 ( 3日 )</MenuItem>
        </Select>
        <FormHelperText>Without label</FormHelperText>
      </FormControl>
    </Box>
  );
}
