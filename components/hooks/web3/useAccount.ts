import useSWR from "swr";
import { CryptoHookFactory } from "@_types/hooks";
import { useEffect } from "react";

type UseAccountResponse = {
    connect: () => void;
    isLoading: boolean;
    isInstalled: boolean;
}

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>;

export type UseAccountHook = ReturnType<AccountHookFactory>;

// deps -> provider, ethereum, contract (web3State)
export const hookFactory: AccountHookFactory = ({ provider, ethereum, isLoading }) => () => {
    const { data, mutate, isValidating, ...swr } = useSWR(provider ? "web3/useAccount" : null,
        async () => {
            const accounts = await provider!.listAccounts();
            const account = accounts[0];

            if (!account) {
                throw "Não foi possível obter sua conta! Por favor, conecte a sua carteira Web3!";
            }

            return account;
        }, {
        revalidateOnFocus: false
    });

    useEffect(() => {
        ethereum?.on("accountsChanged", handleAccountsChanged)
        return () => {
            ethereum?.removeListener("accountsChanged", handleAccountsChanged)
        }
    })

    const handleAccountsChanged = (...args: unknown[]) => {
        const accounts = args[0] as string;
        if (accounts.length === 0) {
            console.error('Por favor, se conecte a uma carteira Web3')
        } else if (accounts[0] !== data) {
            mutate(accounts[0]);
        }
    }

    const connect = async () => {
        try {
            ethereum?.request({ method: "eth_requestAccounts" });
        } catch (error) {
            console.error(error);
        }
    }

    return {
        ...swr,
        data,
        isValidating,
        isLoading: isLoading || isValidating,
        isInstalled: ethereum?.isMetaMask || false,
        mutate,
        connect
    };
}