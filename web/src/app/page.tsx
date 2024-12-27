'use client';
import React, { FC, useMemo, useState, useRef, useCallback, useEffect} from 'react';
import dynamic from 'next/dynamic';

import { useAccount, useBalance, useBlockNumber, useContract, useReadContract, useSendTransaction, useTransactionReceipt, useCall, useNetwork } from "@starknet-react/core";
import { BlockNumber, RpcProvider } from 'starknet';
import { ABI } from '@/abis/abi';
import { type Abi } from 'starknet';
import { formatAmount } from '@/lib/utils';

const WalletBar = dynamic(() => import('../components/WalletBar'), { ssr: false })
const Page: FC = () => {

  // Step 1 --> Read the latest block -- Start
  const {data: blockNumberData, isLoading: blocknumberLoading, isError: blockNumberIsError } = useBlockNumber( {
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
  const { data: readData, refetch: dataRefetch, isError: readIsError, isLoading: readIsLoading, error: readError } = useReadContract({
    functionName: "Consultar",
    args: [],
    abi: ABI as Abi,
    address: contractAddress,
    watch: true,
    refetchInterval: 1000 
  });

  // Step 3 --> Read counter from contract -- End

  // Step 4 --> Increase counter on contract -- Start
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await writeAsync();
  } 
  const typedABI =  ABI as Abi;
  const {contract} = useContract({
    abi: typedABI,
    address: contractAddress,
    });
    const calls = useMemo(() => {
      if (!userAddress || !contract) return [];
      return [contract.populate("Sumar_uno")];
    }, [userAddress, contract]);
    const { send: writeAsync, data: writeData, isPending: writeIsPending } = useSendTransaction({
      calls
    });
    const { data: waitData, status: waitStatus, isLoading: waitIsLoanding, isError: waitIsError, error: WaitError } = useTransactionReceipt ({
      watch : true,
      hash: writeData?.transaction_hash
    });
      const LoadingState = ({ message }: { message: string }) => ( 
      <div className="flex items-center space-x-2"> 
      <div className="animate-spin"> 
        <svg className="h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /> 
        </svg> 
      </div> 
      <span>{message}</span> 
      </div> 
    ); const buttonContent = () => {
      if (writeIsPending) {
        return <LoadingState message="Send..." />;
       } 
       
       if (waitIsLoanding){ 
        return <LoadingState message="Waiting for confirmation..." />;

      } 
      if (waitStatus === "error") { 
        return <LoadingState message="Transaction rejected..." />;
       } 
       if (waitStatus === "success") { 
          return "Transaction confirmed"; 
        }
        return "Send";
      };
  
  // Step 4 --> Increase counter on contract -- End

  // Step 5 --> Reset balance -- Start
  // Step 5 --> Reset balance -- End

  // Step 6 --> Get events from a contract -- Start
  type ContractEvent={
    from_address: string;
    keys: string[];
    data: string[]
  }
  const provider= useMemo(() => new RpcProvider({
    nodeUrl: process.env.NEXT_PUBLIC_RPC_URL
    }), []);
    const [events, setEvents]= useState<ContractEvent[]>([]);
    const lastCheckedBlockRef = useRef(0);
    const {data: blockNumber} = useBlockNumber ({refetchInterval: 1000 });
    const checkForEvents = useCallback(async (contract:any, currentBlockNumber:number) => {
      if (currentBlockNumber = lastCheckedBlockRef.current) return;
      try {
        const fromBlock = lastCheckedBlockRef.current +1;
        const fetchedEvents = await provider.getEvents({
          address: contract.address,
          from_block: {block_number: fromBlock},
          to_block: {block_number: currentBlockNumber },
          chunk_size:500,
        });
        if (fetchedEvents && fetchedEvents.events) {
          setEvents(prevEvents => [...prevEvents, ... fetchedEvents.events]);

        }

        lastCheckedBlockRef.current =currentBlockNumber;
      } catch (error) {
        console.error('error checking for events', error);
        }
      }, [provider]);
      useEffect(() => {
        if (contract && blockNumber) {
          checkForEvents(contract, blockNumber);
          }
      }, [contract, blockNumber, checkForEvents]);
      const lastFiveEvents = useMemo(() => {
        return [...events].reverse().slice(0,5);
      }, [events]);
    
  // Step 6 --> Get events from a contract -- End

  return (
    <div className="min-h-screen bg-black-100 p-4 flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-6" ><b> Starknet Frontend Workshop in spanish </b></h1>

      <div className="flex flex-wrap justify-center gap-4">

        <div className="w-full max-w-md space-y-4">
          <div className="bg-black p-4 border-white border">
            <h2 className="text-xl font-bold mb-2">Wallet Connection</h2>
            <WalletBar />
          </div>

          { /* Step 1 -->  Read the latest block -- Start */ }
          {!blocknumberLoading && !blockNumberIsError && (
          <div className={`p-4 border-white ${blockNumberData! < workshopEnd ? "bg-green-500" : "bg-red-500"}`}>
            <h3 className="text-lg font-bold mb-2">Read the Blockchain</h3>
            <p>Current Block: {blockNumberData}</p>
            <p>{blockNumberData! < workshopEnd ? "Workshop is live" : "Workshop is over"}</p>
          </div> 
          )}
          {/* Step 1 --> Read the latest block -- End */}

          {/* Step 2 --> Read your balance -- Start */}
          <div className="p-4 bg-black border-white border">
            <h3 className="text-lg font-bold mb-2">Tu Balance</h3>
            <p>Symbol: {balanceData?.symbol}</p>
            <p>Balance: {Number(balanceData?.formatted).toFixed(2)}</p>
          </div> 
          {/* Step 2 --> Read your balance -- End */}

          {/* Step 5 --> Reset balance by owner only -- Start */}
          { 
          <div className="p-4 bg-black border-white border">
            <h3 className="text-lg font-bold mb-2">Reset Balance</h3>
            <button
              onClick={() => console.log("Resetting...")}
              disabled={false}
              className="mt-2 border border-white text-white font-regular py-2 px-4 bg-yellow-300 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
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
          <div className="p-4 bg-black border-white border">
            <h3 className="text-lg font-bold mb-2">Balance Contador</h3>
            <p>Balance: {readData?.toString()}</p>
            <button
              onClick={() => dataRefetch()}
              className="mt-2 border border-white text-black font-regular py-1 px-3 bg-yellow-300 hover:bg-yellow-500"
            >
              Refresh
            </button>
          </div> 
          {/* Step 3 --> Read from a contract -- End */}

          {/* Step 4 --> Write to a contract -- Start */}
          { 
          <form onSubmit= {handleSubmit}  className="bg-black p-4 border-white border">
            <h3 className="text-lg font-bold mb-2">Increase Counter</h3>
            <button
              type="submit"
              className="mt-3 border border-black text-black font-regular py-2 px-4 bg-yellow-300 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={!userAddress || writeIsPending }
            >
              {buttonContent()}
            </button>
            {writeData?.transaction_hash && (
            <a
              href={`https://sepolia.voyager.online/tx/`}
              target="_blank"
              className="block mt-2 text-blue-500 hover:text-blue-700 underline"
              rel="noreferrer">
              Check TX on Sepolia
            </a>
          )}
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
                {lastFiveEvents.map((event,index) => ( 
                <tr key={1} className={'bg-gray-50'}>
                  <td className="border-b border-gray-200 p-2">{lastFiveEvents.length- index}</td>
                  <td className="border-b border-gray-200 p-2 text-right">{event.data.length > 0 ? event.data[0]: "Valor inicial"}</td>
                </tr>
                ))}
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