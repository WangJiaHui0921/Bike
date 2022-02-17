import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import App from "./App"
import { Admin } from "./admin"
import { Login, Detail, Nomatch } from "./pages"
import {
    Buttons,
    Modals,
    Loadings,
    Notices,
    Messages,
    Tabs,
    Gallery,
    Carousels
} from "./pages/ui"
export default class IRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/order/detail" component={Detail} />
                        <Route path="/" render={() =>
                            <Admin>
                                <Route path="/ui/buttons" component={Buttons} />
                                <Route path="/ui/modals" component={Modals} />
                                <Route path="/ui/loadings" component={Loadings} />
                                <Route path="/ui/notification" component={Notices} />
                                <Route path="/ui/messages" component={Messages} />
                                <Route path="/ui/tabs" component={Tabs} />
                                <Route path="/ui/gallery" component={Gallery} />
                                <Route path="/ui/carousel" component={Carousels} />
                                <Route component={Nomatch} />
                            </Admin>
                        } />
                    </Switch>
                </App>
            </BrowserRouter>
        )
    }
}

