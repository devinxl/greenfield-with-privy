
import { greenfield_mainnet, greenfield_testnet, supportedChains } from "@/config/chains";
import "@/styles/globals.css";
import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { createConfig, WagmiProvider } from "@privy-io/wagmi";
import { bsc, bscTestnet } from 'viem/chains';
import { http } from 'viem';

const queryClient = new QueryClient();
const wagmiConfig = createConfig({
  chains: [
    bsc,
    bscTestnet,
    greenfield_testnet,
    greenfield_mainnet
  ],
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
    [greenfield_testnet.id]: http(),
    [greenfield_mainnet.id]: http(),
  },
  multiInjectedProviderDiscovery: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrivyProvider
      appId="clsvvsczh0avt13ayzlnfj455"
      config={{
        appearance: {
          logo: "https://framerusercontent.com/images/zz357ILNW0eqAkrS5Uj4JLirpg.png",
          theme: "dark",
          showWalletLoginFirst: true,
          walletList: [
            "detected_wallets",
            "metamask",
            "rainbow",
            "wallet_connect",
          ],
        },
        defaultChain: greenfield_testnet,
        supportedChains: supportedChains,
        embeddedWallets: {
          createOnLogin: 'users-without-wallets'
        }
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
          <Component {...pageProps} />
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
