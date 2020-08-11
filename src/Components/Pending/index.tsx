import React, { FC, memo } from 'react';
import { CircularIndeterminate } from '../Loader';
import { SimpleError } from '../Error';

export const Pending: FC<{ loading: boolean; error: boolean }> = memo(
  ({ error, loading, children }) => {
    return (
      <>
        {loading && !error && <CircularIndeterminate />}
        {error && !loading && <SimpleError text="Произошла ошибка!" />}
        {!loading && !error && children}
      </>
    );
  },
);
