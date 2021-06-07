import axios from 'axiosConfig';
import Container from 'components/common/Container';
import Loading from 'components/Loading';
import DIMENSIONS from 'constants/dimensions';
import React, { useEffect, useState } from 'react';
import Item from './Item';

const TransactionsView = () => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/transactions');
        setTransactions(res.data);
        setLoading(false);
      } catch (e) {
        alert(e);
      }
    };
    loadTransactions();
  }, []);

  return (
    <Container maxWidth={DIMENSIONS.PAGE_WIDTH + 'px'}>
      {loading ? (
        <Loading />
      ) : (
        transactions.map((item) => <Item product={item} />)
      )}
    </Container>
  );
};

export default TransactionsView;
