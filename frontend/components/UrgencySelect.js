import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormHelperText } from '@mui/material';
import { NORMAL, URGENT, NOT_URGENT } from '../constants/urgency';

export default function UrgencySelect({ formik }) {
  const handleChange = event => {
    formik.setFieldValue('urgency', event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
        <Select value={formik.values.urgency} onChange={handleChange} name="urgency" displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
          <MenuItem value={NOT_URGENT}> 唔急 ( 7日 )</MenuItem>
          <MenuItem value={NORMAL}> 一般急 ( 4日 )</MenuItem>
          <MenuItem value={URGENT}> 急到瀨 ( 3日 )</MenuItem>
        </Select>
        <FormHelperText>Without label</FormHelperText>
      </FormControl>
    </Box>
  );
}
