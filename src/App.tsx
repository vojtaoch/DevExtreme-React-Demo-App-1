import React from 'react';
import 'devextreme/dist/css/dx.fluent.blue.light.css';
 
import { DataGrid, Editing, FilterRow, Sorting, TotalItem, GroupItem, Summary, Toolbar, Item, SearchPanel, type DataGridTypes, Export } from 'devextreme-react/data-grid';
import samples from './employees.json';

import { Workbook } from 'devextreme-exceljs-fork';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid as exportDataGridToPdf} from 'devextreme/pdf_exporter';
import { Button, ScrollView } from 'devextreme-react';
import notify from 'devextreme/ui/notify';

import NavigationDrawer from "./components/NavigationDrawer";
 
function App() {
    return (
        <div className="App">
            <NavigationDrawer />

            <DataGrid
                dataSource={samples}
                keyExpr="id"
                defaultColumns={['id', 'userId', 'title', 'body']}
                onExporting={exportGrid}>

                  <Sorting mode="multiple" />
                  <FilterRow visible={true} />
                  <Editing
                      mode="popup"
                      allowUpdating={true}
                      allowDeleting={true}
                      allowAdding={true} />

                  <Summary>
                    <TotalItem summaryType='count'
                               column='id' />
                    <GroupItem summaryType='count'
                               column='userId' />
                  </Summary>

                  <Toolbar>
                    <Item name="addRowButton" showText="always" />
                    <Item name="searchPanel" />
                    <Item name="exportButton" />
                  </Toolbar>

                  <SearchPanel visible={true} />

                  <Export enabled={true} formats={exportFormats} />
                  
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


export default App;