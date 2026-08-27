import { TextArea } from 'devextreme-react/text-area';
import { Tab } from 'devextreme-react/form';
import { Lookup } from 'devextreme-react/lookup';


function PomocneTexty() {
    return (
        <Tab
            title='Pomocné texty'
            colCount={1}
        >

            <Lookup />
            <TextArea
                autoResizeEnabled={true}
            />
            <Lookup />
            <TextArea
                autoResizeEnabled={true}
            />

        </Tab>
    );
}

export default PomocneTexty;
