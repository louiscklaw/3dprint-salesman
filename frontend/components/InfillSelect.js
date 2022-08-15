import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import * as React from 'react'

export default function InfillSelect({ infill, setInfill }) {
  return (
    <FormControl>
      <FormLabel id="select-infill">Infill</FormLabel>
      <RadioGroup
        aria-labelledby="select-infill"
        defaultValue="25%"
        name="infill"
        value={infill}
        onChange={setInfill}
      >
        <FormControlLabel value="15%" control={<Radio />} label="15%" />
        <FormControlLabel value="25%" control={<Radio />} label="25%" />
        <FormControlLabel value="50%" control={<Radio />} label="50%" />
        <FormControlLabel value="100%" control={<Radio />} label="100%" />
      </RadioGroup>
    </FormControl>
  )
}
