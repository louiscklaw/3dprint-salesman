import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import * as React from 'react'

export default function InfillSelect({ formik, infill, setInfill }) {
  return (
    <FormControl>
      <FormLabel id="select-infill">Infill</FormLabel>
      <RadioGroup
        aria-labelledby="select-infill"
        defaultValue={0.25}
        name="infill"
        {...formik.getFieldProps('infill')}
      >
        <FormControlLabel value={0.15} control={<Radio />} label="15%" />
        <FormControlLabel value={0.25} control={<Radio />} label="25% (Recommended)" />
        <FormControlLabel value={0.5} control={<Radio />} label="50%" />
        <FormControlLabel value={1} control={<Radio />} label="100%" />
      </RadioGroup>
    </FormControl>
  )
}
