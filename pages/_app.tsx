import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

const theme = extendTheme({
  fonts: {
    heading: `'Stylish', sans-serif`,
    body: `'Stylish', sans-serif`,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
