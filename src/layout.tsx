import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react';
import React from 'react';
import Terminal from './Terminal';

const Layout = (): JSX.Element => {
  const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  };

  const customTheme = extendTheme({ config });

  return (
    <div>
      <ChakraProvider theme={customTheme}>
        <Terminal />
      </ChakraProvider>
    </div>
  );
};

export default Layout;
