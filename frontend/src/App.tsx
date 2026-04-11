import { useState } from "react";
import { useWallet } from "./hooks/useWallet";
import { useRegister } from "./hooks/useRegister";
import { ConnectWallet } from "./components/ConnectWallet";
import { CopyAddress } from "./components/CopyAddress";
import "./App.css";

function App() {
  const { account, signer, error, connecting, connect } = useWallet();
  const {
    registerAddress,
    info,
    loading,
    txStatus,
    configured,
    getInfo,
    setInfo,
    updateRegisterAddress,
  } = useRegister(signer, account);

  const [newInfo, setNewInfo] = useState("");

  const [editing, setEditing] = useState(false);
  const [editAddress, setEditAddress] = useState("");
  const [editError, setEditError] = useState<string | null>(null);

  const handleEdit = () => {
    setEditAddress(registerAddress);
    setEditError(null);
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateRegisterAddress(editAddress);
      setEditing(false);
      setEditError(null);
    } catch (err: unknown) {
      setEditError((err as Error).message);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setEditError(null);
  };

  const handleSetInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInfo.trim()) return;
    await setInfo(newInfo);
    setNewInfo("");
  };

  return (
    <>
      <header>
        <div className="header-text">
          <h1>Register</h1>
          <p className="subtitle">Store and retrieve info on Sepolia</p>
        </div>
      </header>
      <div className="app">

      {!configured && (
        <div className="card warning">
          <h2>Configuration Required</h2>
          <p>
            Set your contract address in <code>.env</code>:
          </p>
          <pre>
            REGISTER_ADDRESS=0x...
          </pre>
        </div>
      )}

      {configured && (
        <main>
          <div className="card contracts-box">
            <div className="contract-row">
              <span className="label">Register:</span>
              {editing ? (
                <span className="edit-address">
                  <input
                    type="text"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    placeholder="0x..."
                  />
                  <button className="btn-copy" onClick={handleSave}>Save</button>
                  <button className="btn-copy" onClick={handleCancel}>Cancel</button>
                </span>
              ) : (
                <>
                  <CopyAddress address={registerAddress} />
                  <button className="btn-copy" onClick={handleEdit}>Edit</button>
                </>
              )}
            </div>
            {editError && <p className="error">{editError}</p>}
          </div>

          <div className="card">
            <h2>Stored Info</h2>
            <div className={`info-display${info ? "" : " empty"}`}>
              {info || "No info stored yet"}
            </div>
            <div className="btn-group" style={{ marginTop: "1rem" }}>
              <button className="btn btn-secondary" onClick={getInfo} disabled={loading}>
                {loading ? "Loading..." : "Get Info"}
              </button>
            </div>
          </div>

          {account ? (
            <div className="card">
              <h2>Set Info</h2>
              <form onSubmit={handleSetInfo}>
                <div className="input-group">
                  <input
                    type="text"
                    value={newInfo}
                    onChange={(e) => setNewInfo(e.target.value)}
                    placeholder="Enter new info..."
                    disabled={loading}
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading || !newInfo.trim()}>
                  {loading ? "Processing..." : "Set Info"}
                </button>
              </form>
              {txStatus && (
                <div className={`tx-status ${txStatus.type}`}>
                  {txStatus.message}
                </div>
              )}
            </div>
          ) : (
            <div className="card">
              <p>Connect your wallet to set info</p>
            </div>
          )}

          <ConnectWallet account={account} connecting={connecting} error={error} onConnect={connect} />
        </main>
      )}
      </div>
    </>
  );
}

export default App;
