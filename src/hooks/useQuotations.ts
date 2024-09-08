import { useContext } from "react";
import { QuotationsContext } from "../contexts/QuotationContext";

export const useQuotations = () => {
    const context = useContext(QuotationsContext);
    if (!context) {
        throw new Error('useQuotations must be used within a QuotationsProvider');
    }
    return context;
};