import Head from 'next/head';
import { Fragment } from 'react';
import '../styles/globals.css';

// Notistack
import { SnackbarProvider } from 'notistack';
import NavBar from '../layouts/NavBar';

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider maxSnack={ 3 }>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossOrigin="anonymous"></link>
      </Head>
      <NavBar />
      <Component { ...pageProps } />
    </SnackbarProvider>
  )
}

export default MyApp
