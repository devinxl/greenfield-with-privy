import { WalletInfo } from '@/components/walletInfo/WalletInfo';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useAccount } from 'wagmi';
import SignMessage from '@/components/SignMessage';
import Transaction from '@/components/Transaction';
import PublicClient from '@/components/PublicClient';
import Balance from '@/components/Balance';
import SendTransaction from '@/components/SendTransaction';

export default function Tx() {
  const isMounted = useIsMounted();
  const { isConnected } = useAccount();

  if (!isMounted) return null;

  return (
    <div style={{ padding: 10 }}>
      <WalletInfo />

      <hr style={{ margin: '10px 0' }} />

      {isConnected && (
        <>
          <SignMessage />
          <hr style={{ margin: '10px 0' }} />
          <Transaction />
          <hr style={{ margin: '10px 0' }} />
          <PublicClient />
          <hr style={{ margin: '10px 0' }} />
          <Balance/>
          <hr style={{ margin: '10px 0' }} />
          <SendTransaction/>
          <hr style={{ margin: '10px 0' }} />
        </>
      )}
    </div>
  );
}
