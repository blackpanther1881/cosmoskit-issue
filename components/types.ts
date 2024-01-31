import { MouseEventHandler, ReactNode, RefObject } from "react";
import { ChainWalletBase } from "@cosmos-kit/core";
import { WalletRepo } from "@cosmos-kit/core/cjs/repository";
export declare enum WalletStatus {
  Disconnected = "Disconnected",
  Connecting = "Connecting",
  Connected = "Connected",
  NotExist = "NotExist",
  Rejected = "Rejected",
  Error = "Error"
}
export type ConnectModalContentHeader = {
  size?: string;
  title: string;
  leftButton?: ReactNode;
  rightButton?: ReactNode;
};
export type ConnectModalContentType = {
  size?: string;
  logo?: string;
  status?: LogoStatus;
  username?: string;
  walletIcon?: string;
  contentHeader?: string;
  contentDesc?: string;
  addressButton?: ReactNode;
  bottomButton?: ReactNode;
  bottomLink?: ReactNode;
};
export type DownloadWalletButtonType = {
  icon?: any;
  text?: string;
  onClick?: () => void;
  disabled: boolean;
};
export type Downloads = {
  desktop: DownloadInfo[];
  tablet: DownloadInfo[];
  mobile: DownloadInfo[];
  default: string;
};
export type DownloadInfo = {
  browser?: string;
  os?: string;
  icon?: any;
  link: string;
};
export type WalletMode = "extension" | "wallet-connect";
export type Wallet = {
  name: string;
  prettyName?: string;
  logo?: string;
  mode: WalletMode;
  mobileDisabled: boolean;
  rejectMessage?: string;
  downloads?: Downloads;
  onClick?: () => void;
};
export type DisplayWalletListType = {
  initialFocus: RefObject<any>; // eslint-disable-line
  size?: string;
  connect?: (wallet: ChainWalletBase) => void;
  // walletRepo?: WalletRepo;
  walletsData: Wallet[];
};

export type SimpleModalHeadType = {
  title: string;
  backButton: boolean;
  handleBack?: () => void;
  handleClose: () => void;
};
export type ConnectModalType = {
  initialRef: RefObject<any>;
  modalHead: ReactNode;
  modalContent: ReactNode;
  modalIsOpen: boolean;
  modalOnClose: () => void;
};

export type DisplayType = "list" | "single";

export enum LogoStatus {
  Loading = "loading",
  Warning = "warning",
  Error = "error"
}

export interface StatusInfo {
  logoStatus?: LogoStatus;
  header?: string;
  desc?: string;
  buttonText?: string;
  onClick?: () => void;
  buttonDisabled?: boolean;
  icon?: any;
  bottomLink?: ReactNode;
}

export type ModalInfo = {
  [k in WalletStatus]: StatusInfo;
};
