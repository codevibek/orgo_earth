import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  InputGroup,
  Input,
  InputRightAddon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import React from 'react'

function Explore() {
  return (
    <Box>
      <InputGroup>
        <Input type="text" placeholder="enter username" />
        <InputRightAddon>
          <SearchIcon />
        </InputRightAddon>
      </InputGroup>

      <Tabs my="4" variant="solid-rounded" colorScheme="blue">
        <TabList>
          <Tab>Communities</Tab>
          <Tab>Volunteers</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default Explore
