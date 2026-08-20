import React, { useState, useMemo, useCallback } from "react";
import { Drawer } from "devextreme-react/drawer";
import { Toolbar, Item } from "devextreme-react/toolbar";
import { Routes, Route } from 'react-router-dom'; 
 
import NavigationList from "./NavigationList";
import Inbox from "./views/Inbox";
import Trash from "./views/Trash";
import SentMail from "./views/SentMail";
import Spam from "./views/Spam";

function NavigationDrawer() {
    const [isOpened, setState] = useState(false);
    const buttonOptions = useMemo(() => {
        return {
            icon: "menu",
            onClick: () => {
                setState(!isOpened);
            }
        };
    }, [isOpened]);

    const renderList = useCallback(() => {
        const stateHandler = (newState: boolean | ((prevState: boolean) => boolean)) => setState(newState);
        return (
            <NavigationList stateHandler={stateHandler} />
        );
    }, []);

    return (
        <div>
            <Toolbar id="toolbar">
                <Item 
                    widget="dxButton" 
                    options={buttonOptions} 
                    location="before" />
            </Toolbar>
            <Drawer
                opened={isOpened}
                render={renderList}>
                <div id="view">
                    <Routes>
                        <Route path="views/inbox" element={<Inbox />} />
                        <Route path="views/sent-mail" element={<SentMail />} />
                        <Route path="views/spam" element={<Spam />} />
                        <Route path="views/trash" element={<Trash />} />
                    </Routes>
                </div>
            </Drawer>
        </div>
    );
}

export default NavigationDrawer;
