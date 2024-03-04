import { client } from '@/client';
import { useState } from 'react';
import { useAccount, useSignTypedData } from 'wagmi';

export const CreateGroup = () => {
  const { address, connector } = useAccount();
  const [createGroupInfo, setCreateGroupInfo] = useState({
    groupName: '',
  });
  const { data, isError, isPending, isSuccess, signTypedData } = useSignTypedData();

  return (
    <div>
      <h3>create group</h3>

      <input
        value={createGroupInfo.groupName}
        placeholder="group name"
        onChange={(e) => {
          setCreateGroupInfo({ ...setCreateGroupInfo, groupName: e.target.value });
        }}
      />

      <button
        onClick={async () => {
          if (!address) return;

          const createGroupTx = await client.group.createGroup({
            creator: address,
            groupName: createGroupInfo.groupName,
            extra: 'extra info',
          });

          const simulateInfo = await createGroupTx.simulate({
            denom: 'BNB',
          });

          console.log(simulateInfo);

          const res = await createGroupTx.broadcast({
            denom: 'BNB',
            gasLimit: Number(simulateInfo.gasLimit),
            gasPrice: simulateInfo.gasPrice,
            payer: address,
            granter: '',
            signTypedDataCallback: async (addr: string, message: string) => {
              // const provider = await connector?.getProvider();

              // return await provider?.request({
              //   method: 'eth_signTypedData_v4',
              //   params: [addr, message],
              // });
              const data = JSON.parse(message);
              console.log('data', data);
              const res = await signTypedData({
                ...data
              });
              return res;
              console.log('signTypedData-res', res)
            },
          });

          if (res.code === 0) {
            alert('create group success');
          }

          console.log(res);
        }}
      >
        create group
      </button>
    </div>
  );
};
