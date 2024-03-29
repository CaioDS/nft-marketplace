import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { createDefaultState, createWeb3State, loadContract, Web3State } from "./utils";
import { ethers } from 'ethers';

interface IWe3ContextProps {
    children: ReactNode;
}

const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider = ({ children }: IWe3ContextProps) => {
    const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState())

    useEffect(() => {
        async function initWeb3() {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum as any);
                const contract = await loadContract("NftMarket", provider);

                setWeb3Api(createWeb3State({
                    ethereum: window.ethereum,
                    provider,
                    contract,
                    isLoading: false
                }));

            } catch (error: any) {
                console.log('Por favor, instale uma carteira Web3');
                setWeb3Api((api) => createWeb3State({
                    ...api as any,
                    isLoading: false,
                }))
            }
        }

        initWeb3();
    }, []);


    return (
        <Web3Context.Provider value={web3Api}>
            {children}
        </Web3Context.Provider>
    );
}

export function useWeb3() {
    return useContext(Web3Context);
}

export function useHooks() {
    const { hooks } = useWeb3();
    return hooks;
}

export default Web3Provider;