import { SimpleItem, GroupItem, EmptyItem, Label } from 'devextreme-react/form';
import { Button } from 'devextreme-react/button';
import { TextBox } from 'devextreme-react/text-box';


function TopMiddle() {
    const smallInputFieldWidth = '75px';

    return (
        <GroupItem
            colCount={2}
        >

            <GroupItem
                colCount={3}
            >
                <SimpleItem
                    dataField=''
                    editorOptions={{ width: smallInputFieldWidth }}
                >
                    <Label text='Měna' />
                </SimpleItem>
                <SimpleItem
                    render={() => (
                        <Button
                            elementAttr={{ style: 'margin-top: 24px; margin-left: -32px;' }}
                        />  
                    )}
                >
                    <Label text='' />
                </SimpleItem>
                <SimpleItem
                    dataField=''
                    editorOptions={{
                        value: 'zaplacená / zaúčtovaná',
                        readOnly: true,
                        elementAttr: {
                            style: 'border: none; background: transparent; width: 170px; margin-left: -80px;'
                        }
                    }}
                >
                    <Label
                        render={() => (
                            <span style={{ position: 'relative', left: '-80px' }}>
                                Stav
                            </span>
                        )}
                    />
                </SimpleItem>
            </GroupItem>
            <EmptyItem />

            <SimpleItem
                dataField=''
                editorOptions={{
                    width: smallInputFieldWidth,
                    elementAttr: { style: 'margin-top: -21px;' }
                }}
            >
                <Label 
                    render={() => (
                        <span style={{ position: 'relative', top: '-15px' }}>
                            Kurz
                        </span>
                    )}
                />
            </SimpleItem>
            <EmptyItem />

            <GroupItem
                colCount={3}
            >

                <SimpleItem
                    render={() => (
                        <Button 
                            elementAttr={{ style: 'margin-left: 78px;' }}
                        />
                    )}
                />
                <SimpleItem
                    render={() => (
                        <Button
                            elementAttr={{ style: 'margin-left: 15px;' }}
                        />
                    )}
                />
                <SimpleItem
                    render={() => (
                        <Button
                            elementAttr={{ style: 'margin-left: -35px;' }}
                        />
                    )}
                />

            </GroupItem>

        </GroupItem>
    );
}

export default TopMiddle;
