import 'devextreme/dist/css/dx.fluent.blue.light.css';

import DataGrid, {
    Column,
    Editing,
    FilterRow,
    Sorting,
    SearchPanel,
    type DataGridTypes,
    Export,
    Toolbar,
    Item,
    Lookup
} from 'devextreme-react/data-grid';

import { Workbook } from 'devextreme-exceljs-fork';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid as exportDataGridToPdf} from 'devextreme/pdf_exporter';
import { Button } from 'devextreme-react/button';
import notify from 'devextreme/ui/notify';

import DataSource from 'devextreme/data/data_source';
import { CustomStore, ODataStore, type DataSourceOptions } from 'devextreme/common/data';
import { useMemo } from 'react';


function InvoicesView() {
    const dataSource = new DataSource({
        store: new ODataStore({
            url: "/api/odata/FAKTURA",
            key: "FAK_ID",
            version: 4
        })
    });

    const companyIDsSource: DataSourceOptions = useMemo(() => ({
        store: new CustomStore({
            key: 'FIRMA_ID',
            loadMode: 'raw', // Zabezpečí klientské filtrování
            load: async () => {
                const res = await fetch('/api/ComboView/Kontakt_RowSource_01');
                const json = await res.json();
                
                return json.Data.map((item: any) => ({
                    FIRMA_ID: item.FIRMA_ID,
                    NAZEV: item.FIRMA_ID?.trim()
                }));
            }
        }),
        paginate: false
    }), []);

    return (
        <div className="App">

            <DataGrid
                dataSource={dataSource}
                remoteOperations={false}
                onExporting={exportGrid}
                onRowInserted={(e: DataGridTypes.RowInsertedEvent) => {
                    notify("Záznam byl úspěšně vytvořen!", "success", 5000);
                }}>

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
                  <Column dataField='FIRMA_ID'>
                    <Lookup
                        dataSource={companyIDsSource}
                        valueExpr='FIRMA_ID'
                        displayExpr='NAZEV' />
                  </Column>
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

export default InvoicesView;
