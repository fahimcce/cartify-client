/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../types";
import { getCurrenUser } from "../services/AuthService";

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

type IUserProviderValues = {
  user: IUser | null | undefined;
  isLoading: boolean | undefined;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setUser: (user: IUser | null) => void;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = async () => {
    const user = await getCurrenUser();
    setUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, setUser, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useLocalUser = () => {
  const context = useContext(UserContext);
  // check the context is calling out side of the applicaiton or wraper
  if (context === undefined) {
    throw new Error(
      "useUser should be invoked inside the wraper boundary or application"
    );
  }
  return context;
};
