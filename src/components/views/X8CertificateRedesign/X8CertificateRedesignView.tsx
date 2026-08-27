import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Form, { EmptyItem } from 'devextreme-react/form';
import TopLeft from './TopLeft';
import TopMiddle from './TopMiddle';
import BottomTabs from './BottomTabs/BottomTabs';

import './X8CertificateRedesignView.css';


function X8CertificateRedesignView() {
    const { fakId } = useParams<{ fakId: string }>();

    const [invoice, setInvoice] = useState<any>(null);

    useEffect(() => {
        if (!fakId) {
            return;
        }

        const loadInvoice = async () => {
            const response = await fetch(
                `/api/odata/FAKTURA('${encodeURIComponent(fakId)}')?$expand=FAK_POL`
            );

            if (!response.ok) {
                throw new Error(`HTTP chyba ${response.status}`);
            }

            const data = await response.json();

            setInvoice(data);
        };

        loadInvoice();
    }, [fakId]);

    return (
        <Form
            colCount={3}
            showColonAfterLabel={false}
            formData={invoice}
        >
            <TopLeft />
            <TopMiddle />
            <EmptyItem />
            <BottomTabs fakId={fakId} />
        </Form>
    );
}

export default X8CertificateRedesignView;
