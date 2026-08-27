import { GroupItem, Tab, TabbedItem } from 'devextreme-react/form';

import Polozky from './Polozky';
import Zatrideni from './Zatrideni';
import PomocneTexty from './PomocneTexty';
import DynamickeTexty from './DynamickeTexty';
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
                    render={() => (<DynamickeTexty />)}
                />

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
