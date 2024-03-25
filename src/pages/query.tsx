import { QueryComponent } from '@/components/query';
import { WalletInfo } from '@/components/walletInfo/WalletInfo';
import { useIsMounted } from '@/hooks/useIsMounted';
import { usePrivy } from '@privy-io/react-auth';

export default function Rpc() {
  const isMounted = useIsMounted();
  const {ready, authenticated} = usePrivy();

  if (!isMounted) return null;

  return (
    <div style={{ padding: 10 }}>
      <WalletInfo />

      <hr style={{ margin: '10px 0' }} />

      {ready && authenticated && (
        <>
          <h2>Query</h2>

          <QueryComponent />
        </>
      )}
    </div>
  );
}
