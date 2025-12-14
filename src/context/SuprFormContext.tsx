import { createContext, useContext, ReactNode } from 'react';

interface SuprFormContextType {
  showAsterisk?: boolean;
}

const SuprFormContext = createContext<SuprFormContextType | undefined>(undefined);

interface SuprFormProviderProps {
  children: ReactNode;
  showAsterisk?: boolean;
}

export const SuprFormProvider = ({ showAsterisk, children }: SuprFormProviderProps) => {
  return <SuprFormContext.Provider value={{ showAsterisk }}>{children}</SuprFormContext.Provider>;
};

export const useSuprFormContext = () => {
  const context = useContext(SuprFormContext);

  if (!context) {
    throw new Error('useSuprFormContext must be used within a SuprFormProvider');
  }

  return context;
};

export type { SuprFormContextType };

export default SuprFormContext;
