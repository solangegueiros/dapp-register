export const REGISTER_ABI = [
  "function getInfo() view returns (string)",
  "function setInfo(string _info)",
];

export const ADDRESSES = {
  register: import.meta.env.REGISTER_ADDRESS || "",
};

export const SEPOLIA_CHAIN_ID = "0xaa36a7"; // 11155111
