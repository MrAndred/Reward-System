export const getAllTransactionsByThreeMonth = `
  SELECT
      ct.customer_id,
      ct.price,
      ct.created_at
    FROM customer_transactions AS ct
   WHERE created_at BETWEEN now() - '3 months'::interval and now()
`;
