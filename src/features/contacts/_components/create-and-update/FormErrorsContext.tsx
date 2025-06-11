import React, { createContext, ReactNode, useContext, useState } from 'react';

type ErrorMap = Record<string, string[]>;

type FormErrorStore = {
  setError: (field: string, message: string | string[]) => void;
  getError: (field: string) => string[];
  clearErrors: () => void;
  getAll: () => ErrorMap;
};

const FormErrorsContext = createContext<FormErrorStore | null>(null);

export const useFormErrors = () => {
  const context = useContext(FormErrorsContext);
  if (!context)
    throw new Error('useFormErrors must be used within a FormProvider');
  return context;
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<ErrorMap>({});

  const setError = (field: string, message: string | string[]) => {
    setErrors((prev) => ({
      ...prev,
      [field]: Array.isArray(message) ? message : [message]
    }));
  };

  const getError = (field: string) => {
    return errors[field] || [];
  };

  const clearErrors = () => {
    setErrors({});
  };

  const getAll = () => errors;

  return (
    <FormErrorsContext.Provider
      value={{ setError, getError, clearErrors, getAll }}
    >
      {children}
    </FormErrorsContext.Provider>
  );
};
