import { TextArea } from 'devextreme-react/text-area';
import { Lookup } from 'devextreme-react/lookup';


function PomocneTexty() {
    return (
        <>
            <Lookup />
            <TextArea
                autoResizeEnabled={true}
            />
            <Lookup />
            <TextArea
                autoResizeEnabled={true}
            />

        </>
    );
}

export default PomocneTexty;
