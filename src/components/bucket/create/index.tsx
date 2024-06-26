import { client, selectSp } from "@/client";
import { getOffchainAuthKeys } from "@/utils/offchainAuth";
import {
  GRNToString,
  newBucketGRN,
  newGroupGRN,
} from "@bnb-chain/greenfield-js-sdk";
import { useWallets } from "@privy-io/react-auth";
import { add } from "lodash";
import { useState } from "react";
import { useAccount } from "wagmi";

export const CreateBucket = () => {
  const { connector } = useAccount();
  const [createBucketInfo, setCreateBucketInfo] = useState<{
    bucketName: string;
  }>({
    bucketName: "",
  });

  const { wallets } = useWallets();
  const wallet = wallets[0];
  console.log("wallet-create-bucket", wallet);
  const address = wallet?.address;
  console.log("address", address);
  return (
    <>
      <h4>Create Bucket</h4>
      bucket name :
      <input
        value={createBucketInfo.bucketName}
        placeholder="bucket name"
        onChange={(e) => {
          setCreateBucketInfo({
            ...createBucketInfo,
            bucketName: e.target.value,
          });
        }}
      />
      <br />
      <button
        onClick={async () => {
          if (!address) return;

          const spInfo = await selectSp();
          console.log("spInfo", spInfo);

          debugger;
          const provider = await wallet.getEthereumProvider();
          const offChainData = await getOffchainAuthKeys(address, provider);
          if (!offChainData) {
            alert("No offchain, please create offchain pairs first");
            return;
          }
          const signTypedDataV4 = async (provider: any, addr: string, message: string) => {
            return await provider?.request({
              method: 'eth_signTypedData_v4',
              params: [addr, message],
            });
          };
          try {
            const createBucketTx = await client.bucket.createBucket(
              {
                bucketName: createBucketInfo.bucketName,
                creator: address,
                visibility: "VISIBILITY_TYPE_PUBLIC_READ",
                chargedReadQuota: "0",
                spInfo: {
                  primarySpAddress: spInfo.primarySpAddress,
                },
                paymentAddress: address,
              },
              {
                // type: 'ECDSA',
                // privateKey: ACCOUNT_PRIVATEKEY,
                type: "EDDSA",
                domain: window.location.origin,
                seed: offChainData.seedString,
                address,
              }
            );

            // const setTagTx = await client.storage.setTag({
            //   operator: address,
            //   resource: GRNToString(newBucketGRN(createBucketInfo.bucketName)),
            //   tags: {
            //     tags: [
            //       {
            //         key: "x",
            //         value: "xx",
            //       },
            //       {
            //         key: "y",
            //         value: "yy",
            //       },
            //     ],
            //   },
            // });

            // const tx = await client.txClient.multiTx([
            //   createBucketTx,
            //   setTagTx,
            // ]);

            const tx = createBucketTx;
            const simulateInfo = await tx.simulate({
              denom: "BNB",
            });

            console.log("simulateInfo", simulateInfo);
            console.log('tx-broadcast', tx)

            const res = await tx.broadcast({
              denom: "BNB",
              gasLimit: Number(simulateInfo?.gasLimit),
              gasPrice: simulateInfo?.gasPrice || "5000000000",
              payer: address,
              granter: "",
              signTypedDataCallback: async (addr: string, message: string) => {
                return await signTypedDataV4(provider, addr, message);
              }
            });

            console.log('res', res);
            if (res.code === 0) {
              alert("success");
            }
          } catch (e) {
            console.log("createBucketTx- error", e);
          }
        }}
      >
        broadcast with simulate
      </button>
    </>
  );
};
