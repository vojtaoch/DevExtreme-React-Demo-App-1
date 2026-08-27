import { TextArea } from "devextreme-react/text-area";
import { Tab } from 'devextreme-react/form';


function Poznamka() {
    return (
        <Tab
            title="Poznámka"
        >
            <TextArea
                autoResizeEnabled={true}
            />
        </Tab>
    );
}

export default Poznamka;
