import React, { useContext, useEffect, FC, memo } from 'react';
import { getAccount } from '../../api/account';
import { StoreContext } from '../../store';
import { usePendings } from '../../hooks';
import { Pending } from '../Pending';

export const AuthProvider: FC = memo(({ children }) => {
  const { loading, error, handlePendings } = usePendings();
  const {
    value: { account },
    updateStore,
  } = useContext(StoreContext);

  useEffect(() => {
    handlePendings(() =>
      getAccount().then((accountData) =>
        updateStore((state) => ({
          ...state,
          account: accountData,
        })),
      ),
    );
  }, []);

  return (
    <Pending loading={loading} error={error}>
      <>{account && children}</>
    </Pending>
  );
});
