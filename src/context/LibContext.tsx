import { createContext } from "react";
import Lib from "../utils/libs";

export const LibContext = createContext<{
    //placeholder?: () => void;
    lib?: Lib | null;
    setLib?: (lib: Lib | null) => void;
}>({});