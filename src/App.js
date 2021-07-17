import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from './components/NotFound';
import Layout from './layout';
import store from './store'
import { Provider } from 'react-redux';

// Компоненты accounts
import Login from './pages/Accounts/Login';
import Register from './pages/Accounts/Register';
import Activate from './pages/Accounts/Activate';
import PasswordResetConfirm from './pages/Accounts/PasswordResetConfirm';
import PasswordReset from './pages/Accounts/PasswordReset';

// Компоненты dashboard
import Main from './pages/Dashboard';
import Overview from './pages/Dashboard/Overview';
import Products from './pages/Dashboard/Products';
import Activities from './pages/Dashboard/Activities';
import Information from './pages/Dashboard/Information';
import Message from './pages/Dashboard/Message';
import Settings from './pages/Dashboard/Settings';
import Notification from './pages/Dashboard/Notification';

// Компоненты продукт
import Detail from './pages/Dashboard/productComponents/Detail';
import Edit from './pages/Dashboard/productComponents/Edit';
import Create from './pages/Dashboard/productComponents/Create';


function App() {
  return (
    <Provider store={store}>
      <Router>
            <Layout>
              <Switch>
                {/* Dashboard */}
                <Route exact path='/'><Main><Overview /></Main></Route>
                <Route exact path='/products'><Main><Products /></Main></Route>
                <Route exact path='/activities'><Main><Activities /></Main></Route>
                <Route exact path='/reviews'><Main><Notification /></Main></Route>
                <Route exact path='/message'><Main><Message /></Main></Route>
                <Route exact path='/profile'><Main><Information /></Main></Route>
                <Route exact path='/settings'><Main><Settings /></Main></Route>
                
                {/* Products */}
                <Route exact path='/product/create'><Main><Create /></Main></Route>
                <Route exact path='/product/:owner/:isbn_code'><Main><Detail /></Main></Route>
                <Route exact path='/product/:owner/:isbn_code/edit'><Main><Edit /></Main></Route>

                {/* Accounts */}
                <Route exact path="/accounts/login" component={Login} />
                <Route exact path="/accounts/password/reset" component={PasswordReset} />
                <Route exact path='/password/reset/confirm/:uid/:token' component={PasswordResetConfirm} />
                <Route exact path="/accounts/register" component={Register} />
                <Route exact path='/activate/:uid/:token' component={Activate} />

                {/* Page not found */}
                <Route exact component={NotFound}/>
              </Switch>
            </Layout>
      </Router>
    </Provider>
  );
}

export default App;
