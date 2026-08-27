import { GroupItem, Tab, TabbedItem, SimpleItem, Label, ButtonItem } from 'devextreme-react/form';
import { CheckBox } from 'devextreme-react';

import Polozky from './Polozky';
import PomocneTexty from './PomocneTexty';
import DynamickeTexty from './DynamickeTexty';
import Poznamka from './Poznamka';

import type { Invoice } from '../X8CertificateRedesignView';


function ZatrideniItem({ text }: {text: string}) {
    return (
        <SimpleItem
            dataField=''
        >
            <Label text={text} />
        </SimpleItem>
    );
}

function BottomTabs({ invoice } : { invoice: Invoice }) {
    return (
        <GroupItem
            colSpan={3}
        >
            <TabbedItem>

                <Tab
                    title='Položky'
                    render={() => (<Polozky invoice={invoice} />)}
                />

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

                <Tab
                    title='Pomocné texty'
                    render={() => (<PomocneTexty />)}
                    colCount={1}
                />
                
                <Tab
                    title='Dynamické texty'
                    render={() => (<DynamickeTexty />)}
                />

                <Tab
                    title='Poznámka'
                    render={() => (<Poznamka />)}
                />

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
