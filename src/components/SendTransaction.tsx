'use client';

import Button from './Button';
import Wrapper from './Wrapper';
import {parseEther} from 'viem';
import {useSendTransaction} from 'wagmi';

const SendTransaction = () => {
  const transactionRequest = {
    to: '0xe376F3E7Fb15B526152F0db6805F1002564cbC2B' as `0x${string}`,
    value: parseEther('0.001'),
  };

  const {data, isPending, isSuccess, sendTransaction} = useSendTransaction();

  return (
    <Wrapper title="useSendTransaction">
      <div className="rounded bg-red-400 px-2 py-1 text-sm text-white">
        We recommend doing this on goerli.
      </div>
      <Button
        cta="Send to privy.io.eth"
        onClick_={() => sendTransaction(transactionRequest)}
        disabled={!sendTransaction}
      />
      {isPending && <div>Check wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </Wrapper>
  );
};

export default SendTransaction;
