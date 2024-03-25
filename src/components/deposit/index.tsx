import { CROSS_CHAIN_CONTRACT_ADDRESS, TOKEN_HUB_CONTRACT_ADDRESS } from '@/config/env';
import { CROSS_CHAIN_ABI, TOKENHUB_ABI } from '@/constants/abi';
import { useState } from 'react';
import { WriteContractParameters, parseEther } from 'viem';
import { useAccount, useWalletClient } from 'wagmi';
import { publicClient } from './client';
import { bscTestnet } from 'viem/chains';

export const Deposit = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient({account: address, chainId: 97});
  const [depositAmount, setDepositAmount] = useState(0);

  return (
    <div>
      <h2> Deposit </h2>
      amount:
      <input
        onChange={(e) => {
          setDepositAmount(parseFloat(e.target.value));
        }}
      />
      <br />
      <button
        onClick={async () => {
          if (!walletClient || !address) return;
          const relayFees = await publicClient.readContract({
            abi: CROSS_CHAIN_ABI,
            address: CROSS_CHAIN_CONTRACT_ADDRESS,
            functionName: 'getRelayFees',
          });
          const [relayFee, ackRelayFee] = relayFees as [bigint, bigint];
          const amount = parseEther(`${depositAmount}`);
          const amount_with_relay_fee = relayFee + ackRelayFee + amount;

          const writeContractPayload: WriteContractParameters = {
            address: TOKEN_HUB_CONTRACT_ADDRESS,
            abi: TOKENHUB_ABI,
            functionName: 'transferOut',
            chain: bscTestnet,
            args: [address, amount],
            account: address,
            value: amount_with_relay_fee,
          };

          console.log('writeContractPayload', writeContractPayload)
          try {
            const txHash = await walletClient.writeContract(writeContractPayload);
            window.alert(`Deposit success - ${ txHash }`);
          } catch (e) {
            console.log('writeContract - error', e);
          }


          // console.log(txHash);
          // readContract();
        }}
      >
        deposit
      </button>
    </div>
  );
};
