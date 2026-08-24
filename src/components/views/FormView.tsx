import { useState, useCallback } from 'react';
import 'devextreme/dist/css/dx.fluent.blue.light.css';

import DataGrid, {
    Column,
    Editing,
    EmptyItem,
    Label,
    Summary,
    TotalItem,
    Toolbar as GridToolbar,
    Item as GridItem
} from 'devextreme-react/data-grid';

import Form, { SimpleItem, GroupItem, Tab, TabbedItem, ButtonItem } from 'devextreme-react/form';

import { CheckBox } from 'devextreme-react';

function InvoiceGrid() {
    const [dataSource, setDataSource] = useState([]);

    const setAmountValue = (newData: any, value: number, currentRowData: any) => {
        newData.amount = value;
        const currentPrice = newData.unitPrice ?? currentRowData.unitPrice ?? 0;
        newData.totalPrice = (value || 0) * currentPrice;
    };

    const setUnitPriceValue = (newData: any, value: number, currentRowData: any) => {
        newData.unitPrice = value;
        const currentQuantity = newData.amount ?? currentRowData.amount ?? 0;
        newData.totalPrice = (value || 0) * currentQuantity;
    };

    return (
        <DataGrid dataSource={dataSource}>
            <Editing mode="popup"
                     allowUpdating={true}
                     allowDeleting={true}
                     allowAdding={true} />

            <GridToolbar>
                <GridItem name="addRowButton"
                          showText="always" />
            </GridToolbar>


            <Column dataField='id'
                    caption='ID položky' />
            <Column dataField='name'
                    caption='Název' />
            <Column dataField='amount'
                    caption='Množství'
                    dataType='number'
                    alignment='left'
                    setCellValue={setAmountValue} />
            <Column dataField='unit'
                    caption='Jednotka' />
            <Column dataField='unitPrice'
                    caption='Cena za jednotku (Kč)'
                    dataType='number'
                    alignment='left'
                    setCellValue={setUnitPriceValue} />
            <Column dataField='totalPrice'
                    caption='Celková cena (Kč)'
                    allowEditing={false}
                    calculateCellValue={(rowData) => (rowData.amount || 0) * (rowData.unitPrice || 0)} />


            <Summary>
                <TotalItem column='totalPrice'
                           summaryType='sum' />
            </Summary>
        </DataGrid>
    );
}

function FormView() {
    const [isFormDisabled, setIsFormDisabled] = useState(true);

    const onToggleDisableFormCheckBoxValueChanged = useCallback((e: { value?: boolean }) => {
        setIsFormDisabled(!!e.value);
    }, []);

    const [formData, setFormData] = useState({
        FAK_ID: '',
        FIRMA_ID: '',
        ZAKAZKA_ID: '',
        SMAN_ID: '',
        DAT_ZAPL: '',
        CELK_PRODEJ: 0,
        CELK_DPH: 0,
        CELK_ZAPL: 0
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/odata/FAKTURA', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Úspěšně odesláno:', data);
                alert('W');
            } else {
                console.error('Chyba při odesílání:', response.statusText);
                alert(await response.text);
            }
        } catch (error) {
            console.error('Chyba sítě:', error);
            alert('zamotaná síť');
        }
    };

    return (
        <form action='/api/odata/FAKTURA'
              onSubmit={handleSubmit}>
            <Form formData={formData}
                onFieldDataChanged={(e) => {
                    setFormData((prev) => ({
                        ...prev,
                        [e.dataField!]: e.value
                    }));
                }}
                colCount={2}
                readOnly={isFormDisabled}>
                <GroupItem caption='Sekce 1'>
                    <SimpleItem dataField='FAK_ID' />
                    <SimpleItem dataField='FIRMA_ID'>
                        <Label alignment='right' />
                    </SimpleItem>
                    <SimpleItem dataField='ZAKAZKA_ID' />
                    <EmptyItem />
                    <EmptyItem />
                    <EmptyItem />
                    <EmptyItem />
                    <EmptyItem />
                    <SimpleItem dataField='SMAN_ID' />
                </GroupItem>
                <GroupItem caption='Sekce 2'>
                    <TabbedItem>
                        <Tab title='Sekce 2.1'
                            colCount={2}>
                            <SimpleItem dataField='DAT_ZAPL' />
                            <SimpleItem dataField='CELK_PRODEJ' />
                        </Tab>
                        <Tab title='Sekce 2.2'>
                            <SimpleItem dataField='CELK_DPH'
                                        colSpan={2} />
                            <SimpleItem dataField='CELK_ZAPL'
                                    editorOptions={{disabled: true}} />
                        </Tab>
                    </TabbedItem>
                </GroupItem>

                <SimpleItem colSpan={2} render={() => <InvoiceGrid />} />

                <ButtonItem buttonOptions={{
                    text: 'Submit',
                    useSubmitBehavior: true
                }} />
            </Form>

            <CheckBox text='Enable/disable form'
                      value={isFormDisabled}
                      onValueChanged={onToggleDisableFormCheckBoxValueChanged} />
        </form>
    );
}

export default FormView;
