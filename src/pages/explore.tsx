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
  Skeleton,
} from '@chakra-ui/react'
import Head from 'next/head'
import React, { useMemo, useState } from 'react'
import { UserCard } from '../components/UserCard'
import { User } from '../data/hooks/mutations/useRegister'
import { useGetAllUsers } from '../data/hooks/query/useGetAllUsers'

function Explore() {
  const { data, isLoading } = useGetAllUsers()
  const [tabIndex, setTabIndex] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

  const tabIndexToUserType = useMemo(() => {
    return {
      0: 'community',
      1: 'volunteer',
    }
  }, [])

  const filteredUsers: User[] = useMemo(() => {
    return data?.filter((user) => {
      if (searchTerm === '') {
        return user.type === tabIndexToUserType[tabIndex]
      } else {
        return (
          user.type === tabIndexToUserType[tabIndex] &&
          user.username.includes(searchTerm)
        )
      }
    })
  }, [data, searchTerm, tabIndex, tabIndexToUserType])

  if (isLoading) {
    return <Skeleton isLoaded={!isLoading} />
  }

  return (
    <Box>
      <Head>
        <title>Explore - Community and User profiles</title>
      </Head>
      <InputGroup>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="enter username"
        />
        <InputRightAddon>
          <SearchIcon />
        </InputRightAddon>
      </InputGroup>

      <Tabs
        onChange={(index) => setTabIndex(index)}
        isFitted
        my="4"
        variant="solid-rounded"
        colorScheme="blue"
      >
        <TabList>
          <Tab>Communities</Tab>
          <Tab>Volunteers</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {filteredUsers &&
              filteredUsers.map((user) => (
                <UserCard key={user._id} user={user} />
              ))}
          </TabPanel>
          <TabPanel>
            {filteredUsers &&
              filteredUsers.map((user) => (
                <UserCard key={user._id} user={user} />
              ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default Explore
