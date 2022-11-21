import React from 'react';
import axios from 'axios';

export const useTransactions = () => {
  const [transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  console.log('useTransactions, transactions', transactions);
  React.useEffect(() => {
    const fetchTransactions = async () => {
      const response = await axios.get('http://localhost:3005/Info/Historial', {
        withCredentials: true,
        params: { Num_cuenta: 1 },
      });
      setTransactions(response.data);
      console.log('response data', response.data);
      setLoading(false);
    };

    fetchTransactions();
  }, [loading]);

  return { transactions, loading };
};
