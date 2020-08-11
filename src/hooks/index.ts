import { useState, useCallback } from 'react';

export const usePending = (initPending = false): [boolean, <K extends any>(cb: K) => void] => {
  const [pending, setPending] = useState(initPending);

  const handlePending = useCallback(async <T extends any>(cb: T) => {
    setPending(true);
    try {
      await cb();
      setPending(false);
    } catch (errMessage) {
      console.log(errMessage);
      setPending(false);
    }
  }, []);

  return [pending, handlePending];
};

export const useLoading = usePending;

export const usePendings = ({ load, err } = { load: true, err: false }) => {
  const [loading, setLoading] = useState(load);
  const [error, setError] = useState(err);

  const handlePendings = useCallback(async <T extends any>(cb: T) => {
    setLoading(true);
    setError(false);
    try {
      await cb();
      setLoading(false);
      setError(false);
    } catch (errMessage) {
      console.log(errMessage);
      setLoading(false);
      setError(true);
    }
  }, []);

  return {
    loading,
    error,
    handlePendings,
  };
};
