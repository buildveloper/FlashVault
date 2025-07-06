import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

// Type for a flash loan entry
type Loan = {
  user_address: string;
  amount: number;
  time: string;
  smart: boolean;
};

const App: React.FC = () => {
  const [logs, setLogs] = useState<Loan[]>([]);
  const [isSmart, setIsSmart] = useState(false);

  // Fetch all flash loan logs
  const fetchLogs = async () => {
    const { data, error } = await supabase
      .from('flashloans')
      .select('*')
      .order('time', { ascending: false });

    if (error) {
      console.error('Fetch error:', error.message);
    } else {
      setLogs(data || []);
    }
  };

  // Trigger a simulated flash loan
  const triggerFlashLoan = async () => {
    const generateRandomAddress = () => {
      const prefix = isSmart ? 'smart_0x' : '0x';
      const chars = 'abcdef0123456789';
      return prefix + Array.from({ length: 8 }, () =>
        chars[Math.floor(Math.random() * chars.length)]
      ).join('');
    };

    const entry = {
      user_address: generateRandomAddress(),
      amount: parseFloat((Math.random() * 10 + 0.1).toFixed(2)), // 0.1 – 10 ETH
      smart: isSmart,
      time: new Date().toISOString(),
    };

    const { error } = await supabase.from('flashloans').insert([entry]);

    if (error) {
      alert('Insert failed: ' + error.message);
      console.error('Insert error:', error.message);
    } else {
      alert('Flash loan triggered successfully');
      fetchLogs();
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f5f5f5',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        color: '#111',
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: '600px',
          background: '#fff',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>
          FlashVault Dashboard
        </h2>

        <label style={{ display: 'block', marginBottom: '20px', fontSize: '16px' }}>
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
            fontSize: '15px',
            cursor: 'pointer',
          }}
        >
          Run Flash Loan
        </button>

        <h3 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: '600' }}>
          Flash Loan Logs
        </h3>

        {logs.length === 0 ? (
          <p>No flash loans yet.</p>
        ) : (
          <ul style={{ paddingLeft: '20px' }}>
            {logs.map((log, i) => (
              <li key={i} style={{ marginBottom: '8px', fontSize: '15px' }}>
                {log.smart ? 'Smart Account' : 'Wallet'} — {log.user_address} borrowed{' '}
                {log.amount} ETH at {new Date(log.time).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default App;
