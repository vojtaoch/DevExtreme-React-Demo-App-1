import { SimpleItem, GroupItem, EmptyItem, Label } from 'devextreme-react/form';
import { Button } from 'devextreme-react/button';


type ColumnElementProps = {
    text: string,
    readOnly?: boolean
};

const leftColumnInputFieldWidth = '205px';
const rightColumnInputFieldWidth = '150px';

function LeftColumnElement({text, readOnly} : ColumnElementProps) {
    return (
        <SimpleItem
            dataField=''
            editorOptions={{
                width: leftColumnInputFieldWidth,
                readOnly: readOnly,
                elementAttr: { style: 'margin-top: -7px;' }
            }}
        >
            <Label text={text} />
        </SimpleItem>
    );
}

function RightColumnElement({text, readOnly = false} : ColumnElementProps) {
    return (
        <SimpleItem
            dataField=''
            editorOptions={{
                width: rightColumnInputFieldWidth,
                readOnly: readOnly,
                elementAttr: { 
                    style: 'margin-top: -7px; margin-left: -80px;'
                }
            }}
        >
            <Label
                render={() => (
                    <span style={{ position: 'relative', left: '-80px' }}>
                        {text}
                    </span>
                )}
            />
        </SimpleItem>
    );
}

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
            <EmptyItem />


            <LeftColumnElement text='Základ' />
            <RightColumnElement text='Vystaveno' />

            <LeftColumnElement text='DPH' />
            <RightColumnElement text='Datum plnění' />

            <LeftColumnElement text='Uhrazeno zálohou' />
            <RightColumnElement
                text='Přijato'
                readOnly={true}
            />

            <LeftColumnElement text='Zaokrouhlení' />
            <EmptyItem />

            <LeftColumnElement text='K úhradě' />
            <GroupItem
                colCount={2}
            >
                <RightColumnElement text='Splatnost' />
                <SimpleItem
                    render={() => (
                        <Button
                            elementAttr={{ style: 'margin-top: 17px; margin-left: -75px; width: 40px' }}
                        />
                    )}
                />
            </GroupItem>

            <LeftColumnElement text='Uhrazeno' />
            <RightColumnElement text='Zaplaceno' />

        </GroupItem>
    );
}

export default TopMiddle;
