import { useMemo, useState, useCallback, useEffect } from 'react';
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
import X8CertificateRedesign from './components/views/X8CertificateRedesign/X8CertificateRedesignView';


const navigation = [
    { id: 1, text: "Faktury", icon: "message", path: "components/views/InvoicesView" },
    { id: 2, text: "Formulář", icon: "check", path: "components/views/FormView" },
    { id: 3, text: "X8 Redesign dokladu", icon: "money", path: "components/views/X8CertificateRedesign/X8CertificateRedesignView" }
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

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    useEffect(() => {
        const handleError = (message: string) => {
            setErrorMessage(message);
        };

        const originalConsoleError = console.error;
        console.error = (...args: any[]) => {
            originalConsoleError.apply(console, args);
            const formattedMessage = args
                .map(arg => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))
                .join(' ');
            handleError(formattedMessage);
        };

        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            try {
                const response = await originalFetch(...args);
                if (!response.ok) {
                    // Pokud server vrátí status 400+, načteme text chyby
                    const errorText = await response.clone().text().catch(() => '');
                    const url = typeof args[0] === 'string' ? args[0] : (args[0] as Request).url;
                    handleError(`HTTP Chyba ${response.status} (${response.statusText})\nURL: ${url}\n${errorText}`);
                }
                return response;
            } catch (error: any) {
                handleError(`Síťová chyba (Fetch failed): ${error.message || error}`);
                throw error;
            }
        };

        const originalXhrOpen = XMLHttpRequest.prototype.open;
        const originalXhrSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function (method: string, url: string | URL, ...rest: any[]) {
            (this as any)._url = url.toString();
            (this as any)._method = method;
            return originalXhrOpen.apply(this, [method, url, ...rest] as any);
        };

        XMLHttpRequest.prototype.send = function (...args: any[]) {
            this.addEventListener('load', function () {
                if (this.status >= 400) {
                    const url = (this as any)._url || '';
                    handleError(`HTTP Chyba ${this.status} (${this.statusText})\nURL: ${url}\n${this.responseText}`);
                }
            });
            return originalXhrSend.apply(this, args);
        };

        const handleWindowError = (event: ErrorEvent) => {
            handleError(event.message || 'Neznámá chyba aplikace');
        };
        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
            const reason = event.reason;
            const message = reason instanceof Error ? reason.message : String(reason);
            handleError(`Asynchronní chyba: ${message}`);
        };

        window.addEventListener('error', handleWindowError);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        return () => {
            console.error = originalConsoleError;
            window.fetch = originalFetch;
            XMLHttpRequest.prototype.open = originalXhrOpen;
            XMLHttpRequest.prototype.send = originalXhrSend;
            window.removeEventListener('error', handleWindowError);
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        };
    }, []);
    
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

    const [isPopupVisible, setIsPopupVisible] = useState(false);
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
                        <Route
                            path='components/views/InvoicesView'
                            element={<InvoicesView />}
                        />
                        <Route
                            path='components/views/FormView'
                            element={<FormView />}
                        />
                        <Route
                            path='components/views/X8CertificateRedesign/X8CertificateRedesignView'
                            element={<X8CertificateRedesign />}
                        />
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

            <Popup
                visible={Boolean(errorMessage)}
                onHiding={() => setErrorMessage(null)}
                hideOnOutsideClick={true}
                showTitle={true}
                title='Chyba v aplikaci'
                width={450}
                height="auto"
                wrapperAttr={{ style: { baseZIndex: 999} }}
            >
                <div style={{ padding: '10px', color: '#d9534f' }}>
                    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'monospace' }}>
                        {errorMessage}
                    </pre>
                </div>
            </Popup>
        </div>
    );
}

export default App;

// $data = Invoke-RestMethod -Uri "http://192.168.44.17:8080/api/odata/FAKTURA" -Method Get
