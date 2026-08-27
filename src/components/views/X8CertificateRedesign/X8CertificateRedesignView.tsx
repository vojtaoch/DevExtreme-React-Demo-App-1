import Form, { EmptyItem } from 'devextreme-react/form';
import TopLeft from './TopLeft';
import TopMiddle from './TopMiddle';
import BottomTabs from './BottomTabs/BottomTabs';

import './X8CertificateRedesignView.css';


function X8CertificateRedesignView() {
    return (
        <Form
            colCount={3}
            showColonAfterLabel={false}
        >
            <TopLeft />
            <TopMiddle />
            <EmptyItem />
            <BottomTabs />
        </Form>
    );
}

export default X8CertificateRedesignView;
