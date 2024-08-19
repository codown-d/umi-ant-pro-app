import { createContext, useContext, useMemo } from 'react';

const StudyContext = createContext(null!);

export const StudyProvider = ({ children }: any) => {
  const value = useMemo(() => ({}), []);
  return (
    <StudyContext.Provider value={value}>{children}</StudyContext.Provider>
  );
};

export const useStudy = () => useContext(StudyContext);
