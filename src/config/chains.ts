import { defineChain } from 'viem';
import {bsc, bscTestnet} from 'viem/chains'

const bnbGreenfieldIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0ibm9uZSI+PGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj48cGF0aCBmaWxsPSIjRjBCOTBCIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNCAwYzcuNzMzIDAgMTQgNi4yNjcgMTQgMTRzLTYuMjY3IDE0LTE0IDE0UzAgMjEuNzMzIDAgMTQgNi4yNjcgMCAxNCAwWiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTcuNjk0IDE0IC4wMSAzLjcwMiAzLjE0NiAxLjg1djIuMTY4bC00Ljk4Ni0yLjkyNHYtNS44NzhMNy42OTQgMTRabTAtMy43MDJ2Mi4xNTdsLTEuODMyLTEuMDgzVjkuMjE0bDEuODMyLTEuMDgzIDEuODQxIDEuMDgzLTEuODQgMS4wODRabTQuNDctMS4wODQgMS44MzItMS4wODMgMS44NCAxLjA4My0xLjg0IDEuMDg0LTEuODMyLTEuMDg0WiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik05LjAxOCAxNi45MzV2LTIuMTY4bDEuODMyIDEuMDg0djIuMTU3bC0xLjgzMi0xLjA3M1ptMy4xNDYgMy4zOTQgMS44MzIgMS4wODQgMS44NC0xLjA4NHYyLjE1N2wtMS44NCAxLjA4NC0xLjgzMi0xLjA4NFYyMC4zM1ptNi4zLTExLjExNSAxLjgzMi0xLjA4MyAxLjg0IDEuMDgzdjIuMTU4bC0xLjg0IDEuMDgzdi0yLjE1N2wtMS44MzItMS4wODRabTEuODMyIDguNDg4LjAxLTMuNzAyIDEuODMxLTEuMDg0djUuODc5bC00Ljk4NiAyLjkyNHYtMi4xNjdsMy4xNDUtMS44NVoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJtMTguOTgyIDE2LjkzNS0xLjgzMiAxLjA3M3YtMi4xNTdsMS44MzItMS4wODR2Mi4xNjhaIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTE4Ljk4MiAxMS4wNjUuMDEgMi4xNjgtMy4xNTUgMS44NXYzLjcxMmwtMS44MzEgMS4wNzMtMS44MzItMS4wNzN2LTMuNzExbC0zLjE1NS0xLjg1MXYtMi4xNjhsMS44NC0xLjA4MyAzLjEzNSAxLjg2IDMuMTU1LTEuODYgMS44NCAxLjA4M2gtLjAwN1ptLTkuOTY0LTMuNyA0Ljk3Ny0yLjkzNSA0Ljk4NyAyLjkzNS0xLjgzMiAxLjA4My0zLjE1NC0xLjg2LTMuMTQ2IDEuODYtMS44MzItMS4wODNaIi8+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD0iYSI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGgyOHYyOEgweiIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg==';

export const greenfield_testnet = defineChain({
  id: 5600, // Replace this with your chain's ID
  name: 'BNB Greenfield Chain Testnet',
  network: 'BNB Greenfield Chain Testnet',
  nativeCurrency: {
    decimals: 18, // Replace this with the number of decimals for your chain's native token
    name: 'BNB',
    symbol: 'tBNB',
  },
  rpcUrls: {
    default: {
      http: ['https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org'],
    },
    public: {
      http: ['https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: `BNB Greenfield Chain Testnet Scan`,
      url: 'https://testnet.greenfieldscan.com',
    },
    default: {
      name: `BNB Greenfield Chain Testnet Scan`,
      url: 'https://testnet.greenfieldscan.com',
    },
  },
  iconUrl: bnbGreenfieldIcon,
});

export const greenfield_mainnet = defineChain({
  id: 1017, // Replace this with your chain's ID
  name: 'BNB Greenfield Chain',
  network: 'BNB Greenfield Chain',
  nativeCurrency: {
    decimals: 18, // Replace this with the number of decimals for your chain's native token
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: {
      http: ['https://greenfield-chain.bnbchain.org'],
    },
    public: {
      http: ['https://greenfield-chain.bnbchain.org'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: `BNB Greenfield Mainnet Scan`,
      url: 'https://greenfieldscan.com',
    },
    default: {
      name: `BNB Greenfield Mainnet Scan`,
      url: 'https://greenfieldscan.com',
    },
  },
  iconUrl: bnbGreenfieldIcon,
});

export const supportedChains = [bsc, bscTestnet, greenfield_testnet, greenfield_mainnet];