import { wallets as cosmostationWallets } from "@cosmos-kit/cosmostation-extension";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { ChainProvider } from "@cosmos-kit/react-lite";
import { wallets as leapWallets } from "@cosmos-kit/leap-extension";
import { assets, chains } from "chain-registry";
import { ReactNode } from "react";
import { WalletUi } from "./WalletUi";
import {supportedChains} from "../pages";

export type WalletProviderProps = {
  children: ReactNode;
};

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const allWallets = [...keplrWallets, ...cosmostationWallets, ...leapWallets];

  const filterChains = chains.filter((item) =>
    supportedChains.includes(item.chain_name)
  );

  return (
    <ChainProvider
      assetLists={assets}
      chains={filterChains}
      endpointOptions={{
        endpoints: {
          persistence: {
            rpc: ["https://rpc.cosmos.audit.one/"],
            rest: ["https://rest.cosmos.audit.one/"],
            isLazy: true
          }
        }
      }}
      walletConnectOptions={{
        signClient: {
          projectId: "bccc8efe6709aa7387ac47c061ee6b65",
          relayUrl: "wss://relay.walletconnect.org",
          metadata: {
            name: "persistence",
            description: "desc,",
            url: "/",
            icons: ["/"]
          }
        }
      }}
      walletModal={WalletUi}
      wallets={allWallets}
    >
      {children}
    </ChainProvider>
  );
};
