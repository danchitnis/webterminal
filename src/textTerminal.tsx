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

const dataRX = [] as number[];

const TextTerminal = () => {
    const [displayType, setDisplayType] = React.useState('byte');
    const [isNewRxData, setIsNewRxData] = React.useState(false);
    const [textRx, setTextRx] = React.useState('');


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
        <>  <HStack>

            <Spacer />
            <Box
                border="solid 1px"
                borderColor="cyan.500"
                borderRadius="10px"
                padding="10px"
            >
                <RadioGroup
                    onChange={setDisplayType}
                    value={displayType}
                    colorScheme="blue"
                >
                    <Stack direction="row">
                        <Radio value="byte">Byte</Radio>
                        <Radio value="hex">Hex</Radio>
                        <Radio value="char">Char</Radio>
                    </Stack>
                </RadioGroup>
            </Box>
        </HStack>
            <Box>
                <Textarea resize={'none'} value={textRx} isReadOnly={true} h="70vh" />
            </Box>

            <Box></Box>
            <Text>Hello World</Text>
        </>
    );
};

export default TextTerminal;