// src/contexts/PermissionContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getAppConfig } from '@/services';

const AppConfigContext = createContext({
    permissions: undefined,
});

const AppConfigProvider = ({ children }) => {
    const [permissions, setPermissions] = useState();
    let fetchPermissions = useCallback(async () => {
        const response = await getAppConfig();
        setPermissions(response.data);
    }, [])
    useEffect(() => {
        fetchPermissions();
    }, [fetchPermissions]);
    return (
        <AppConfigContext.Provider value={{ permissions }}>
            {children}
        </AppConfigContext.Provider>
    );
};

export { AppConfigContext, AppConfigProvider };
