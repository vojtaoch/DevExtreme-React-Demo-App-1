import { useMemo } from 'react';
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
    Item
} from 'devextreme-react/data-grid';

import { Workbook } from 'devextreme-exceljs-fork';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid as exportDataGridToPdf} from 'devextreme/pdf_exporter';
import { Button } from 'devextreme-react/button';
import notify from 'devextreme/ui/notify';

import DataSource from 'devextreme/data/data_source';
import { ODataStore } from 'devextreme/common/data';

function InvoicesView() {
    const dataSource = useMemo(() => new DataSource({
        store: new ODataStore({
            url: "/api/odata/FAKTURA",
            key: "FAK_ID",
            version: 4
        })
    }), []);

    return (
        <div className="App">

            <DataGrid
                dataSource={dataSource}
                remoteOperations={false}
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
