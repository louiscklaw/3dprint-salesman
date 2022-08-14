import * as React from 'react';
import {Container, Grid} from '@mui/material';
import {Typography, IconButton} from '@mui/material';
import {Box, Button, Stack} from '@mui/material';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import { use100vh } from 'react-div-100vh'
import InfillSelect from '../components/InfillSelect'
import {useFormik} from 'formik'
import axios from 'axios' 
import Quantity from '../components/Quantity'
import UploadStl from '../components/UploadStl';
import PreviewStl from '../components/PreviewStl';

import TranslateIcon from '@mui/icons-material/Translate';

export default function Index() {
  const height = use100vh()
  const [upload_result, setUploadResult] = React.useState()
  const [preview_stl_url , setPreviewStlUrl ] = React.useState(
    'http://localhost:3001/api/public/4cb6087b-d66b-4681-b780-be316a2101a4.stl'
  )

  let formik = useFormik({
    initialValues: {
      avatar:'',
      infill: '25%',
      quantity:1
    },
    onSubmit: async values => {
      console.log({values})
      let response = await axios.post('/api/upload-stl-base64',values)
      setUploadResult(response.data)
      console.log(response.data)
    }
  })


  return (
    <Container maxWidth="xl" sx={{height}}>
      <form onSubmit={formik.handleSubmit}>
        <Stack direction="column" >
    

        <IconButton color="primary" aria-label="add to shopping cart">
          <TranslateIcon />
        </IconButton>

        <Grid container spacing={4} >
          <Grid item xs={4}>
            upload stl file 
            upload thingiverse link
            <PreviewStl url={preview_stl_url} />
            <UploadStl formik={formik}/>
          </Grid>

          <Grid item xs={4}>
            choose your option
            <InfillSelect formik={formik} />
            <Quantity formik={formik} />
            get quote

            <Button onClick={formik.submitForm} variant={'contained'}>Get Quote</Button>
          </Grid>

          <Grid item xs={4}>
            <Button>Send Order</Button>
          </Grid>
        </Grid>

        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        

        <Copyright />
        </Stack>
      </form>
      <pre>{JSON.stringify({upload_result, formik_values:formik.values}, null, 2)}</pre>
    </Container>
  );
}
