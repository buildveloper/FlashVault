import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

type Loan = {
  user_address: string;
  amount: number;
  time: string;
  smart: boolean;
};

function App() {
  const [logs, setLogs] = useState<Loan[]>([]);
  const [isSmart, setIsSmart] = useState(false);


  const fetchLogs = async () => {
    const { data, error } = await supabase
      .from('flashloans')
      .select('*')
      .order('time', { ascending: false });

    if (error) {
      console.error('❌ Fetch Error:', error.message);
    } else {
      console.log('✅ Fetched logs:', data);
      setLogs(data || []);
    }
  };

  const triggerFlashLoan = async () => {
    const entry = {
      user_address: isSmart ? 'smart_0x1234...' : '0x1234...',
      amount: 1.2,
      smart: isSmart
    };

    const { error } = await supabase.from('flashloans').insert([entry]);

    if (error) {
      console.error('❌ Insert Error:', error.message);
      alert('Insert failed: ' + error.message);
    } else {
      alert('✅ Flash loan triggered!');
      fetchLogs();
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);



  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f5f5f5',
        padding: '40px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          background: '#fff',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ marginBottom: '20px' }}> FlashVault Dashboard</h2>

        <label style={{ display: 'block', marginBottom: '20px' }}>
          <input
            type="checkbox"
            checked={isSmart}
            onChange={() => setIsSmart(!isSmart)}
            style={{ marginRight: '8px' }}
          />
          Use Smart Account
        </label>

        <button
          onClick={triggerFlashLoan}
          style={{
            marginBottom: '30px',
            padding: '12px 20px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Run Flash Loan
        </button>

        <h3 style={{ marginBottom: '10px' }}>Flash Loan Logs</h3>
        {logs.length === 0 ? (
          <p>No flash loans yet.</p>
        ) : (
          <ul>
            {logs.map((log, i) => (
              <li key={i} style={{ marginBottom: '8px' }}>
                {log.smart ? '🧠 Smart' : '👤 Wallet'} — {log.user_address} borrowed {log.amount} ETH at{' '}
                {new Date(log.time).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
