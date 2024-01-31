import { ChainWalletBase, WalletModalProps } from "@cosmos-kit/core";
import QRCode from "qrcode.react";

export interface WalletUiConnectQrProps {
  current: ChainWalletBase;
}

export const WalletUiConnectQr = ({ current }: WalletUiConnectQrProps) => {
  console.log(current, "currentwalletRepoiq-");
  if (!current?.qrUrl?.data) {
    return null;
  }

  return (
    <div className={"w-[300px] h-[300px] mx-auto"}>
      <QRCode
        size={500}
        style={{ width: "100%", height: "100%" }}
        value={current?.qrUrl?.data!}
      />
    </div>
  );
};
