import { greenfield_testnet } from '@/config/chains'
import { createPublicClient, http } from 'viem'
import { bscTestnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: bscTestnet,
  transport: http()
})