function GlobalStyle() {
  return (
    <>
      <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }

        body {
          width: 100vw;
          max-height: 100vh;
          font-family: "Open Sans", sans-serif;
          display: flex;
          background-image: url(./images/bgimage.jpg);
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          padding: 10px;
        }

        /*App fit Height */
        html,
        body,
        #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
          align-items: center;
        }

        #__next {
          flex: 1;
        }

        #__next > * {
          flex: 1;
        }
        /* ./App fit Height*/
      `}</style>
    </>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
