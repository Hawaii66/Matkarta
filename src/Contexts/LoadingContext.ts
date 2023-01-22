import { createContext } from "react";

export interface ILoadingContext {
  loading: boolean;
  setLoading: (e: boolean) => void;
}

export const LoadingContext = createContext<ILoadingContext>({
  loading: false,
  setLoading: (_) => {},
});
