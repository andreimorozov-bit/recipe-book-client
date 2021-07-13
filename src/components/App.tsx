import React from 'react';
import { BrowserRouter, Route, Switch, useParams } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './ui/theme';
import Button from '@material-ui/core/Button';
import { Header } from './ui/Header';
import { NewRecipePage } from '../pages/NewRecipe';
import { RecipeDetailPage } from '../pages/RecipeDetail';
import { RecipesListPage } from '../pages/RecipesList';
import { SignUpPage } from '../pages/SignUp';
import { SignInPage } from '../pages/SignIn';
import { HomePage } from '../pages/Home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path='/newrecipe'>
            <NewRecipePage />
          </Route>
          <Route path='/' exact>
            <HomePage />
          </Route>
          <Route path='/recipes' exact>
            <RecipesListPage />
          </Route>
          <Route path='/recipes/:id'>
            <RecipeDetailPage />
          </Route>
          <Route path='/signin/google' exact>
            <Button variant='contained' color='secondary'>
              Sign In with google Page
            </Button>
          </Route>
          <Route path='/signin/email' exact>
            <SignInPage />
          </Route>
          <Route path='/signup/email' exact>
            <SignUpPage />
          </Route>
          <Route path='/signout' exact>
            <Button variant='contained' color='secondary'>
              Sign Out Page
            </Button>
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
