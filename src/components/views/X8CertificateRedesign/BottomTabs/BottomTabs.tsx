import { SimpleItem, Label } from 'devextreme-react/data-grid';
import { ButtonItem, GroupItem, Tab, TabbedItem } from 'devextreme-react/form';
import { CheckBox } from 'devextreme-react';

import Polozky from './Polozky';
import Zatrideni from './Zatrideni';
import PomocneTexty from './PomocneTexty';
import Poznamka from './Poznamka';

function BottomTabs() {
    return (
        <GroupItem
            colSpan={3}
        >
            <TabbedItem>

                <Polozky />
                <Zatrideni />
                <PomocneTexty />

                <Tab
                    title='Dynamické texty'
                >
                    
                </Tab>

                <Poznamka />

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
