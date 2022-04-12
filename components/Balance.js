import CustomContainer from "./CustomContainer";
import { Divider, Text } from "@chakra-ui/react";
import { useERC20Balances, useMoralis, useMoralisWeb3Api} from "react-moralis";
import { useEffect , useState} from "react";
import { Moralis } from "moralis"

export default function Balance({ user }) {

  const Web3Aapi = useMoralisWeb3Api();
    const {fetchERC20Balances, data} = useERC20Balances()
  const [ethBalance, setEthBalance] = useState(0);

  const fecthNativeBalance = async () => {
    const result = await Web3Aapi.account
      .getNativeBalance({
        chain: "mainnet",
        address: user.get("ethAddress"),
      })
      .catch((e) => console.log(e));
    if (result.balance) {
        setEthBalance(Moralis.Units.FromWei(result.balance));
    }
  };

  useEffect(() => {
    fecthNativeBalance();
    fetchERC20Balances({
        params:{
            chain: "mainnet",
            address: user.get('ethAddress')
        }
    });
  }, []);


  return (
    <CustomContainer>
      <Text mb="6" fontSize="xl" fontWeight="bold">Meus Tokens ERC20</Text>
      {ethBalance && <Text>💰&nbsp;{ethBalance} <b>ETH</b></Text>}
      <Divider></Divider>
      {data && data.map(token =>(
          <div key={token.symbol}>
              <Text>💰&nbsp;{Moralis.Units.FromWei(token.balance)} <b>{token.symbol}</b></Text>
      <Divider></Divider>
          </div>
      ))}
    </CustomContainer>
  );
}
