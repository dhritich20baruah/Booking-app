import { createContext } from "react";

type BusContextType = {
    origin: string;
    setOrigin: React.Dispatch<React.SetStateAction<string>>;
    destination: string;
    setDestination: React.Dispatch<React.SetStateAction<string>>;
    doj: string;
    setDoj: React.Dispatch<React.SetStateAction<string>>;
}

const BusContext = createContext<BusContextType | undefined>(undefined)

type paymentContextType = {
    paymentSuccess: boolean;
    setPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PaymentContext = createContext<paymentContextType | undefined>(undefined)

export default BusContext