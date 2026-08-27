import { SimpleItem, GroupItem, EmptyItem, Label } from 'devextreme-react/form';
import { Button } from 'devextreme-react/button';
import { TextBox } from 'devextreme-react/text-box';


type CompanyInfo = {
    address: string;
    countryCode: string;
    ico: string;
    dic: string;
    line2End: string;
};

type CompanySectionProps = {
    companyInfo: CompanyInfo;
    employeeInfo: string;
    isRecipient: boolean
};

const customerAndRecipientInfoStyle = {
    marginTop: '4px',
    fontSize: '13px',
    color: '#666',
    display: 'flex',
    justifyContent: 'space-between'
}

function CompanySection({ companyInfo, employeeInfo, isRecipient }: CompanySectionProps) {
    const labelText = isRecipient ? 'Příjemce' : 'Odběratel';

    return (
        <>
            <SimpleItem colSpan={4}
                render={() => (
                    <div>
                        <label>
                            {labelText}
                        </label>

                        <TextBox />

                        {companyInfo && (
                            <>
                                <div style={customerAndRecipientInfoStyle}>
                                    <div>{companyInfo.address}</div>
                                    <div>{companyInfo.countryCode}</div>
                                </div>
                                <div style={customerAndRecipientInfoStyle}>
                                    <span>{companyInfo.ico}</span>
                                    <span style={{ width: '60%', textAlign: 'left' }}>
                                        {companyInfo.dic}
                                    </span>
                                    <span>{companyInfo.line2End}</span>
                                </div>
                            </>
                        )}
                    </div>
                )}
            />

            <SimpleItem
                colSpan={4}
                render={() => (
                    <div>
                        <TextBox />

                        {employeeInfo && (
                            <div style={customerAndRecipientInfoStyle}>
                                <div>{employeeInfo}</div>
                            </div>
                        )}
                    </div>
                )}
            />
        </>
    );
}

function TopLeft() {
    const smallInputFieldWidth = '75px';

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
        <>
            <GroupItem
                colCount={4}
            >

                <SimpleItem
                    colSpan={2}
                    dataField=''
                >
                    <Label text='Číslo dokladu' />
                </SimpleItem>
                <GroupItem
                    colCount={2}
                >
                    <SimpleItem
                        dataField=''
                        editorOptions={{width: smallInputFieldWidth}}
                    >
                        <Label text='Řada' />
                    </SimpleItem>
                    <SimpleItem
                        render={() => (
                        <Button
                            elementAttr={{ style: 'margin-top: 20px;' }}
                        />
                    )}
                    >
                        <Label text=' ' />
                    </SimpleItem>
                </GroupItem>
                <EmptyItem />

                <SimpleItem
                    colSpan={2}
                    dataField=''
                    editorOptions={{
                        elementAttr: { style: 'margin-top: -20px;' },
                        disabled: true
                    }}
                >
                    <Label 
                        render={() => (
                            <span style={{ position: 'relative', top: '-15px' }}>
                                Evidenční číslo
                            </span>
                        )}
                    />
                </SimpleItem>
                <SimpleItem
                    colSpan={2}
                    dataField=''
                    editorOptions={{
                        elementAttr: { style: 'margin-top: -20px;' }
                    }}
                >
                    <Label 
                        render={() => (
                            <span style={{ position: 'relative', top: '-15px' }}>
                                Variabilní symbol
                            </span>
                        )}
                    />
                </SimpleItem>

                <SimpleItem
                    colSpan={4}
                    dataField=''
                    editorOptions={{
                        elementAttr: { style: 'margin-top: -20px;' }
                    }}
                />

                <CompanySection companyInfo={customerCompanyInfo} employeeInfo={customerEmployeeInfo} isRecipient={false} />
                <CompanySection companyInfo={recipientCompanyInfo} employeeInfo={recipientEmployeeInfo} isRecipient={true} />

            </GroupItem>
        </>
    );
}

export default TopLeft;
