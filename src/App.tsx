import { useMemo, useState, useCallback } from 'react';
import 'devextreme/dist/css/dx.fluent.blue.light.css';
import { Drawer } from 'devextreme-react';
import { Toolbar, Item } from "devextreme-react/toolbar";
import List from "devextreme-react/list";
import { Link, Routes, Route } from "react-router-dom";
import FormView from './components/views/FormView';
import InvoicesView from './components/views/InvoicesView';

import {
    Popup
} from 'devextreme-react/popup';
import logo from "./assets/images/JS_logo.jpg";
import { Button } from 'devextreme-react/button';


const navigation = [
    { id: 1, text: "Faktury", icon: "message", path: "components/views/InvoicesView" },
    { id: 2, text: "Formulář", icon: "check", path: "components/views/FormView" }
];

const renderContent = () =>  {
    return (
        <>
            <img src={logo} alt="logo" width={100} height={100} />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Penatibus et magnis dis parturient. Eget
                dolor morbi non arcu risus. Tristique magna sit amet
                purus gravida quis blandit. Auctor urna nunc id cursus
                metus aliquam eleifend mi in. Tellus orci ac auctor
                augue mauris augue neque gravida. Nullam vehicula ipsum
                a arcu. Nullam ac tortor vitae purus faucibus ornare
                suspendisse sed nisi. Cursus in hac habitasse platea
                dictumst. Egestas dui id ornare arcu. Dictumst
                vestibulum rhoncus est pellentesque elit ullamcorper
                dignissim.
            </p>
            <p>
                Mauris rhoncus aenean vel elit scelerisque mauris
                pellentesque pulvinar. Neque volutpat ac tincidunt vitae
                semper quis lectus. Sed sed risus pretium quam vulputate
                dignissim suspendisse in. Urna nec tincidunt praesent
                semper feugiat nibh sed pulvinar. Ultricies lacus sed
                turpis tincidunt id aliquet risus feugiat. Amet cursus
                sit amet dictum sit amet justo donec enim. Vestibulum
                rhoncus est pellentesque elit ullamcorper. Id aliquet
                risus feugiat in ante metus dictum at.
            </p>
        </>            
    );
}

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

    const [isPopupVisible, setIsPopupVisible] = useState(true);
    const togglePopupVisibility = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    return (
        <div style={{height: '150vh'}}>
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

            <Popup
                contentRender={renderContent}
                visible={isPopupVisible}
                hideOnOutsideClick={true}
                onHiding={togglePopupVisibility}
                showTitle={true}
                title='Testovací okénko'
                resizeEnabled={true}
                defaultHeight={300}
                defaultWidth={400} />
            <Button
                text='Open popup'
                onClick={togglePopupVisibility} />
        </div>
    );
}

export default App;

// $data = Invoke-RestMethod -Uri "http://192.168.44.17:8080/api/odata/FAKTURA" -Method Get
