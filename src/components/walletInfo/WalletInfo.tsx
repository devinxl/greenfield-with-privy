import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useDisconnect, useSwitchChain } from "wagmi";


export const WalletInfo = () => {
  const { disconnect } = useDisconnect();
  const {
    chains, error: switchNetworkError, switchChain,
  } = useSwitchChain();
  const wallets = useWallets();
  console.log("wallets", wallets);
  const { logout } = usePrivy();
  return (
    <div>
      {/* <ConnectButton accountStatus="address" /> */}
      <div>
        current account:{wallets?.wallets[0]?.address}
      </div>
      <div>
        current network: {wallets?.wallets[0]?.chainId}
      </div>
      <button
        onClick={() => {
          switchChain?.({chainId: 97})
        }}
      >
        switch to bsc
      </button>
      <button
        onClick={() => {
          switchChain?.({chainId: 5600})
        }}
      >
        switch to gnfd
      </button>
      <button
        onClick={() => {
          logout();
        }}
      >
        logout
      </button>
    </div>
  );
};
