import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Form, { EmptyItem } from 'devextreme-react/form';
import TopLeft from './TopLeft';
import TopMiddle from './TopMiddle';
import BottomTabs from './BottomTabs/BottomTabs';

import './X8CertificateRedesignView.css';


export interface InvoiceItem {
    POZICE: number;
    cisloZbozi?: string;
    NAZEV_FAK_POL?: string;
    MNOZSTVI?: number;
    MJ?: string;
    CENA_PRODEJ?: number;
    DPH?: number;
    PDP?: number;
    TXTA_ID1?: string;
    TXTA_ID2?: string;
    OBJ_ID?: string;
    OBLAST_IPOL?: string;
    DOPRAVA_ID?: string;
    CENA_SDPH?: number;
    CENA_NAKUP?: number;
}

export interface Invoice {
    FAK_ID: string;
    FIRMA_ID?: string;
    ZAKAZKA_ID?: string;
    SMAN_ID?: string;
    DAT_ZAPL?: string;
    CELK_PRODEJ?: number;
    CELK_DPH?: number;
    CELK_ZAPL?: number;

    FAK_POL?: InvoiceItem[];

    // and so on
}

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
            <BottomTabs invoice={invoice} />
        </Form>
    );
}

export default X8CertificateRedesignView;
