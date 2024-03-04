import { useIsMounted } from '@/hooks/useIsMounted';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import Link from 'next/link';

export default function Home() {
  const isMounted = useIsMounted();
  const { login } = usePrivy();
  const wallets = useWallets();

  console.log('wallets', wallets);
  if (!isMounted) return null;

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <li>
          <button onClick={login}>Log in</button>
        </li>
        <li>
          <Link href="/tx" color="#900" style={{ fontSize: 30 }}>
            Tx
          </Link>
        </li>

        <li>
          <Link href="/query" color="#900" style={{ fontSize: 30 }}>
            Query
          </Link>
        </li>
        <li>
          <Link href="/embed" color="#900" style={{ fontSize: 30 }}>
            embed
            </Link>
        </li>
      </div>
    </>
  );
}
