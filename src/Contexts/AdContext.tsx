// AdContext.tsx
import { createContext, useContext } from 'react';
import type { RequestOptions } from 'react-native-google-mobile-ads';

type AdContextType = {
    requestOptions: RequestOptions;
};

export const AdContext = createContext<AdContextType>({
    requestOptions: {},
});

export const useAdContext = () => useContext(AdContext);
