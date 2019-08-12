import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
import './reset.css'
import './App.css'
import Nav            from './components/Nav/Nav'
import Home           from './components/Home/Home'
import Products       from './components/Products/Products'
import ProductCategories from './components/Nav/ProductCategories/ProductCategories'
import AboutUs        from './components/AboutUs/AboutUs'
import Contact        from './components/Contact/Contact'
import Footer         from './components/Footer/Footer'
import CrazyBlanket   from './components/Products/CrazyBlanket/CrazyBlanket'
import BinaryBlanket  from './components/Products/BinaryBlanket/BinaryBlanket'
import SingleBlanket  from './components/Products/SingleBlanket/SingleBlanket'
import CrazyPrint     from './components/Products/CrazyPrint/CrazyPrint'
import BinaryPrint    from './components/Products/BinaryPrint/BinaryPrint'
import SinglePrint    from './components/Products/SinglePrint/SinglePrint'
import BabyBlanket    from './components/Products/BabyBlanket/BabyBlanket'
import Journal        from './components/Products/Journal/Journal'
import ProductDetails from './components/Products/ProductMap/ProductDetails/ProductDetails'
import Admin          from './components/Admin/Admin'
import MissionaryJournalSelector from './components/MissionaryJournalSelector/MissionaryJournalSelector'
import Cart           from './components/Cart/Cart'
import Checkout       from './components/Cart/Checkout/Checkout'

class App extends Component {
  render() {
    return (
      <frosted-glass-container>
        <div className="app">
          <Nav />
            <Switch>
              <Route exact path = "/"                                     component={Home}    />
              <Route exact path = "/products"                             component={Products}/>
              <Route exact path = "/products/categories"                  component={ProductCategories}/>
              <Route       path = "/products/:type"                       component={Products}/>
              <Route exact path = "/product/:sku/inverted"                component={ProductDetails}/>
              <Route exact path = "/product/:sku/binary"                  component={ProductDetails}/>
              <Route exact path = "/product/:sku/single"                  component={ProductDetails}/>
              <Route exact path = "/product/:sku/printInverted"           component={ProductDetails}/>
              <Route exact path = "/product/:sku/printBinary"             component={ProductDetails}/>
              <Route exact path = "/product/:sku/printSingle"             component={ProductDetails}/>
              <Route exact path = "/product/:sku/baby"                    component={ProductDetails}/>
              <Route exact path = "/product/:sku/holiday"                 component={ProductDetails}/>
              <Route exact path = "/product/:sku/journal"                 component={ProductDetails}/>
              <Route       path = "/product/:sku/inverted/customize/:color"      component={CrazyBlanket}/>
              <Route       path = "/product/:sku/binary/customize/:color"        component={BinaryBlanket}/>
              <Route       path = "/product/:sku/single/customize/:color"        component={SingleBlanket}/>
              <Route       path = "/product/:sku/printInverted/customize/:color" component={CrazyPrint}/>
              <Route       path = "/product/:sku/printBinary/customize/:color"   component={BinaryPrint}/>
              <Route       path = "/product/:sku/printSingle/customize/:color"   component={SinglePrint}/>
              <Route       path = "/product/:sku/baby/customize"          component={BabyBlanket}/>
              <Route       path = "/product/:sku/holiday/customize"       component={Journal}/>
              <Route       path = "/product/:sku/journal/customize"       component={Journal}/>
              <Route       path = "/admin"                                component={Admin} />
              <Route       path = "/missionaryJournalSelector"            component={MissionaryJournalSelector} />
              <Route       path = "/about"                                component={AboutUs} />
              <Route       path = "/contact"                              component={Contact} />
              <Route       path = "/cart"                                 component={Cart} />
              <Route       path = "/checkout"                             component={Checkout} />
            </Switch>
          <Footer />
        </div>
      </frosted-glass-container>
    );
  }
}

export default App;
