import { client } from '@/client';
import { useWallets } from '@privy-io/react-auth';
import { useState } from 'react';
import { parseEther } from 'viem';
import { useAccount } from 'wagmi';

export const Transfer = () => {
  const { address, connector } = useAccount();
  const [transferInfo, setTransferInfo] = useState({
    to: '0x0000000000000000000000000000000000000001',
    amount: '1',
    gasLimit: '210000',
  });
  const {wallets} = useWallets();
  const wallet = wallets[0]; // Replace this with your desired wallet
  const signTypedDataV4 = async (provider: any, addr: string, message: string) => {
    return await provider?.request({
      method: 'eth_signTypedData_v4',
      params: [addr, message],
    });
  };
  return (
    <div>
      <h2>Transfer</h2>
      to :
      <input
        value={transferInfo.to}
        placeholder="0x00000000000000000"
        onChange={(e) => {
          setTransferInfo({ ...transferInfo, to: e.target.value });
        }}
      />
      <br />
      amount:
      <input
        value={transferInfo.amount}
        placeholder="amount"
        onChange={(e) => {
          setTransferInfo({ ...transferInfo, amount: e.target.value });
        }}
      />
      <br />
      gas limit:
      <input
        value={transferInfo.gasLimit}
        placeholder="gas limit"
        onChange={(e) => {
          setTransferInfo({ ...transferInfo, gasLimit: e.target.value });
        }}
      />
      <br />
      <button
        onClick={async () => {
          if (!address) return;

          const transferTx = await client.account.transfer({
            fromAddress: address,
            toAddress: transferInfo.to,
            amount: [
              {
                denom: 'BNB',
                amount: parseEther(`${Number(transferInfo.amount)}`).toString(),
              },
            ],
          });

          const simulateInfo = await transferTx.simulate({
            denom: 'BNB',
          });

          console.log('simulateInfo', simulateInfo);
          const provider = await wallet.getEthereumProvider();

          const res = await transferTx.broadcast({
            denom: 'BNB',
            gasLimit: Number(simulateInfo.gasLimit),
            gasPrice: simulateInfo.gasPrice,
            payer: address,
            granter: '',
            signTypedDataCallback: async (addr: string, message: string) => {
              return await signTypedDataV4(provider, addr, message);
            },
          });

          if (res.code === 0) {
            alert('transfer success!!');
          }
        }}
      >
        broadcast with simulate
      </button>
    </div>
  );
};
