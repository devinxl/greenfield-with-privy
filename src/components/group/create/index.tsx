import { client } from "@/client";
import { useWallets } from "@privy-io/react-auth";
import { useState } from "react";
import { Connector, useAccount, useSignTypedData } from "wagmi";
export const signTypedDataV4 = async (provider: any, addr: string, message: string) => {
  return await provider?.request({
    method: 'eth_signTypedData_v4',
    params: [addr, message],
  });
};

export const signTypedDataCallback = (connector: Connector) => {
  return async (addr: string, message: string) => {
    const provider = await connector.getProvider();
    const parsed = JSON.parse(message);
    parsed.domain.salt = "0";
    console.log('before-signed-parsed', parsed);
    const newMsg = JSON.stringify(parsed);
    const signedRes = await signTypedDataV4(provider, addr, newMsg);
    console.log('signedRes', signedRes);
    return signedRes;
  };
};

export const CreateGroup = () => {
  const { address, connector } = useAccount();
  const [createGroupInfo, setCreateGroupInfo] = useState({
    groupName: "",
  });

  const walletRes = useWallets();
  const { wallets } = walletRes;
  const wallet = wallets[0];
  return (
    <div>

      <h3>create group</h3>

      <input
        value={createGroupInfo.groupName}
        placeholder="group name"
        onChange={(e) => {
          setCreateGroupInfo({
            ...setCreateGroupInfo,
            groupName: e.target.value,
          });
        }}
      />

      <button
        onClick={async () => {
          if (!address) return;

          console.log('address', address, wallet);
          const createGroupTx = await client.group.createGroup({
            creator: address,
            groupName: createGroupInfo.groupName,
            extra: "extra info",
          });

          const simulateInfo = await createGroupTx.simulate({
            denom: "BNB",
          });

          console.log(simulateInfo);

          debugger;
          const res = await createGroupTx.broadcast({
            denom: "BNB",
            gasLimit: Number(simulateInfo.gasLimit),
            gasPrice: simulateInfo.gasPrice,
            payer: address,
            granter: "",
            signTypedDataCallback: signTypedDataCallback(connector),
            //   async (addr: string, message: string) => {
            //   const provider = await connector?.getProvider();

            //   console.log("provider", provider);
            //   // return await provider?.request({
            //   //   method: 'eth_signTypedData_v4',
            //   //   params: [addr, message],
            //   // });
            //   const data = JSON.parse(message);
            //   console.log("data", data, message);
            //   debugger;
            //   const res = await signTypedData({
            //     ...data,
            //   });
            //   return res;
            //   console.log("signTypedData-res", res);
            // },
          });

          if (res.code === 0) {
            alert("create group success");
          }

          console.log(res);
        }}
      >
        create group
      </button>
    </div>
  );
};
