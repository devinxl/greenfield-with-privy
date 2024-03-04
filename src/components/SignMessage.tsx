'use client';

import {useAccount, useSignMessage} from 'wagmi';

import {usePrivy} from '@privy-io/react-auth';
import { shorten } from '@/utils/shorten';

const SignMessage = () => {
  const {user} = usePrivy();
  const {address} = useAccount();
  const {data, isPending, isSuccess, isError, signMessage} = useSignMessage({
    mutation: {
      onSuccess: () => {
        console.log('Sign Message Success');
      },
    }
  });
  return (
    <>
      <h2 className="mt-6 text-2xl">useSignMessage</h2>
      <button
        disabled={isPending}
        onClick={() => {
          signMessage({
            message: `Signing with WAGMI\nWAGMI address: ${shorten(
              address,
            )}\nPrivy address: ${shorten(user?.wallet?.address)}`,
          });
        }}
      >
      Sign!
    </button>
      {isSuccess && <div>Signature: {shorten(data)}</div>}
      {isError && <div>Error signing message</div>}
    </>
  );
};

export default SignMessage;
