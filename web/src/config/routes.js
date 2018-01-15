import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "../components/app";
import NotFoundComponent from "../components/common/404-component";
import CategoriesContainer from "../components/categories/categories-container";
import CategoryContainer from "../components/categories/category-container";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={CategoriesContainer} />
    <Route path="categories" component={CategoriesContainer} />
    <Route path="categories/:$key" component={CategoryContainer} />
    <Route path="*" component={NotFoundComponent} />
  </Route>
);
