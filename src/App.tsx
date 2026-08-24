import { useMemo, useState, useCallback } from 'react';
import 'devextreme/dist/css/dx.fluent.blue.light.css';

import DataGrid, {
    Column,
    Editing,
    FilterRow,
    Sorting,
    Toolbar,
    Item,
    SearchPanel,
    type DataGridTypes,
    Export,
    EmptyItem,
    Label,
    Summary,
    TotalItem
} from 'devextreme-react/data-grid';

import { Workbook } from 'devextreme-exceljs-fork';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid as exportDataGridToPdf} from 'devextreme/pdf_exporter';
import Tabs, { Item as TabItem } from 'devextreme-react/tabs';
import { Button } from 'devextreme-react/button';
import notify from 'devextreme/ui/notify';
import Form, { SimpleItem, GroupItem, Tab, TabbedItem, ButtonItem } from 'devextreme-react/form';

import ODataStore from "devextreme/data/odata/store";
import { CheckBox } from 'devextreme-react';
import { Col } from 'devextreme-react/cjs/responsive-box';

function InvoicesView() {
    const dataSource = useMemo(() => new ODataStore({
        url: "/api/odata/FAKTURA",
        key: "FAK_ID",
        version: 4
    }), []);

    return (
        <div className="App">

            <DataGrid
                dataSource={dataSource}
                keyExpr="FAK_ID"
                onExporting={exportGrid}>

                  <Sorting mode="multiple" />
                  <FilterRow visible={true} />
                  <Editing
                      mode="popup"
                      allowUpdating={true}
                      allowDeleting={true}
                      allowAdding={true} />

                  <Toolbar>
                    <Item name="addRowButton" showText="always" />
                    <Item name="searchPanel" />
                    <Item name="exportButton" />
                  </Toolbar>

                  <SearchPanel visible={true} />

                  <Export enabled={true} formats={exportFormats} />


                  <Column dataField='FAK_ID' />
                  <Column dataField='FIRMA_ID' />
                  <Column dataField='ZAKAZKA_ID' />
                  <Column dataField='SMAN_ID' dataType='string' />
                  <Column dataField='DAT_ZAPL' />
                  <Column dataField='CELK_PRODEJ' />
                  <Column dataField='CELK_DPH' />
                  <Column dataField='CELK_ZAPL' />
                  
            </DataGrid>

            <Button onClick={() => {notify("Hello World!"); alert("Hello World!");}} text="Click me!" icon='message' />
        </div>
    );
}

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

            <Toolbar>
                <Item name="addRowButton"
                      showText="always" />
            </Toolbar>


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

function App() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div className="App" style={{ padding: '10px' }}>
            <Tabs 
                selectedIndex={selectedIndex} 
                onSelectedIndexChange={setSelectedIndex}
                style={{ marginBottom: '20px' }}
            >
                <TabItem text="Faktury" icon="doc" />
                <TabItem text="Formulář" icon="chart" />
            </Tabs>

            {selectedIndex === 0 && <InvoicesView />}
            {selectedIndex === 1 && <FormView />}
        </div>
    );
}


const exportFormats = ['xlsx', 'pdf'];
 
function exportGrid(e: DataGridTypes.ExportingEvent) {
    if (e.format === 'xlsx') {
        const workbook = new Workbook(); 
        const worksheet = workbook.addWorksheet("Main sheet"); 
        exportDataGrid({ 
            worksheet: worksheet, 
            component: e.component,
        }).then(function() {
            workbook.xlsx.writeBuffer().then(function(buffer) { 
                saveAs(new Blob([buffer], { type: "application/octet-stream" }), "DataGrid.xlsx"); 
            }); 
        }); 
    } else if (e.format === 'pdf') {
        const doc = new jsPDF();
        exportDataGridToPdf({
            jsPDFDocument: doc,
            component: e.component,
        }).then(() => {
            doc.save('DataGrid.pdf');
        });
    }
}


export default App;

// $data = Invoke-RestMethod -Uri "http://192.168.44.17:8080/api/odata/FAKTURA" -Method Get
// 21. 8.: doplnit sloupce, zkusit POST (aby se změna promítla na server), v menu vytvořit nové view na formulář faktury

// nejede filtrování???
