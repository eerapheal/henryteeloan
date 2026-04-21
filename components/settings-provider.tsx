'use client';

import React, { createContext, useContext } from 'react';
import { SystemSettings, defaultSettings } from '@/lib/settings-constants';

const SettingsContext = createContext<SystemSettings>(defaultSettings);

export function SettingsProvider({ 
  children, 
  settings 
}: { 
  children: React.ReactNode, 
  settings: SystemSettings 
}) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
