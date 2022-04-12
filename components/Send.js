import { useState } from "react";
import CustomContainer from "./CustomContainer";
import { Text, Input, FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Button, useToast } from "@chakra-ui/react";
import { useWeb3Transfer } from "react-moralis";
import Moralis from "moralis";


export default function Send() {

    const [amount, setAmount] = useState(0)
    const [receiver, setReceiver] = useState('')
    const handelChange = (value) => setAmount(value)
    const {fetch, isFetching} = useWeb3Transfer({
        amount: Moralis.Units.ETH(amount),
        receiver: receiver,
        type: 'native'
    })
    const toast = useToast()

    return (
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold">Enviar ETH</Text>
            <form onSubmit={async e =>
            {e.preventDefault()
            await Moralis.enableWeb3()
            fetch({
                onSuccess: () => {
                    toast({
                        title: 'ETH enviado exitosamente',
                        description: 'Novo ETH se encontra na wallet do receptor',
                        status: 'success',
                        duration: 3000,
                        isClosable: true
                    })
                    setReceiver('')
                },
                onError: (error)=>{
                    toast({
                        title: 'Erro',
                        description: error,
                        status: 'error',
                        duration: 3000,
                        isClosable: true
                    })
                }
            })
            }}>
                <FormControl mt="4">
                    <FormLabel htmlFor="amount">
                        Quantidade
                    </FormLabel>
                    <NumberInput step={0.1} onChange={handelChange}>
                        <NumberInputField id="amount" value={amount}></NumberInputField>
                        <NumberInputStepper>
                            <NumberIncrementStepper></NumberIncrementStepper>
                            <NumberDecrementStepper></NumberDecrementStepper>
                        </NumberInputStepper>
                    </NumberInput>
                    <FormLabel mt="4" htmlFor="receiver">Enviar para</FormLabel>
                    <Input id="receiver" type="text" placeholder="Endereço" value={receiver} onChange={e => setReceiver(e.target.value)}></Input>
                </FormControl>
                <Button mt="4" type="submit" colorScheme="purple" _disabled={isFetching}>💸&nbsp; Enviar</Button>
            </form>
        </CustomContainer>
    )
}