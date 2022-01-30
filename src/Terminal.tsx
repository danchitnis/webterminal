import {
  Box,
  Button,
  Heading,
  Spacer,
  Text,
  HStack,
  Select,
  RadioGroup,
  Stack,
  Radio,
  Textarea,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import React from 'react';

import { ComPort } from './comms/comms';
import TextTerminal from './textTerminal';

const comPort = new ComPort();
const dataRX = [] as number[];

const Terminal = () => {
  // Create the count state.
  const [displayType, setDisplayType] = React.useState('byte');
  const [isConnected, setIsConnected] = React.useState(false);
  const [textRx, setTextRx] = React.useState('');
  const [isNewRxData, setIsNewRxData] = React.useState(false);

  const onBtnConnectClick = () => {
    comPort.portOpen();
    setIsConnected(true);
    setTextRx('Connected');
    comPort.dataRXCallback = (data) => {
      for (let i = 0; i < data.length; i++) {
        dataRX.push(data[i]);
      }
      // setTextRx(data);
      setIsNewRxData(true);
    };
  };

  const onBtnDisconnectClick = () => {
    comPort.portClose();
    setIsConnected(false);
    setTextRx(textRx + 'Disconnected');
  };

  React.useEffect(() => {
    let text = '';
    const data = dataRX;
    switch (displayType) {
      case 'byte':
        text = data.toString();
        break;
      case 'hex':
        text = data.map((byte) => byte.toString(16)).join(',');
        break;
      case 'char':
        text = data.map((byte) => String.fromCharCode(byte)).join('');
        break;
    }
    setTextRx(text);
    setIsNewRxData(false);
  }, [displayType, isNewRxData]);

  return (
    <>
      <Heading>Terminal</Heading>
      <Spacer p={2} />
      <HStack>
        <Button
          colorScheme="blue"
          disabled={isConnected}
          onClick={onBtnConnectClick}
        >
          Connect
        </Button>
        <Select placeholder="Select speed" disabled={isConnected}>
          <option value="9600">9600</option>
          <option value="14400">14400</option>
          <option value="115200">115200</option>
        </Select>
        <Button
          colorScheme="blue"
          disabled={!isConnected}
          onClick={onBtnDisconnectClick}
        >
          Disconnect
        </Button>
      </HStack>
      <Spacer p={2} />


      <Tabs isFitted variant='enclosed'>
        <TabList mb='1em'>
          <Tab>Terminal</Tab>
          <Tab>Plot</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TextTerminal />
          </TabPanel>
          <TabPanel>
            <p>Plot</p>
          </TabPanel>
        </TabPanels>
      </Tabs>




    </>
  );
};

export default Terminal;
