import { useChains } from "@cosmos-kit/react-lite";
import React from "react";

export const supportedChains = ["osmosis", "cosmoshub", "persistence"];

export default function SwapPage() {
  const chains = useChains(supportedChains);

  const { connect, openView, isWalletConnected, disconnect, signAndBroadcast } =
    chains.osmosis;

  return (
    <div>
      {isWalletConnected ? (
        <button
          className={"text-white-100"}
          onClick={() => {
            disconnect();
          }}
        >
          Disconnect
        </button>
      ) : (
          <button
              className={"text-white-100"}
              onClick={openView}
          >
            Connect Wallet
          </button>
      )}
    </div>
  );
}
