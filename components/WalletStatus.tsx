import { ChainWalletBase } from "@cosmos-kit/core";
import { SimpleModalHead } from "./SimpleConnectModalHead";
import { LogoStatus, ModalInfo } from "./types";
import {
  SimpleDisplayModalContent,
  SimpleInstallWalletButton
} from "./SimpleConnectModalContent";

export interface WalletStatusTypes {
  current: ChainWalletBase;
  isWalletConnecting?: boolean;
  setOpen: (isOpen: boolean) => void;
  onClose: () => void;
}

export const WalletStatus = ({
  current,
  setOpen,
  onClose
}: WalletStatusTypes) => {
  console.log("inside WalletStatus-", current);

  if (!current) {
    return <>WalletRepo.Current - undefined</>;
  }

  const displayName = current?.walletInfo.prettyName || current?.walletName;

  const {
    walletInfo: { prettyName, name, logo },
    message: errorMessage,
    walletStatus: status,
    downloadInfo,
    isMobile,
    connect,
    disconnect,
    qrUrl,
    username,
    address
  } = current!;

  if (status === "Connected") {
    onClose();
    setOpen(false);
  }

  const modalInfo: ModalInfo = {
    NotExist: {
      logoStatus: LogoStatus.Error,
      header: `${displayName} can't be found`,
      buttonText: `Install ${displayName}`,
      desc: downloadInfo?.link
        ? `If ${displayName} is installed on your device, please refresh this page or follow the wallet's setup instructions.`
        : `Download link not provided. Try searching it or consulting the developer team.`,
      onClick: () => {
        window.open(downloadInfo?.link, "_blank");
      },
      buttonDisabled: downloadInfo?.link ? false : true,
      icon: downloadInfo?.icon
    },
    Disconnected: {
      logoStatus: LogoStatus.Warning,
      header: isMobile ? "Wallet Authorization" : "Wallet is Disconnected",
      desc: isMobile ? "Approve connection in wallet app" : void 0,
      buttonText: isMobile ? "Open App" : "Connect Wallet",
      onClick: () => connect(),
      bottomLink:
        isMobile && downloadInfo ? (
          <button
            onClick={() => {
              window.open(downloadInfo?.link, "_blank");
            }}
          >
            <p className="text-white-100">dont have a wallet?</p>
          </button>
        ) : (
          void 0
        )
    },
    Connected: {
      buttonText: "Disconnect",
      onClick: async () => {
        await disconnect();
      }
      // icon: <Icon as={BiLogOut} />
    },
    Connecting: {
      logoStatus: LogoStatus.Loading,
      header: `Attempting to reach ${current?.chain.pretty_name}...`,
      desc: qrUrl
        ? `Approve the connection request on your mobile.`
        : isMobile
        ? `Open ${displayName} to connect your wallet.`
        : `If there isn't a modal popping up, check your internet connection or extension status.`
    },
    Rejected: {
      logoStatus: LogoStatus.Error,
      header: "Request Rejected",
      desc: "Connection permission is denied.",
      buttonText: "Reconnect",
      onClick: () => connect()
    },
    Error: {
      logoStatus: LogoStatus.Error,
      header: "Oops! Something wrong...",
      desc: errorMessage,
      buttonText: "Change Wallet"
    }
  };

  function getBottomButton() {
    const info = modalInfo[status];
    switch (status) {
      case "Connecting":
        return void 0;
      case "NotExist":
        return (
          <SimpleInstallWalletButton
            icon={info.icon as any}
            text={info.buttonText}
            onClick={info.onClick}
            disabled={info.buttonDisabled || false}
          />
        );
      default:
        return void 0;
    }
  }

  function getModalContent() {
    if (status === "Connected") {
      return (
        <SimpleDisplayModalContent
          logo={""}
          username={username}
          walletIcon={(typeof logo === "string" && logo) || void 0}
          addressButton={
            <p className={"text-white-500 px-4 text-center"}>{address}</p>
          }
          bottomButton={getBottomButton()}
        />
      );
    }

    const info = modalInfo[status];

    return (
      <SimpleDisplayModalContent
        status={info.logoStatus}
        logo={logo!.toString()}
        contentHeader={info.header}
        contentDesc={info.desc}
        bottomButton={getBottomButton()}
        bottomLink={info.bottomLink}
      />
    );
  }

  return (
    <div>
      <SimpleModalHead
        key={"modal-head"}
        title={displayName!}
        backButton={true}
        handleClose={() => {
          onClose();
          setOpen(false);
          if (status === "Connecting") {
            disconnect();
          }
        }}
        handleBack={() => {
          onClose();
        }}
      />
      {getModalContent()}
    </div>
  );
};
