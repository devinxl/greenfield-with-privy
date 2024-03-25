import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";
import { useRouter } from "next/router";
import { useAccount, useBalance, useSwitchChain } from "wagmi";

export const WalletInfo = () => {
  const router = useRouter();
  const { chains, error: switchNetworkError, switchChain } = useSwitchChain();
  const { address, chainId } = useAccount();
  const walletRes = useWallets();
  const { wallets } = walletRes;
  console.log("wallets", walletRes);
  const { login, logout, linkWallet, connectWallet } = usePrivy();
  const { setActiveWallet } = useSetActiveWallet();
  const { data, isError, isLoading } = useBalance({ address });
  return (
    <div>
      <div>get bsc testnet token: https://www.bnbchain.org/en/testnet-faucet</div>
      <div>current active account:{address}</div>
      <div>current active account balance: {data?.formatted}</div>
      <div>current active network: {chainId}</div>

      {wallets.map((wallet) => {
        return (
          <div
            key={wallet.address}
            className="flex min-w-full flex-row flex-wrap items-center justify-between gap-2 bg-slate-50 p-4"
          >
            <div>
              <div>{wallet.address}</div>
            </div>
            <button
              onClick={() => {
                setActiveWallet(wallet);
              }}
            >
              Make active
            </button>
          </div>
        );
      })}
      <button onClick={linkWallet}>Link another wallet</button>
      <button onClick={connectWallet}>Connect another wallet</button>
      <br />
      <button
        onClick={() => {
          switchChain?.({ chainId: 97 });
        }}
      >
        switch to bsc
      </button>
      <button
        onClick={() => {
          switchChain?.({ chainId: 5600 });
        }}
      >
        switch to gnfd
      </button>
      <button
        onClick={() => {
          login();
        }}
      >
        log in
      </button>
      <button
        onClick={async () => {
          await logout();
          router.push("/");
        }}
      >
        logout
      </button>
    </div>
  );
};
