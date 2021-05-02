import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// a special type of React component that we'll use to provide data to all of the other components
// Apollo's library for using React Hooks functionality with Apollo queries and mutations.
import { ApolloProvider } from '@apollo/react-hooks';
// gets that data when we're ready to use it
import ApolloClient from 'apollo-boost';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

// We have to use an absolute path to the server? The React environment runs at localhost:3000, and the server
// environment runs at localhost:3001. If we just used /graphl, the requests would go to localhost:3000/graphql—
// which isn't the address for the back-end server.
const client = new ApolloClient({
  // To allow this need "proxy": "http://localhost:3001", near top of package.json
  uri: '/graphql'
});


function App() {
  return (
    // We wrap the entire returning JSX code with <ApolloProvider>. Because we're passing the client variable in as the 
    //value for the client prop in the provider, everything between the JSX tags will eventually have access to the 
    // server's API data through the client we set up.
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SingleThought} />

              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
