import { useMemo, useState } from 'react';
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
    Export
} from 'devextreme-react/data-grid';

import { Workbook } from 'devextreme-exceljs-fork';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid as exportDataGridToPdf} from 'devextreme/pdf_exporter';
import Tabs, { Item as TabItem } from 'devextreme-react/tabs';
import { Button } from 'devextreme-react/button';
import notify from 'devextreme/ui/notify';
import Form, { SimpleItem, GroupItem, RequiredRule } from 'devextreme-react/form';

import ODataStore from "devextreme/data/odata/store";

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

const initialInvoiceData = {
    FAK_ID: '',
    FIRMA_ID: '',
    ZAKAZKA_ID: '',
    SMAN_ID: '',
    DAT_ZAPL: '',
    CELK_PRODEJ: 0,
    CELK_DPH: 0,
    CELK_ZAPL: 0
};

function FormView() {
    const [formData, setFormData] = useState(initialInvoiceData);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Odesílaná data faktury:", formData);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px' }}>
            <h2>Detail / Nová faktura</h2>
            
            <form onSubmit={handleSubmit}>
                <Form formData={formData} colCount={2}>
                    <GroupItem caption="Základní údaje">
                        <SimpleItem dataField="FIRMA_ID">
                            <RequiredRule message="Firma je povinná" />
                        </SimpleItem>
                        <SimpleItem dataField="ZAKAZKA_ID" />
                        <SimpleItem dataField="SMAN_ID" editorType="dxTextBox" />
                    </GroupItem>

                    <GroupItem caption="Datace a Finance">
                        <SimpleItem dataField="DAT_ZAPL" />
                        <SimpleItem dataField="CELK_PRODEJ" editorType="dxNumberBox" />
                        <SimpleItem dataField="CELK_DPH" editorType="dxNumberBox" />
                        <SimpleItem dataField="CELK_ZAPL" editorType="dxNumberBox" />
                    </GroupItem>
                </Form>

                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    <Button text="Uložit fakturu" type="success" useSubmitBehavior={true} />
                    <Button text="Zrušit" type="normal" onClick={() => setFormData(initialInvoiceData)} />
                </div>
            </form>
        </div>
    );
}

function App() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleTabChange = (e: any) => {
        setSelectedIndex(e.ariaIndex ? parseInt(e.ariaIndex) : e.itemIndex);
    };

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
