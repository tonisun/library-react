import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage';

import { HomePage } from './layouts/HomePage/HomePage';
import { Footer } from './layouts/NavbarFooter/Footer';
import { Navbar } from './layouts/NavbarFooter/Navbar';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'
import { LoginCallback, Security } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';


const oktaAuth = new OktaAuth(oktaConfig)

export const App = () => {

  const history = useHistory()

  const customAuthHandler = () => {
    history.push('/login')
  }

  const restoreOriginalUri = async ( _oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl( originalUri || '/', window.location.origin ))
  }

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security 
        oktaAuth={oktaAuth} 
        restoreOriginalUri={restoreOriginalUri} 
        onAuthRequired={customAuthHandler}
      >
        <Navbar />
        <div className='flex-grow-1'>
          <Switch>

            <Route path={'/'} exact>
              <Redirect to={'/home'} />
            </Route>

            <Route path={'/home'} >
              <HomePage />
            </Route>

            <Route path={'/search'}>
              <SearchBooksPage />
            </Route>

            <Route path={'/checkout'}>
              <BookCheckoutPage />
            </Route>

            <Route path='/login' render={
                () => <LoginWidget config={oktaConfig} />
              } 
            />

            <Route path='/login/callback' component={LoginCallback} />

          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
    
  );
}
