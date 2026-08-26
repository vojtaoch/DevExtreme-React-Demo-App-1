import { SimpleItem, GroupItem, Tab, TabbedItem, ButtonItem } from 'devextreme-react/form';


function BottomTabs() {
    return (
        <GroupItem
            colSpan={3}
        >
            <TabbedItem>

                <Tab
                    title='Položky'
                >

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
