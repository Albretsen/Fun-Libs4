import { createContext, useContext } from "react";
import useCreateLogic from "../hooks/useCreateLogic";

const CreateContext = createContext<any>(null);

export const CreateProvider = ({ children }: any) => {
    const createLogic = useCreateLogic();

    return (
        <CreateContext.Provider value={createLogic}>
            {children}
        </CreateContext.Provider>
    )
}

export const useCreateContext = () => {
    const context = useContext(CreateContext);
    return context;
}