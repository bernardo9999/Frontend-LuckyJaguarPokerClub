import { useMoralisWeb3Api } from "react-moralis";
import CustomContainer from "./CustomContainer";
import { useEffect, useState } from "react";
import { Button, Divider, FormControl, FormLabel, Input, Link, Text } from "@chakra-ui/react"

export default function Transactions({user}){
    const Web3Api = useMoralisWeb3Api()
    
    const BASE_URL = 'https://mumbai.polygonscan.com/tx/'

    const [transactions, setTransactions] = useState()

    const fetchTransactions = async ()=>{
        const data = await Web3Api.account.getTransactions({
            chain: "mumbai",
            address: user.get('ethAddress'),
            limit: 5
        })
        if(data){
            setTransactions(data.result)
        }
    }
    useEffect(()=>{
        fetchTransactions()
    },[])
    return(
        <CustomContainer>
            <Text fontSize="xl" mb="6" fontWeight="bold">Minhas últimas transações</Text>
            {transactions && transactions.map(transaction=>(
                <div key={transaction.hash}>
                    <Link href={`${BASE_URL}${transaction.hash}`} isExternal>➡️&nbsp;{transaction.hash} </Link>
                    <Divider></Divider>
                    
                </div>
            ))}
        </CustomContainer>
    )
}