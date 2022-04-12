import { Button, Flex, Text, Box, TabList, Tab, Tabs, TabPanels, TabPanel, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNFTBalances } from "react-moralis";
import CustomContainer from "./CustomContainer";

export default function Nft({user}){
    const {getNFTBalances, data} = useNFTBalances()

    useEffect(() => {
        getNFTBalances({
            params: {
                chain: "mumbai",
                address: user.get('ethAddress') 
            }
        }) 
    }, [])

    console.log(data)

    return(
        <CustomContainer>
           <Text fontSize="xl" fontWeight="bold">Meus NFTs</Text>
           {data && data.result.map(nft=>(
               <Box mt="4" px="2" py="2" borderWidth="1px" borderRadius="md" key={nft.token_uri}>
                   {nft.image && <Image src={nft.image}/>}
                   <p>Nome: {nft.metadata.name}</p>
                   <p>Descrição: {nft.metadata.description}</p>
                   <p>Categoria: {nft.metadata.attributes[0].value}</p>
                   <p>Tipo: {nft.metadata.attributes[1].value}</p>
                   <p>Cartas: {nft.metadata.attributes[2].value}</p>
                   <p>Tipo de Jogo: {nft.metadata.attributes[3].value}</p>
               </Box>
           ))}
        </CustomContainer>
    )
}