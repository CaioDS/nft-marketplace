import { Web3Dependencies } from "../../../types/hooks";
import { hookFactory as createAccountHook, UseAccountHook } from "./useAccount";

export type Web3Hooks = {
    useAccount: UseAccountHook;
}

export type SetupHooks = {
    (dependencies: Web3Dependencies): Web3Hooks;
}

export const setupHooks: SetupHooks = (dependencies) => {
    return {
        useAccount: createAccountHook(dependencies),
    }
}
