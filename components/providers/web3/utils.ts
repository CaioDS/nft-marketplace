import { MetaMaskInpageProvider } from "@metamask/providers";
import { providers, Contract } from "ethers";

declare global {
    interface Window {
        ethereum: MetaMaskInpageProvider;
    }
}

export type Web3Params = {
    ethereum: MetaMaskInpageProvider | null;
    provider: providers.Web3Provider | null;
    contract: Contract | null;
};

export type Web3State = {
    isLoading: boolean;
} & Web3Params;

export const createDefaultState = () => {
    const defaultState: Web3State =
    {
        ethereum: null,
        provider: null,
        contract: null,
        isLoading: true
    }

    return defaultState;
}