import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from "redux"
import { Provider } from "react-redux"
import reducer from "./store/reducer"
import { BrowserRouter, Route, Switch} from "react-router-dom"
import {OffendersList } from './components/OffendersList'
import  OfficersList from './components/OfficersList'
import { BaseLayout } from './components/BaseLayout';
import { Search } from './components/Search';

const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
ReactDOM.render( <Provider store={store}>
                    <BrowserRouter>
                        <BaseLayout>
                            <Switch>
                                <Route path="/" exact component={App} />
                                <Route path="/save-offender" component={OffendersList} />
                                <Route path="/show-officer" component={OfficersList} />
                                <Route path="/search" component={Search} />

                            </Switch>
                        </BaseLayout>
                     </BrowserRouter>
                </Provider>
        
        , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
