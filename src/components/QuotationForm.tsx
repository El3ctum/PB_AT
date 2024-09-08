import React, { useState } from 'react';
import { createQuotation } from '../services/quotationService';

const QuotationForm: React.FC = () => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createQuotation({ description, amount });
        setDescription('');
        setAmount('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Quotation</h1>
            <label>
                Description:
                <input 
                    type="text" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
            </label>
            <label>
                Amount:
                <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    required 
                />
            </label>
            <button type="submit">Save Quotation</button>
        </form>
    );
};

export default QuotationForm;
