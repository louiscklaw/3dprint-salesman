import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import React from 'react';

import { StlViewer } from 'react-stl-viewer';

import MyAppBar from '../components/MyAppBar';

import { Container, Grid } from '@mui/material';
import { Typography, IconButton } from '@mui/material';
import { Box, Button, Stack } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import { use100vh } from 'react-div-100vh';

import Copyright from '../src/Copyright';

import InfillSelect from '../components/InfillSelect';
import Quantity from '../components/Quantity';
import UploadStl from '../components/UploadStl';
import PreviewStl from '../components/PreviewStl';
import Debug from '../components/Debug';

import MainTabPanel from '../components/MainTabPanel';
import DeliverySelect from '../components/DeliverySelect';
import UrgencySelect from '../components/UrgencySelect';
import ReplyTab from './ReplyTab';

import { NOT_URGENT } from '../constants/urgency';

const url = 'http://localhost:3001/api/public/0b66976c-4168-48ed-86b6-be5161609e7e.stl';

function QuoteTab() {
  const height = use100vh();

  const [preview_stl_url, setPreviewStlUrl] = React.useState(url);
  const [stl_base64, setStlBase64] = React.useState();
  const [quote_reply, setQuoteReply] = useState();
  const [infill, setInfill] = useState(0.25);

  const formik = useFormik({
    initialValues: { stl_file: '', quantity: 1, infill: 0.25, urgency: NOT_URGENT },
    onSubmit: async values => {
      let post_values = { ...values, stl_file: stl_base64 };
      let response = await axios.post('/api/upload-stl-base64', post_values);

      let { orphan_url } = response.data;
      setPreviewStlUrl(orphan_url);
      setQuoteReply(response.data);
    },
  });

  const [print_info, setPrintInfo] = useState();

  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);

  const [active_tab, setActiveTab] = React.useState(0);

  return (
    <>
      {!isSSR && (
        <>
          <form onSubmit={formik.handleSubmit}>
            <Container maxWidth="xl" sx={{ height }}>
              <Stack direction="column">
                <Grid container spacing={4}>
                  <Grid item xs={4} container spacing={2}>
                    <Typography variant="h6">upload stl file upload thingiverse link</Typography>
                    <PreviewStl preview_stl_url={preview_stl_url} />
                    <UploadStl setPreviewStlUrl={setPreviewStlUrl} stl_base64={stl_base64} setStlBase64={setStlBase64} />
                  </Grid>

                  <Grid item xs={4} container spacing={2}>
                    <Grid item xs={12} container flexDirection="column" spacing={2}>
                      <Typography variant={'h6'}>choose your option</Typography>
                    </Grid>

                    <Grid item xs={12} container flexDirection="column" spacing={2}>
                      <InfillSelect formik={formik} infill={infill} setInfill={setInfill} />
                    </Grid>

                    <Grid item xs={12} container flexDirection="column" spacing={2}>
                      <Quantity formik={formik} />
                    </Grid>

                    <Grid item xs={12} container flexDirection="column" spacing={2}>
                      <Typography variant="h6">交收方式 ?</Typography>
                      <DeliverySelect formik={formik} />
                    </Grid>
                    <Grid item xs={12} container flexDirection="column" spacing={2}>
                      <Typography variant="h6">有幾急 ?</Typography>
                      <UrgencySelect formik={formik} />
                    </Grid>

                    <Grid item xs={12} container flexDirection="column" spacing={2}>
                      <Grid item xs={12}>
                        <Button onClick={formik.submitForm} variant={'contained'}>
                          Get Quote
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={4} container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h6">print information</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box>
                        <Typography variant="h6">拆扣 ?</Typography>
                        <Typography variant="h6"> 最低消費 ?</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box>
                        <Typography variant="h6">STL:</Typography>
                        <Typography variant="h6">http://localhost:3001/api/public/1ff77355-c4b8-45a1-a36d-2fd3c51fd547.stl</Typography>
                        <Typography variant="h6">0.3mm</Typography>
                        <Typography variant="h6">25% infill</Typography>
                        <Typography variant="h6">PLA 灰</Typography>
                        <Typography variant="h6">觀塘地鐵站面交</Typography>
                        <Typography variant="h6">HKD @25</Typography>
                        <Typography variant="h6">TOTAL HKD 50</Typography>
                      </Box>
                    </Grid>
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
  );
}

function HomeBody() {
  const height = use100vh();

  const [preview_stl_url, setPreviewStlUrl] = React.useState(url);
  const [stl_base64, setStlBase64] = React.useState();
  const [quote_reply, setQuoteReply] = useState();
  const [infill, setInfill] = useState(0.25);

  const formik = useFormik({
    initialValues: { stl_file: '', quantity: 1, infill: 0.25, urgency: NOT_URGENT },
    onSubmit: async values => {
      let post_values = { ...values, stl_file: stl_base64 };
      let response = await axios.post('/api/upload-stl-base64', post_values);

      let { orphan_url } = response.data;
      setPreviewStlUrl(orphan_url);
      setQuoteReply(response.data);
    },
  });

  const [print_info, setPrintInfo] = useState();

  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);

  const [active_tab, setActiveTab] = React.useState(0);

  return (
    <>
      <Grid container spacing={2} rowSpacing={5}>
        <Grid item xs={12} container justifyContent="center" alignItems="center">
          <MainTabPanel active_tab={active_tab} setActiveTab={setActiveTab} />
        </Grid>
        <Grid item xs={12} container justifyContent="center" alignItems="center">
          {active_tab == 0 ? <QuoteTab /> : <></>}

          {active_tab == 1 ? <ReplyTab quote_reply={quote_reply} /> : <></>}
        </Grid>
      </Grid>
    </>
  );
}

export default function Home() {
  return (
    <>
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <MyAppBar />
        <HomeBody />
      </div>
    </>
  );
}
