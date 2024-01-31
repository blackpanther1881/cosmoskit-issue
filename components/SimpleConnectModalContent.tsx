import Image from "next/image";
import { Button } from "@persistenceone/persistence-ui-components";

import { ConnectModalContentType, DownloadWalletButtonType } from "./types";

export const SimpleInstallWalletButton = ({
  icon,
  text,
  onClick,
  disabled
}: DownloadWalletButtonType) => {
  return (
    <Button
      size="medium"
      type="primary"
      content={
        <div className={"w-full flex justify-center"}>
          <div className={"flex-1"}>
            <p className={"text-white-100"}>{text ? text : `Install Wallet`}</p>
          </div>
        </div>
      }
      className={`button md:text-xsm md:py-2 md:px-4 !text-sm !px-6 text-white-100`}
      onClick={onClick}
    />
  );
};

export const SimpleDisplayModalContent = ({
  status,
  logo,
  contentHeader,
  contentDesc,
  username,
  walletIcon,
  addressButton,
  bottomButton,
  bottomLink
}: ConnectModalContentType) => {
  return (
    <div>
      <div className={"flex flex-col"}>
        {logo && (
          <div className="mx-auto flex h-full max-w-sm flex-col items-center justify-center gap-12 pt-3">
            <div
              className={`mb-4 flex h-16 w-16 items-center justify-center after:absolute after:h-[70px] after:w-[70px] after:rounded-full after:border-2  ${
                status === "loading"
                  ? "after:animate-spin-slow  after:border-l-red-300 after:border-r-red-300 after:border-t-transparent after:border-b-transparent"
                  : "after:border-red-500"
              }`}
            >
              <Image width={30} height={30} src={logo} alt="Wallet logo" />
            </div>
          </div>
        )}
        {contentHeader && (
          <p
            className={"text-white-100 mb-4 font-medium text-base text-center"}
          >
            {contentHeader}
          </p>
        )}
        {contentDesc && (
          <div className={"relative mb-2"}>
            <p className={"text-white-500 px-4 text-center"}>{contentDesc}</p>
          </div>
        )}
        {username && (
          <div className={"bg-black-200 rounded-md p-4"}>
            <div className={"flex justify-center items-center mb-2"}>
              <Image
                width={23}
                height={24}
                src={walletIcon!}
                alt={"wallet"}
                className={""}
              />
              <p className={"text-white-100 mx-2"}>{username}</p>
            </div>
            {addressButton && <div className={"flex-1"}>{addressButton}</div>}
          </div>
        )}

        {bottomButton && (
          <div className={"flex justify-center m-2"}>{bottomButton}</div>
        )}
      </div>
    </div>
  );
};
