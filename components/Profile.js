import CustomContainer from "./CustomContainer";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react"
import { useState } from "react";
import { useMoralis } from "react-moralis";

export default function Profile({user}){
    const [input, setInput] = useState('')
    const {setUserData, isUserUpdating} = useMoralis()
    return(
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold">Meu Perfil</Text>
            <br></br>
            <Text><b>😎&nbsp;Usuário: </b>{user.getUsername()}</Text>
            <Text><b>💰&nbsp;Carteira: </b>{user.get('ethAddress')}</Text>
            <form onSubmit={e=> {
                e.preventDefault()
                if(input.trim() !== ''){
                    setUserData({
                        username: input,
                    }).then(()=>setInput(''))
                }
            }}>
            <FormControl mt="6" mb="6">
                <FormLabel htmlFor="username">Inserir um novo usuário</FormLabel>
                <Input id="username" type="text" placeholder="insira nome" value={input} onChange={e => setInput(e.target.value)}></Input>
            </FormControl>
            <Button type="submit" colorScheme="purple" disabled={isUserUpdating}>✔ Mudar usuário</Button>
            </form>
        </CustomContainer>
    )
}