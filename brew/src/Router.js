import React, { Component, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch
} from 'react-router-dom';
import './index.css';
import Page404 from './Pages/Page404/Page404';

const App = lazy(() => import('./Pages/Main/App'));
const Editor = lazy(() => import('./Pages/Editor/Editor'));
// const Login = lazy(() => import('./Pages/Login/Login'));

const ScrollToTop = function ScrollToTop() {
  // eslint-disable-next-line no-undef
  window.scrollTo({
    top: 0,
    behavior: 'instant'
  });

  return null;
};

const routes = [
  {
    path: '/editor',
    Component: Editor
  },
  // {
  //   path: '/login',
  //   Component: Login
  // }
];

const AppRouter = class AppRouter extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Suspense fallback={<div />}>
          {' '}
          {/* Заглушка пока грузится бандл и стили */}
          <Route component={ScrollToTop} />
          <Switch>
            <Route exact path="/">
              <App />
            </Route>

            {routes.map(({ path }) => {
              return (
                <Route path={`${path}/:NotFound`} key={Math.random()}>
                  <Redirect to="/404" />
                </Route>
              );
            })}
            {routes.map(({
              path,
              Component
            }) => (
              <Route key={path} exact path={path}>
                {() => {
                  return (
                    <Component />
                  );
                }}
              </Route>
            ))}

            <Route component={Page404} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
};

export default AppRouter;
