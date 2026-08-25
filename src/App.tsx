import { useMemo, useState, useCallback } from 'react';
import 'devextreme/dist/css/dx.fluent.blue.light.css';
import { Drawer } from 'devextreme-react';
import { Toolbar, Item } from "devextreme-react/toolbar";
import List from "devextreme-react/list";
import { Link, Routes, Route } from "react-router-dom";
import FormView from './components/views/FormView';
import InvoicesView from './components/views/InvoicesView';


const navigation = [
    { id: 1, text: "Faktury", icon: "message", path: "components/views/InvoicesView" },
    { id: 2, text: "Formulář", icon: "check", path: "components/views/FormView" }
];

function NavigationList({ onClose }: { onClose: () => void }) {
    return (
        <div>
            <List
                items={navigation}
                width={200}
                selectionMode="single"
                onSelectionChanged={onClose}
                itemRender={(data) => (
                    <div>
                        <Link to={'/' + data.path}>
                            <div className="dx-list-item-icon-container">
                                <i className={`dx-icon dx-list-item-icon dx-icon-${data.icon}`}/>
                            </div>
                            <span>{data.text}</span>
                        </Link>
                    </div>
                )}
            />
        </div>
    );
}

function App() {
const [isOpened, setIsOpened] = useState(false);
    
    const toggleOpened = useCallback(() => {
        setIsOpened(prev => !prev);
    }, []);

    const closeDrawer = useCallback(() => {
        setIsOpened(false);
    }, []);

    const buttonOptions = useMemo(() => ({
        icon: "menu",
        onClick: toggleOpened
    }), [toggleOpened]);

    const renderNavigation = useCallback(() => (
        <NavigationList onClose={closeDrawer} />
    ), [closeDrawer]);

    return (
        <div style={{height: '100vh'}}>
            <Toolbar id="toolbar">
                <Item 
                    widget="dxButton" 
                    options={buttonOptions} 
                    location="before" />
            </Toolbar>
            <Drawer
                opened={isOpened}
                openedStateMode='shrink'
                position="left"
                component={renderNavigation}>
                <div id="content">
                    <Routes>
                        <Route path='components/views/InvoicesView' element={<InvoicesView />} />
                        <Route path='components/views/FormView' element={<FormView />} />
                    </Routes>
                </div>
            </Drawer>
        </div>
    );
}

export default App;

// $data = Invoke-RestMethod -Uri "http://192.168.44.17:8080/api/odata/FAKTURA" -Method Get
