import { SimpleItem, Label } from 'devextreme-react/data-grid';
import { ButtonItem, GroupItem, Tab } from 'devextreme-react/form';
import { CheckBox } from 'devextreme-react';


function ZatrideniItem({ text }: {text: string}) {
    return (
        <SimpleItem
            dataField=''
        >
            <Label text={text} />
        </SimpleItem>
    );
}

function Zatrideni() {
    return (
        <Tab
            title='Zatřídění'
            colCount={4}
        >

            <GroupItem>
                <ZatrideniItem text='Zakázka' />
                <ZatrideniItem text='Fáze' />
                <ZatrideniItem text='Oblast' />
                <ZatrideniItem text='Marketingová akce' />
                <ZatrideniItem text='Zdroj' />
            </GroupItem>

            <ButtonItem />

            <GroupItem>
                <CheckBox 
                    text='Konsignace'
                />
            </GroupItem>

            <GroupItem>
                <ZatrideniItem text='Bankovní účet' />
                <ZatrideniItem text='Způsob úhrady' />
                <ZatrideniItem text='Způsob dodání' />
                <ZatrideniItem text='Dodací podmínky' />
                <ZatrideniItem text='Skladník' />
            </GroupItem>

        </Tab>
    );
}

export default Zatrideni;
