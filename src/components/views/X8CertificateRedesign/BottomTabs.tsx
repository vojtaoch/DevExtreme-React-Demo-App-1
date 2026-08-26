import { DataGrid, Lookup, Column } from 'devextreme-react/data-grid';
import { GroupItem, Tab, TabbedItem } from 'devextreme-react/form';


function BottomTabs() {
    return (
        <GroupItem
            colSpan={3}
        >
            <TabbedItem>

                <Tab
                    title='Položky'
                >
                    <DataGrid>

                        <Column
                            dataField='POZICE'
                            caption='POZ'
                        />

                        <Column
                            dataField='cisloZbozi'  // ?
                            caption='ČÍSLO ZBOŽÍ'
                        >
                            <Lookup />
                        </Column>

                        <Column
                            dataField='NAZEV_FAK_POL'
                            caption='NÁZEV ZBOŽÍ'
                        >
                            <Lookup />
                        </Column>

                        <Column
                            dataField='MNOZSTVI'
                            dataType='number'
                            headerCellRender={(_) => (
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: '50%',
                                        transform: 'translate(-670%, -50%)',
                                        zIndex: 10,
                                        overflow: 'visible',
                                        pointerEvents: 'none'
                                    }}
                                > {/* the value of transform needs to be updated if new columns are to be added */}
                                    MNOŽSTVÍ
                                </div>
                            )}
                        />

                        <Column
                            dataField='MJ'
                            caption=''
                        >
                            <Lookup />
                        </Column>

                        <Column
                            dataField='CENA_PRODEJ'
                            dataType='number'
                            format='CZK'
                            caption='CENA'
                        />

                        <Column
                            dataField='DPH'
                            dataType='number'
                            format='percent'
                            caption='DPH'
                        />

                        {/* I am not sure what this column is for
                        <Column
                            dataField='celkem1'
                            caption='CELKEM'
                        />
                        */}

                        <Column
                            dataField='PDP'
                            dataType='number'
                            format='percent'
                            caption='PDP'
                        />

                        <Column
                            dataField='TXTA_ID1'
                            caption='1. TEXT. ATR.'
                        >
                            <Lookup />
                        </Column>

                        <Column
                            dataField='TXTA_ID2'
                            caption='2. TEXT. ATR.'
                        >
                            <Lookup />
                        </Column>

                        <Column
                            dataField='OBJ_ID'
                            caption='OBJEDNÁVKA'
                        >
                            <Lookup />
                        </Column>

                        <Column
                            dataField='OBLAST_IPOL'
                            caption='OBLAST'
                        >
                            <Lookup />
                        </Column>

                        <Column
                            dataField='DOPRAVA_ID'
                            caption='DOPRAVA'
                        />

                        <Column
                            dataField='CENA_SDPH'
                            dataType='number'
                            format='CZK'
                            caption='CENA S DPH'
                        />

                        {/* not sure what these are either
                        <Column
                            dataField='cenaZahr'
                            caption='CENA ZAHR.'
                        />

                        <Column
                            dataField='mn-2'
                            caption='MN -2'
                        />
                        */}

                        <Column
                            dataField='CENA_NAKUP'
                            dataType='number'
                            format='CZK'
                            caption='CELKEM'
                        />

                    </DataGrid>
                </Tab>

                <Tab
                    title='Zatřídění'
                >

                </Tab>

                <Tab
                    title='Pomocné texty'
                >
                    
                </Tab>

                <Tab
                    title='Dynamické texty'
                >
                    
                </Tab>

                <Tab
                    title='Poznámka'
                >
                    
                </Tab>

                <Tab
                    title='Urgence / Storno'
                >
                    
                </Tab>

                <Tab
                    title='Schvalovací postup'
                >
                    
                </Tab>

                <Tab
                    title='Systémové'
                >
                    
                </Tab>

            </TabbedItem>
        </GroupItem>
    );
}

export default BottomTabs;
