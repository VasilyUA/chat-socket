import React from "react";
import {BrowserRouter as Routs, Route, Switch} from 'react-router-dom';
import Error from "./components/Error";
import Header from "./components/Header";
import Form from "./components/Form";
import Chat from "./components/Chat";

export default function App() {

    return (
        <Routs>
            <Header/>
            <main>
                <Switch>
                    <Route path="/" exact render={() => <Form title={'Login'}/>}/>
                    <Route path="/registration" exact render={() => <Form title={'Registration'} />}/>
                    <Route path="/chat-list" exact render={() => <Chat/>}/>
                    <Route path="*" exact render={() => <Error/>}/>
                </Switch>
            </main>
        </Routs>
    );
}
