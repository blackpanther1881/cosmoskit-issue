import { ChainWalletBase, WalletModalProps } from "@cosmos-kit/core";
import { Button } from "@persistenceone/persistence-ui-components";
import React from "react";

export type WalletUiWalletListProps = Pick<WalletModalProps, "walletRepo"> & {
  connect: (wallet: ChainWalletBase) => void;
};

export const WalletUiWalletList = ({
  walletRepo,
  connect
}: WalletUiWalletListProps) => {
  if (!walletRepo) {
    return null;
  }

  const { current, isMobile, platformEnabledWallets: wallets } = walletRepo;

  const otherWallets = wallets.filter(
    (wallet) => !wallet.walletName.startsWith("web3auth_")
  );
  const installedExtensionWallets = otherWallets.filter(
    (wallet) => !wallet.isModeWalletConnect && !wallet.isWalletNotExist
  );
  const mobileWallets = otherWallets.filter(
    (wallet) => wallet.isModeWalletConnect
  );
  const notInstalledWallets = otherWallets.filter(
    (wallet) => wallet.isWalletNotExist
  );

  const isConnectingTo = (wallet: ChainWalletBase) =>
    current?.isWalletConnecting && current.walletName === wallet.walletName;

  const makeWalletOnClick = (wallet: ChainWalletBase) => async () => {
    try {
      if (current) {
        await current?.disconnect(true);
      }
    } catch (error) {
      console.error("Failed disconnecting from current wallet", error);
    }

    if (!isConnectingTo(wallet)) {
      connect(wallet);
    }
  };

  const mobileWalletsRender = (
    <div className="flex flex-col gap-2 py-6 px-8">
      <p className="primary-text truncate">mobileWallets</p>
      <div className="grid grid-cols-3 gap-1">
        {mobileWallets.map((wallet) => (
          <Button
            key={wallet.walletName}
            size="medium"
            onClick={makeWalletOnClick(wallet)}
            type="primary"
            content={
              <p className="secondary-text text-center">
                {wallet.walletInfo.prettyName}
              </p>
            }
            className={`button md:text-xsm md:py-2 md:px-4 !text-sm !px-6 text-white-100`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="-m-6 flex flex-col">
      {installedExtensionWallets.length + notInstalledWallets.length > 0 && (
        <div className="flex flex-col gap-3 border-b border-border-base py-6 px-8">
          {installedExtensionWallets.length > 0 && (
            <>
              <p className="primary-text truncate">browserWallets</p>

              <div className="grid grid-cols-3 gap-1">
                {installedExtensionWallets.map((wallet) => (
                  <Button
                    key={wallet.walletName}
                    size="medium"
                    onClick={makeWalletOnClick(wallet)}
                    type="primary"
                    content={
                      <p className="secondary-text text-center">
                        {wallet.walletInfo.prettyName}
                      </p>
                    }
                    className={`button md:text-xsm md:py-2 md:px-4 !text-sm !px-6 text-white-100`}
                  />
                ))}
              </div>
            </>
          )}

          {notInstalledWallets.length > 0 && (
            <>
              <div className="grid grid-cols-3 gap-1">
                {notInstalledWallets.map((wallet) => (
                  <Button
                    key={wallet.walletName}
                    size="medium"
                    onClick={makeWalletOnClick(wallet)}
                    type="primary"
                    content={
                      <p className="secondary-text text-center">
                        {wallet.walletInfo.prettyName}
                      </p>
                    }
                    className={`button md:text-xsm md:py-2 md:px-4 !text-sm !px-6 text-white-100`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {!isMobile && mobileWalletsRender}
    </div>
  );
};
