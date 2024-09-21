import React, { useEffect, useState } from 'react';
import { createRequisition, getRequisitions, updateRequisition, deleteRequisition } from '../../services/requisitionService';
import { getProducts } from '../../services/productService'; // Assuming these functions exist
import { getUsers } from '../../services/userService'; // Assuming these functions exist
import { getQuotations } from '../../services/quotationService'; // Assuming this function exists
import RequisitionModel from '../../models/Requisition';
import UserModel from '../../models/User'; // Import UserModel
import RequisitionForm from './RequisitionForm';
import RequisitionList from './RequisitionList';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const RequisitionManager: React.FC = () => {
    const [requisitions, setRequisitions] = useState<RequisitionModel[]>([]);
    const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
    const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
    const [quotations, setQuotations] = useState<{ requisitionId: string; id: string }[]>([]);
    const { activeUserData } = useAuth();

    useEffect(() => {
        const fetchRequisitions = async () => {
            const requisitionList = await getRequisitions();
            const filteredRequisitions = requisitionList.filter(requisition => requisition.userId === activeUserData.id);
            setRequisitions(filteredRequisitions);
        };

        const fetchUsers = async () => {
            const userList: UserModel[] = await getUsers();
            setUsers(userList.map(user => ({
                id: user.id,
                name: `${user.firstName} ${user.lastName}`
            })));
        };

        const fetchProducts = async () => {
            const productList = await getProducts();
            setProducts(productList);
        };

        fetchRequisitions();
        fetchUsers();
        fetchProducts();
    }, [activeUserData.id]);

    useEffect(() => {
        const fetchQuotationsForRequisitions = async () => {
            const allQuotations = [];
            for (const requisition of requisitions) {
                const quotationsList = await getQuotations(requisition.id);
                allQuotations.push(...quotationsList);
            }
            setQuotations(allQuotations);
        };

        if (requisitions.length > 0) {
            fetchQuotationsForRequisitions();
        }
    }, [requisitions]);

    const addRequisition = async (requisition: RequisitionModel) => {
        await createRequisition(requisition);
        setRequisitions((prev) => [...prev, requisition]);
    };

    const editRequisition = async (requisition: RequisitionModel) => {
        await updateRequisition(requisition);
        setRequisitions((prev) =>
            prev.map((r) => (r.id === requisition.id ? requisition : r))
        );
    };

    const removeRequisition = async (id: string) => {
        await deleteRequisition(id);
        setRequisitions((prev) => prev.filter((r) => r.id !== id));
    };

    return (
        <div>
            {location.pathname.endsWith("requisitions") ?
                <>
                    <RequisitionList
                        requisitions={requisitions}
                        removeRequisition={removeRequisition}
                        users={users}
                        products={products}
                        quotations={quotations}
                    />
                    <RequisitionForm
                        addRequisition={addRequisition}
                        editRequisition={editRequisition}
                    />
                </>
                : <Outlet />}
        </div>
    );
};

export default RequisitionManager;
