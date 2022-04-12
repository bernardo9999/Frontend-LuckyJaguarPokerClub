import { Button, Flex, Text, Box, TabList, Tab, Tabs, TabPanels, TabPanel } from "@chakra-ui/react";
import Head from "next/head";
import { useMoralis } from "react-moralis";
import Balance from "../components/Balance";
import Header from "../components/Header";
import Nft from "../components/Nft";
import Profile from "../components/Profile";
import Send from "../components/Send";
import Transactions from "../components/Transactions";

export default function Home() {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } = useMoralis();
  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Login | Poker Club</title>
        </Head>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="100vw"
          height="100vh"
          bgGradient="linear(to-br, teal.400, purple.300)"
        >
          <Text fontSize="5xl" fontWeight="bold" color="white">
          ♠️&nbsp;Poker Club
          </Text>
          <Button
            colorScheme="purple"
            size="lg"
            mt="6"
            onClick={() => authenticate({
              signingMessage: "Assine para se logar a Poker Club"
            })}
          >
            Login com Metamask
          </Button>
        </Flex>
      </>
    );
  }
  return (
    <>
    <Head>
      <title>🖤 Poker Club </title>
    </Head>
    <Flex direction="column" width="100wv" height="100vh">
      < Header user = {user} logout={logout} isLoggingOut={isLoggingOut}/>
      <Box flex="1" bg="purple.100" px="44" py="20">
        <Tabs size="lg" colorScheme="purple" align="center" variant="enclosed">
          <TabList>
            <Tab fontWeight="bold">Perfil</Tab>
            <Tab fontWeight="bold">Balanço</Tab>            
            <Tab fontWeight="bold">Transações</Tab>
            <Tab fontWeight="bold">NFTs</Tab>
            <Tab fontWeight="bold">Enviar ETH</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Profile user={user}></Profile>
            </TabPanel>
            <TabPanel>
              <Balance user={user}></Balance>
            </TabPanel>
            <TabPanel>
              <Transactions user={user}></Transactions>
            </TabPanel>
            <TabPanel>
              <Nft user={user}></Nft>
            </TabPanel>
            <TabPanel>
              <Send>
                <Text fontSize="xl" fontWeight="bold"></Text>
              </Send>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
    </>
  );
}
