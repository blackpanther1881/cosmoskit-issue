import { State, WalletModalProps, ChainWalletBase } from "@cosmos-kit/core";
import { useEffect, useState } from "react";
import { WalletUiConnectQr } from "./WalletUiConnectQr";
import { WalletUiWalletList } from "./WalletUiWalletList";
import { Modal } from "@persistenceone/persistence-ui-components";
import { WalletStatus } from "./WalletStatus";
import { useChain, useManager } from "@cosmos-kit/react-lite";
import { SimpleModalHead } from "./SimpleConnectModalHead";

export const WalletUi = (props: WalletModalProps) => {
  const [qrState, setQRState] = useState<State>(State.Init);
  const [selectedWallet, setSelectedWallet] = useState<ChainWalletBase | null>(
    null
  );

  const [qrErrorMessage, setQRErrorMessage] = useState<string>();
  const [connectStatus, setConnectStatus] = useState<boolean>(false);

  const { isWalletConnected } = useChain("persistence");

  const { isOpen, setOpen, walletRepo } = props;

  console.log(walletRepo, "walletRepo");

  const current = walletRepo?.current;

  const {
    isWalletConnecting = false,
    message: errorMessage,
    walletStatus: status
  } = current || {};

  useEffect(() => {
    if (isWalletConnected) {
      setConnectStatus(false);
    }
  }, [qrState, status, isOpen, current, isWalletConnected]);

  if (!walletRepo) {
    return <></>;
  }

  if (
    current?.client &&
    "qrUrl" in current.client &&
    "setActions" in current.client
  ) {
    (current.client as any).setActions?.({
      qrUrl: {
        state: setQRState,
        message: setQRErrorMessage
      }
    });
  }

  const showWalletConnectQr = isWalletConnecting && qrState === State.Done;

  return (
    <Modal
      show={isOpen}
      header={null}
      className=""
      modalDialogClassName={"!max-w-[600px]"}
      staticBackDrop={false}
      closeButton={null}
      onClose={async () => {
        setOpen(false);
      }}
    >
      {!connectStatus ? (
        <WalletUiWalletList
          connect={async (wallet) => {
            setQRState(State.Init);
            setQRErrorMessage(undefined);
            setConnectStatus(true);
            setSelectedWallet(wallet);
            try {
              await wallet.connect();
            } catch (err) {
              setConnectStatus(false);
              console.log(err, "error in connect");
            }
          }}
          walletRepo={walletRepo}
        />
      ) : showWalletConnectQr ? (
        // qr code view
        <div>
          <SimpleModalHead
            title={"Scan QRCode"!}
            backButton={true}
            handleClose={() => {
              setConnectStatus(false);
              setOpen(true);
            }}
            handleBack={() => {
              setConnectStatus(false);
            }}
          />
          <WalletUiConnectQr key={"qr-code"} current={selectedWallet!} />
        </div>
      ) : (
        <WalletStatus
          current={walletRepo.current!}
          onClose={() => {
            setConnectStatus(false);
          }}
          setOpen={setOpen}
        />
      )}
    </Modal>
  );
};
