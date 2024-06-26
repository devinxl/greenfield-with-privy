import { FeeGrant } from '@/components/feegrant';
import { Bucket } from '@/components/bucket';
import { Deposit } from '@/components/deposit';
import { Group } from '@/components/group';
import { Mirror } from '@/components/mirror';
import { MultiMsg } from '@/components/multimsg';
import { ObjectComponent } from '@/components/object';
import { Policy } from '@/components/policy';
import { Transfer } from '@/components/transfer';
import { WalletInfo } from '@/components/walletInfo/WalletInfo';
import { Withdraw } from '@/components/withdraw';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useAccount } from 'wagmi';
import { PaymentComponent } from '@/components/payment';
import { Validator } from '@/components/validator';
import { Proposal } from '@/components/proposal';
import { Distribution } from '@/components/distribution';
import { VirtualGroup } from '@/components/vg';
import { CustomTx } from '@/components/customtx';
import { usePrivy } from '@privy-io/react-auth';

export default function Tx() {
  const isMounted = useIsMounted();
  const { ready, authenticated } = usePrivy();

  if (!isMounted) return null;

  return (
    <div style={{ padding: 10 }}>
      <WalletInfo />

      <hr style={{ margin: '10px 0' }} />

      {ready && authenticated && (
        <>
          <Deposit />
          <hr style={{ margin: '10px 0' }} />
          <Transfer />
          <hr style={{ margin: '10px 0' }} />
          <Withdraw />
          <hr style={{ margin: '10px 0' }} />
          <Bucket />
          <hr style={{ margin: '10px 0' }} />
          <ObjectComponent />
          <hr style={{ margin: '10px 0' }} />
          <PaymentComponent />
          <hr style={{ margin: '10px 0' }} />
          <Group />
          <hr style={{ margin: '10px 0' }} />
          <Mirror />
          <hr style={{ margin: '10px 0' }} />
          <Policy />
          <hr style={{ margin: '10px 0' }} />
          <FeeGrant />
          <hr style={{ margin: '10px 0' }} />
          <Proposal />
          <hr style={{ margin: '10px 0' }} />
          <Validator />
          <hr style={{ margin: '10px 0' }} />
          <Distribution />
          <hr style={{ margin: '10px 0' }} />
          <VirtualGroup />
          <hr style={{ margin: '10px 0' }} />
          <MultiMsg />
          <hr style={{ margin: '10px 0' }} />
          <CustomTx />
          <hr style={{ margin: '10px 0' }} />
        </>
      )}
    </div>
  );
}
