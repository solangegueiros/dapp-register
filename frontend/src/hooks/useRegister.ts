import { useState, useEffect, useCallback } from "react";
import { Contract, JsonRpcProvider, type JsonRpcSigner } from "ethers";
import { REGISTER_ABI, ADDRESSES } from "../contracts/abis";
import { SEPOLIA_RPC } from "../config";

export function useRegister(signer: JsonRpcSigner | null, account: string | null) {
  const [registerAddress, setRegisterAddress] = useState(ADDRESSES.register);
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [txStatus, setTxStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const configured = registerAddress.length > 0;

  const publicProvider = new JsonRpcProvider(SEPOLIA_RPC);

  const getReadContract = useCallback(() => {
    if (!registerAddress) return null;
    return new Contract(registerAddress, REGISTER_ABI, publicProvider);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerAddress]);

  const getWriteContract = useCallback(() => {
    if (!registerAddress || !signer) return null;
    return new Contract(registerAddress, REGISTER_ABI, signer);
  }, [registerAddress, signer]);

  const fetchInfo = useCallback(async () => {
    const contract = getReadContract();
    if (!contract) return;
    try {
      const result = await contract.getInfo();
      setInfo(result);
      setTxStatus(null);
    } catch (err: unknown) {
      setTxStatus({ type: "error", message: (err as Error).message || "Failed to get info" });
    }
  }, [getReadContract]);

  const getInfo = useCallback(async () => {
    setLoading(true);
    setTxStatus(null);
    try {
      await fetchInfo();
    } finally {
      setLoading(false);
    }
  }, [fetchInfo]);

  const setInfoOnChain = useCallback(async (newInfo: string) => {
    const contract = getWriteContract();
    if (!contract) return;
    setLoading(true);
    setTxStatus(null);
    try {
      const tx = await contract.setInfo(newInfo);
      await tx.wait();
      setTxStatus({ type: "success", message: "Info updated successfully!" });
      await fetchInfo();
    } catch (err: unknown) {
      setTxStatus({ type: "error", message: (err as Error).message || "Failed to set info" });
    } finally {
      setLoading(false);
    }
  }, [getWriteContract, fetchInfo]);

  const updateRegisterAddress = useCallback(async (newAddress: string) => {
    if (!/^0x[a-fA-F0-9]{40}$/.test(newAddress)) {
      throw new Error("Invalid address format");
    }
    setRegisterAddress(newAddress);
    setInfo("");
    setTxStatus(null);
  }, []);

  useEffect(() => {
    if (configured) {
      fetchInfo();
    }
  }, [configured, fetchInfo, account]);

  return {
    registerAddress,
    info,
    loading,
    txStatus,
    configured,
    getInfo,
    setInfo: setInfoOnChain,
    updateRegisterAddress,
  };
}
