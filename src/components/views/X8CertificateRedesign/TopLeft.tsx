import { SimpleItem, GroupItem, EmptyItem, Label } from 'devextreme-react/form';
import { Button } from 'devextreme-react/button';
import { TextBox } from 'devextreme-react/text-box';

import './TopLeft.css';


type CompanyInfo = {
    address: string;
    countryCode: string;
    ico: string;
    dic: string;
    line2End: string;
};

type CompanySectionProps = {
    companyInfo: CompanyInfo;
    isRecipient: boolean
};

function CompanySection({ companyInfo, isRecipient }: CompanySectionProps) {
    const labelText = isRecipient ? 'Příjemce' : 'Odběratel';

    return (
        <SimpleItem colSpan={4}
            render={() => (
                <div>
                    <label>
                        {labelText}
                    </label>

                    <TextBox />

                    {companyInfo && (
                        <>
                            <div className='customer-and-recipient-info'>
                                <div>{companyInfo.address}</div>
                                <div>{companyInfo.countryCode}</div>
                            </div>
                            <div className='customer-and-recipient-info'>
                                <span>{companyInfo.ico}</span>
                                <span className='dic'>
                                    {companyInfo.dic}
                                </span>
                                <span>{companyInfo.line2End}</span>
                            </div>
                        </>
                    )}
                </div>
            )}
        />
    );
}

function EmployeeSection({employeeInfo} : {employeeInfo: string}) {
    return (
        <SimpleItem
            colSpan={4}
            render={() => (
                <div>
                    <TextBox
                        className='textbox-without-label'
                    />

                    {employeeInfo && (
                        <div className='customer-and-recipient-info'>
                            <div>{employeeInfo}</div>
                        </div>
                    )}
                </div>
            )}
        />
    );
}

function TopLeft() {
    const customerCompanyInfo = {
        address: 'adresa...',
        countryCode: 'CZ',
        ico: 'IČO: 123456789',
        dic: 'DIČ: 987654321',
        line2End: 'plátce'
    };

    const customerEmployeeInfo = 'Jméno';

    const recipientCompanyInfo = {
        address: 'adresa...',
        countryCode: 'CZ',
        ico: 'IČO: 123456789',
        dic: 'DIČ: 987654321',
        line2End: 'plátce'
    };

    const recipientEmployeeInfo = 'Jméno';

    return (
        <GroupItem
            colCount={4}
            cssClass='top-left'
        >

            <SimpleItem
                colSpan={2}
                dataField='FAK_ID'
                cssClass='textbox-cislo-dokladu'
            >
                <Label text='Číslo dokladu' />
            </SimpleItem>
            <SimpleItem
                render={() => (
                    <div className="textbox-button-container">
                        <TextBox className="small-input-field" />
                        <Button className="button-rada" />
                    </div>
                )}
            >
                <Label text="Řada" />
            </SimpleItem>
            <EmptyItem />

            <SimpleItem
                colSpan={2}
                dataField=''
                cssClass='textbox-evid-cislo-and-var-symbol'
                editorOptions={{ disabled: true }}
            >
                <Label 
                    text='Evidenční číslo'
                />
            </SimpleItem>
            <SimpleItem
                colSpan={2}
                dataField='UCET_FAK'  // wrong data field, change later
                cssClass='textbox-evid-cislo-and-var-symbol'
            >
                <Label 
                    text='Variabilní symbol'
                />
            </SimpleItem>

            <SimpleItem
                colSpan={4}
                dataField='FIRMA_ID'  // wrong data field, change later
                cssClass='textbox-without-label'
            />

            <CompanySection
                companyInfo={customerCompanyInfo}
                isRecipient={false}
            />
            <EmployeeSection
                employeeInfo={customerEmployeeInfo}
            />
            <CompanySection
                companyInfo={recipientCompanyInfo}
                isRecipient={true}
            />
            <EmployeeSection
                employeeInfo={recipientEmployeeInfo}
            />

        </GroupItem>
    );
}

export default TopLeft;
