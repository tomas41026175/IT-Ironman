import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <Provider store={store}> */}
      <Component {...pageProps} />
      {/* </Provider> */}
    </>
  );
}
