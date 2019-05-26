import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Customers from "./Customer/Customers";
import Products from "./Product/Products";
import Stores from "./Store/Stores";
import Sales from "./Sales/Sales";
import Notfound from "./not-found";
import Home from "./home";
import HeaderMenu from "./HeaderMenu";
class Navigation extends React.Component {
  render() {
    return (
      <Router>
        <HeaderMenu
          onItemClick={item => this.onItemClick(item)}
          items={[
            ["React", "/"],
            ["Customers", "/customers"],
            ["Products", "/product"],
            ["Stores", "/stores"],
            ["Sales", "/sales"]
          ]}
          headerIcon={"compass outline"}
        />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/customers" component={Customers} />
          <Route path="/product" component={Products} />
          <Route path="/stores" component={Stores} />
          <Route path="/sales" component={Sales} />

          <Route component={Notfound} />
        </Switch>
      </Router>
    );
  }
}

export default Navigation;
