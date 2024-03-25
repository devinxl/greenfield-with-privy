import { useIsMounted } from "@/hooks/useIsMounted";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import Link from "next/link";

export default function Home() {
  const isMounted = useIsMounted();
  const { login, ready, authenticated } = usePrivy();

  if (!isMounted) return null;

  return (
    <>
      {ready && !authenticated && (
        <>
          <p>You are not authenticated with Privy</p>
          <button onClick={login}>Login With Privy</button>
        </>
      )}
      {ready && authenticated && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            You are logged in with privy. You can now access the following pages.
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
          </div>
        </>
      )}
    </>
  );
}
