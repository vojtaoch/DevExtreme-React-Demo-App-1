import { SimpleItem, Label } from 'devextreme-react/data-grid';
import { ButtonItem, GroupItem, Tab, TabbedItem } from 'devextreme-react/form';
import { CheckBox } from 'devextreme-react';

import Polozky from './Polozky';
import Zatrideni from './Zatrideni';

function BottomTabs() {
    return (
        <GroupItem
            colSpan={3}
        >
            <TabbedItem>

                <Polozky />
                <Zatrideni />

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
