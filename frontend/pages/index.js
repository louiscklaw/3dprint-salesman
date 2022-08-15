import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import React from 'react'

import { StlViewer } from 'react-stl-viewer'
import { Container, Grid } from '@mui/material'
import { Typography, IconButton } from '@mui/material'
import { Box, Button, Stack } from '@mui/material'
import TranslateIcon from '@mui/icons-material/Translate'
import { useFormik } from 'formik'
import axios from 'axios'
import { use100vh } from 'react-div-100vh'

import Copyright from '../src/Copyright'

import InfillSelect from '../components/InfillSelect'
import Quantity from '../components/Quantity'
import UploadStl from '../components/UploadStl'

const url = 'https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl'

const style = {
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
}

export default function Home() {
  const ref = useRef()
  const height = use100vh()

  const [upload_result, setUploadResult] = React.useState()
  const [preview_stl_url, setPreviewStlUrl] = React.useState(
    'http://localhost:3001/api/public/4cb6087b-d66b-4681-b780-be316a2101a4.stl',
  )

  let formik = useFormik({
    initialValues: {
      avatar: '',
      infill: '25%',
      quantity: 1,
    },
    onSubmit: async values => {
      console.log({ values })
      let response = await axios.post('/api/upload-stl-base64', values)
      setUploadResult(response.data)
      console.log(response.data)
    },
  })

  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  return (
    <>
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        helloworld
      </div>
      {!isSSR && (
        <>
          <Container maxWidth="xl" sx={{ height }}>
            <form onSubmit={formik.handleSubmit}>
              <Stack direction="column">
                <IconButton color="primary" aria-label="add to shopping cart">
                  <TranslateIcon />
                </IconButton>

                <Grid container spacing={4}>
                  <Grid item xs={4}>
                    upload stl file upload thingiverse link
                    {/* <PreviewStl url={preview_stl_url} /> */}
                    <UploadStl formik={formik} />
                  </Grid>

                  <Grid item xs={4}>
                    choose your option
                    <InfillSelect formik={formik} />
                    <Quantity formik={formik} />
                    get quote
                    <Button onClick={formik.submitForm} variant={'contained'}>
                      Get Quote
                    </Button>
                  </Grid>

                  <Grid item xs={4}>
                    <Button>Send Order</Button>
                  </Grid>
                </Grid>

                <Copyright />
              </Stack>
            </form>
            <StlViewer
              style={style}
              orbitControls
              shadows
              showAxes
              floorProps={{ gridWidth: 300 }}
              url={url}
              modelProps={{
                positionX: 150,
                positionY: 150,
                scale: 1,
                color: '#008675',
                ref,
              }}
              onFinishLoading={console.log}
            />
          </Container>
        </>
      )}
    </>
  )
}
