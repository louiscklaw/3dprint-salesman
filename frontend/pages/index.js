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
  const height = use100vh()

  const [preview_stl_url, setPreviewStlUrl] = React.useState(url)
  const [stl_base64, setStlBase64] = React.useState()
  const [quote_reply, setQuoteReply] = useState()
  const [infill, setInfill] = useState(0.25)

  const formik = useFormik({
    initialValues: { stl_file: '', quantity: 1, infill: 0.25 },
    onSubmit: async values => {
      let post_values = { ...values, stl_file: stl_base64 }
      let response = await axios.post('/api/upload-stl-base64', post_values)

      let { orphan_url } = response.data
      setPreviewStlUrl(orphan_url)
      setQuoteReply(response.data)
    },
  })

  const [print_info, setPrintInfo] = useState()

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
                    <UploadStl
                      setPreviewStlUrl={setPreviewStlUrl}
                      stl_base64={stl_base64}
                      setStlBase64={setStlBase64}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <Box>
                      <Typography variant={'body2'}>choose your option</Typography>
                    </Box>
                    <InfillSelect formik={formik} infill={infill} setInfill={setInfill} />
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
                    <Box>
                      <pre>{JSON.stringify(quote_reply, null, 2)}</pre>
                    </Box>
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
