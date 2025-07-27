/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext } from 'react';

import { container } from '@/core/di';
import { DIContainer } from '@/core/di/container';

const DependencyContext = createContext<DIContainer | null>(null);

export const DependencyProvider = ({ children }: { children: React.ReactNode }) => {
  return <DependencyContext.Provider value={container}>{children}</DependencyContext.Provider>;
};

export const useDependency = <T,>(token: keyof any): T => {
  const containerInstance = useContext(DependencyContext);

  if (!containerInstance) {
    throw new Error('useDependency must be used within a DependencyProvider');
  }

  return containerInstance.resolve<T>(token);
};
