export const chainIdToChainInfo: {
  [key: number]: { iconLight: string; iconDark: string; name: string };
} = {
  1: {
    iconDark: "/icons/eth-icon-light.svg",
    iconLight: "/icons/eth-icon-dark.svg",
    name: "Ethereum",
  },
  11155111: {
    iconDark: "/icons/eth-icon-light.svg",
    iconLight: "/icons/eth-icon-dark.svg",
    name: "Ethereum Sepolia",
  },
};