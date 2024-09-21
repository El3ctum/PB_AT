import React, { useEffect, useState } from 'react';
import { createQuotation, getQuotations, updateQuotation, deleteQuotation } from '../../services/quotationService';
import QuotationModel from '../../models/Quotation';
import QuotationForm from './QuotationForm';
import QuotationList from './QuotationtList';
import { useParams } from 'react-router-dom';
import { getSuppliers } from '../../services/supplierService';

const QuotationManager: React.FC = () => {
    const { id: requisitionId } = useParams<{ id: string }>();
    const [quotations, setQuotations] = useState<QuotationModel[]>([]);
    const [suppliers, setSuppliers] = useState<{ id: string; name: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const quotationsList = await getQuotations(requisitionId || '');
                const suppliersList = await getSuppliers();
                setQuotations(quotationsList);
                setSuppliers(suppliersList);
            } catch (err) {
                setError("Failed to load data.");
                console.error(err)
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [requisitionId]);
    const addQuotation = async (quotation: QuotationModel) => {
        if (requisitionId) {
            try {
                await createQuotation(requisitionId, quotation);
                setQuotations((prev) => [...prev, quotation]);
            } catch (err) {
                setError("Failed to add quotation.");
                console.error(err)
            }
        }
    };

    const editQuotation = async (quotation: QuotationModel) => {
        if (requisitionId) {
            try {
                await updateQuotation(requisitionId, quotation);
                setQuotations((prev) =>
                    prev.map((q) => (q.id === quotation.id ? quotation : q))
                );
            } catch (err) {
                setError("Failed to edit quotation.");
                console.error(err)
            }
        }
    };

    const removeQuotation = async (id: string) => {
        if (requisitionId) {
            try {
                await deleteQuotation(requisitionId, id);
                setQuotations((prev) => prev.filter((q) => q.id !== id));
            } catch (err) {
                setError("Failed to delete quotation.");
                console.error(err)
            }
        }
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <QuotationList quotations={quotations} removeQuotation={removeQuotation} suppliers={suppliers} />
            <QuotationForm addQuotation={addQuotation} editQuotation={editQuotation} requisitionId={requisitionId!} />
        </div>
    );
};

export default QuotationManager;
