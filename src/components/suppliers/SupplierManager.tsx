import React, { useEffect, useState } from 'react';
import { createSupplier, getSuppliers, updateSupplier, deleteSupplier } from '../../services/supplierService';
import SupplierModel from '../../models/Supplier';
import SupplierForm from './SupplierForm';
import SupplierList from './SupplierList';
import { Outlet, useLocation } from 'react-router-dom';

const SupplierManager: React.FC = () => {
    const location = useLocation();
    const [suppliers, setSuppliers] = useState<SupplierModel[]>([]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            const suppliersList = await getSuppliers();
            setSuppliers(suppliersList);
        };

        fetchSuppliers();
    }, []);

    const addSupplier = async (supplier: SupplierModel) => {
        await createSupplier(supplier);
        setSuppliers((prev) => [...prev, supplier]);
    };

    const editSupplier = async (supplier: SupplierModel) => {
        await updateSupplier(supplier);
        setSuppliers((prev) =>
            prev.map((s) => (s.id === supplier.id ? supplier : s))
        );
    };

    const removeSupplier = async (id: string) => {
        await deleteSupplier(id);
        setSuppliers((prev) => prev.filter((s) => s.id !== id));
    };

    return (
        <div>
            {location.pathname.endsWith("supplierForm") ?
                <>
                    <SupplierList suppliers={suppliers} removeSupplier={removeSupplier} />
                    <SupplierForm addSupplier={addSupplier} editSupplier={editSupplier} />
                </>
                : <Outlet />}
        </div>
    );
};

export default SupplierManager;
