import Form from 'devextreme-react/form';
import TopLeft from './TopLeft';
import TopMiddle from './TopMiddle';


function X8CertificateRedesignView() {
    return (
        <Form
            colCount={3}
            showColonAfterLabel={false}
        >
            <TopLeft />
            <TopMiddle />
        </Form>
    );
}

export default X8CertificateRedesignView;
