import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from "redux"
import { Provider } from "react-redux"
import reducer from "./store/reducer"
import { BrowserRouter, Route, Switch} from "react-router-dom"
import OffendersList  from './components/OffendersList'
import  OfficersList from './components/OfficersList'
import BaseLayout from './components/BaseLayout';
import { Search } from './components/Search';
import { DrugTest } from './components/DrugTest';
import { DrugTestList } from './components/DrugTestList';
import { Contact } from './components/Contact';
import { ShowContacts } from './components/ShowContacts';
import { setAuthenticationHeader } from "./utils/authenticate";
import requireAuth from "./components/requireauth"
import { Registration } from './components/Registration';
import 'bootstrap/dist/css/bootstrap.min.css';






const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

setAuthenticationHeader(localStorage.getItem("jwt"))
ReactDOM.render( <Provider store={store}>
                    <BrowserRouter>
                        <BaseLayout>
                            <Switch>
                                <Route path="/" exact component={App} />
                                <Route path="/save-offender" component={requireAuth(OffendersList)} />
                                <Route path="/show-officer" component={requireAuth(OfficersList)} />
                                <Route path="/search" component={requireAuth(Search)} />
                                <Route path="/add-drugTest/:offenderId" component={requireAuth(DrugTest)} />
                                <Route path="/show-drugtest/:offenderId" component={requireAuth(DrugTestList)} />
                                <Route path="/add-contact/:offenderId" component={requireAuth(Contact)} />
                                <Route path="/show-contact/:offenderId" component={requireAuth(ShowContacts)} />
                                <Route path="/registration" component={Registration} />
                            </Switch>
                        </BaseLayout>
                     </BrowserRouter>
                </Provider>
        
        , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
