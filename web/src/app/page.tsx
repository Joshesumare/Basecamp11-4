'use client';
import { FC } from 'react';
import dynamic from 'next/dynamic';

import { Abi, useBlockNumber, useAccount, useBalance, useReadContract, useNetwork, useContract } from "@starknet-react/core";
import { ABI } from 'starknet';

const WalletBar = dynamic(() => import('../components/WalletBar'), { ssr: false })
const Page: FC = () => {

  // Step 1 --> Read the latest block -- Start
  const {data: blockNumberData, isLoading: blocknumberLoading, isError: blockNumberError } = useBlockNumber( {
    blockIdentifier: "latest"
  });
  const workshopEnd= 450000;
  // Step 1 --> Read the latest block -- End

  // Step 2 --> Read your balance -- Start  
const {address: userAddress } = useAccount();
const { data: balanceData, error: balanceError, isError: balanceIsError, isLoading: balanceIsLoading } = useBalance ({
  address: userAddress,
  watch: true,
});

  // Step 2 --> Read your balance -- End
  // Step 3 --> Read counter from contract -- Start
  const contractAddress = "0x043df1763d11074b22bfedf3b71852d9947fd901666ddae41394411a7105d4c5";
  const { data: readData, isError: readIsError, isLoading: readIsLoading, refetch: dataRefetch } = useReadContract({
    functionName: "Consultar",
    args: [],
    abi: ABI as Abi,
    address: contractAddress,
    watch: true,
    refetchInterval: 1000, 
  });
  // Step 3 --> Read counter from contract -- End

  // Step 4 --> Increase counter on contract -- Start
  const {contract} = useContract ({
    abi,
    address: testAddress,
  });
  // Step 4 --> Increase counter on contract -- End

  // Step 5 --> Reset balance -- Start
  // Step 5 --> Reset balance -- End

  // Step 6 --> Get events from a contract -- Start
  // Step 6 --> Get events from a contract -- End

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-6">Starknet Frontend Workshop in spanish</h1>

      <div className="flex flex-wrap justify-center gap-4">

        <div className="w-full max-w-md space-y-4">
          <div className="bg-white p-4 border-black border">
            <h2 className="text-xl font-bold mb-2">Wallet Connection</h2>
            <WalletBar />
          </div>

          { /* Step 1 -->  Read the latest block -- Start */ }
          <div className={`p-4 border-black border ${blockNumberData! < workshopEnd ? "bg-green-500" : "bg-red-500"}`}>
            <h3 className="text-lg font-bold mb-2">Read the Blockchain</h3>
            <p>Current Block: {blockNumberData}</p>
            <p>{blockNumberData! < workshopEnd ? "Workshop is live" : "Workshop is over"}</p>
          </div> 
          {/* Step 1 --> Read the latest block -- End */}

          {/* Step 2 --> Read your balance -- Start */}
          {
          <div className="p-4 bg-white border-black border">
            <h3 className="text-lg font-bold mb-2">Your Balance</h3>
            <p>Symbol: {balanceData?.symbol }</p>
            <p>Balance: {Number (balanceData?.formatted).toFixed(2)}</p>
          </div> }
          {/* Step 2 --> Read your balance -- End */}

          {/* Step 5 --> Reset balance by owner only -- Start */}
          { 
          <div className="p-4 bg-white border-black border">
            <h3 className="text-lg font-bold mb-2">Reset Balance</h3>
            <button
              onClick={() => console.log("Resetting...")}
              disabled={false}
              className="mt-2 border border-black text-black font-regular py-2 px-4 bg-yellow-300 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Reset Balance
            </button>
            <p className="mt-2 text-sm">
              Transaction sent: url
            </p>
          </div> }
          {/* Step 5 --> Reset balance by owner only -- End */}
        </div>

        <div className="w-full max-w-md space-y-4">

          {/* Step 3 --> Read from a contract -- Start */}
          <div className="p-4 bg-white border-black border">
            <h3 className="text-lg font-bold mb-2">contador balance</h3>
            <p>Balance: {readData?.toString()}</p>
            <button
              onClick={() => dataRefetch()}
              className="mt-2 border border-black text-black font-regular py-1 px-3 bg-yellow-300 hover:bg-yellow-500"
            >
              Refresh
            </button>
          </div> 
          {/* Step 3 --> Read from a contract -- End */}

          {/* Step 4 --> Write to a contract -- Start */}
          { 
          <form className="bg-white p-4 border-black border">
            <h3 className="text-lg font-bold mb-2">Increase Counter</h3>
            <button
              type="submit"
              className="mt-3 border border-black text-black font-regular py-2 px-4 bg-yellow-300 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Send
            </button>
            <a
              href={`https://sepolia.voyager.online/tx/`}
              target="_blank"
              className="block mt-2 text-blue-500 hover:text-blue-700 underline"
              rel="noreferrer"
            >
              Check TX on Sepolia
            </a>
          </form> }
          {/* Step 4 --> Write to a contract -- End */}

          {/* Step 6 --> Get events from a contract -- Start */}
          {
            <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-gray-300 text-left p-2 font-semibold">#</th>
                  <th className="border-b border-gray-300 text-right p-2 font-semibold">New Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr key={1} className={'bg-gray-50'}>
                  <td className="border-b border-gray-200 p-2">1</td>
                  <td className="border-b border-gray-200 p-2 text-right">value</td>
                </tr>
              </tbody>
            </table>
          </div> }
          {/* Step 6 --> Get events from a contract -- End */}

        </div>
      </div>
    </div >
  );
};

export default Page;