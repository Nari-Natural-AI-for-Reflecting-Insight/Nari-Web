import { createContext, ReactNode, useMemo, useContext } from 'react';

type ProviderProps<T> = {
  children: ReactNode;
  value: T;
};

export const createSafeContext = <ContextValueType,>(
  rootComponentName: string,
) => {
  const Context = createContext<ContextValueType | undefined>(undefined);

  const Provider = ({ children, value }: ProviderProps<ContextValueType>) => {
    const memoizedValue = useMemo(() => value, [value]);
    return (
      <Context.Provider value={memoizedValue}>{children}</Context.Provider>
    );
  };

  Provider.displayName = rootComponentName + 'Provider';

  const useSafeContext = (): ContextValueType => {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error(
        `\`${rootComponentName}\` Context must be used within its Provider`,
      );
    }
    return context;
  };

  return [Provider, useSafeContext] as const;
};
