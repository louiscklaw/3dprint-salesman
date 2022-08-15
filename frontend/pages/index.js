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
import PreviewStl from '../components/PreviewStl'
import Debug from '../components/Debug'

const url = 'http://localhost:3001/api/public/0b66976c-4168-48ed-86b6-be5161609e7e.stl'

export default function Home() {
  const ref = useRef()
  const height = use100vh()

  const [upload_result, setUploadResult] = React.useState()
  const [preview_stl_url, setPreviewStlUrl] = React.useState(url)

  const formik = useFormik({
    initialValues: { stl_file: '', quantity: 1, infill: '25%' },
    onSubmit: async values => {},
  })

  const [print_info, setPrintInfo] = useState()
  const [quote_reply, setQuoteReply] = useState()

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
          <form onSubmit={formik.handleSubmit}>
            <Container maxWidth="xl" sx={{ height }}>
              <Stack direction="column">
                <IconButton color="primary" aria-label="add to shopping cart">
                  <TranslateIcon />
                </IconButton>

                <Grid container spacing={4}>
                  <Grid item xs={4}>
                    upload stl file upload thingiverse link
                    <PreviewStl preview_stl_url={preview_stl_url} />
                    <UploadStl setPreviewStlUrl={setPreviewStlUrl} />
                  </Grid>

                  <Grid item xs={4}>
                    choose your option
                    <InfillSelect formik={formik} />
                    <Quantity formik={formik} />
                    get quote
                    <Button onClick={formik.submitForm} variant={'contained'}>
                      Get Quote
                    </Button>
                    <Debug>拆扣 ? 最低消費 ?</Debug>
                  </Grid>

                  <Grid item xs={4}>
                    <Box>
                      <Typography variant="H6">print information</Typography>
                    </Box>
                    <Box>{print_info}</Box>

                    <Button>Send Order</Button>
                  </Grid>
                </Grid>

                <Copyright />
              </Stack>
            </Container>
          </form>
          <pre>{JSON.stringify(formik.values, null, 2)}</pre>
        </>
      )}
    </>
  )
}
