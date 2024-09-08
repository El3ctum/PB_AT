// /contexts/QuotationsContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getQuotationsFromDatabase } from '../services/quotationService'; // Função para buscar cotações no banco de dados

interface Quotation {
    id: string;
    productId: string,
    suplierId: string,
    description: string;
    value: number;
}

interface QuotationsContextType {
    quotations: Quotation[];
    addQuotation: (quotation: Quotation) => void;
}

export const QuotationsContext = createContext<QuotationsContextType | undefined>(undefined);

export const QuotationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [quotations, setQuotations] = useState<Quotation[]>([]);

    useEffect(() => {
        // Carregar as cotações da API ou Firestore no início
        getQuotationsFromDatabase().then(fetchedQuotations => setQuotations(fetchedQuotations));
    }, []);

    const addQuotation = (newQuotation: Quotation) => {
        setQuotations([...quotations, newQuotation]);
        // Aqui você pode também fazer um POST no banco de dados para adicionar a cotação
    };

    return (
        <QuotationsContext.Provider value={{ quotations, addQuotation }}>
            {children}
        </QuotationsContext.Provider>
    );
};
