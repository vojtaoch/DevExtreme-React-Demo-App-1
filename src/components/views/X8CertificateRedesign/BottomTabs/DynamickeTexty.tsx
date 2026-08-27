import { DataGrid, Lookup, Column, Editing } from 'devextreme-react/data-grid';


const sampleData = [
    { id: 1, a: true, b: 'b', c: 'c', d: 'd', e: true, f: true, g: 'g', h: true }
];

function DynamickeTexty() {
    return (
        <DataGrid
            dataSource={sampleData}
            keyExpr='id'
        >

            <Editing
                mode='cell'
                allowAdding={true}
                allowUpdating={true}
                allowDeleting={true}
            />

            <Column
                dataField='a'
                dataType='boolean'
                caption='Ú'
                editorOptions={{
                    enableThreeStateBehavior: true
                }}
            />

            <Column
                dataField='b'
                caption='Poz.'
            />

            <Column
                dataField='c'
                caption='Vzor'
            >
                <Lookup />
            </Column>

            <Column
                dataField='d'
                caption='Nadpis'
            />

            <Column
                dataField='e'
                dataType='boolean'
                caption='B'
                editorOptions={{
                    enableThreeStateBehavior: true
                }}
            />

            <Column
                dataField='f'
                dataType='boolean'
                caption='__'
            />

            <Column
                dataField='g'
                caption='Dynamický text'
            />

            <Column
                dataField='h'
                dataType='boolean'
                caption='B'
                editorOptions={{
                    enableThreeStateBehavior: true
                }}
            />

        </DataGrid>
    );
}

export default DynamickeTexty;
