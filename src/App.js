import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
import './reset.css'
import './App.css'
import Nav            from './components/Nav/Nav'
import Home           from './components/Home/Home'
import Products       from './components/Products/Products'
import AboutUs        from './components/AboutUs/AboutUs'
import Contact        from './components/Contact/Contact'
import Footer         from './components/Footer/Footer'
import CrazyBlanket   from './components/Products/CrazyBlanket/CrazyBlanket'
import BinaryBlanket  from './components/Products/BinaryBlanket/BinaryBlanket'
import SingleBlanket  from './components/Products/SingleBlanket/SingleBlanket'
import HolidayBlanket from './components/Products/HolidayBlanket/HolidayBlanket'
import BabyBlanket    from './components/Products/BabyBlanket/BabyBlanket'
import Journal        from './components/Products/Journal/Journal'
import ProductDetails from './components/Products/ProductMap/ProductDetails/ProductDetails'
import Admin          from './components/Admin/Admin'
import Cart           from './components/Cart/Cart'
import Checkout from './components/Checkout'
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class App extends Component {
  render() {
    return (
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}>
      <frosted-glass-container>
        <div className="app">
          <Nav />
          <Switch>
            <Elements>
              <Route exact path = "/"                                 component={Home}    />
            </Elements>
            <Route exact path = "/products"                         component={Products}/>
            <Route exact path = "/products/:type"                   component={Products}/>
            <Route exact path = "/products/:sku/inverted"           component={ProductDetails}/>
            <Route exact path = "/products/:sku/binary"             component={ProductDetails}/>
            <Route exact path = "/products/:sku/single"             component={ProductDetails}/>
            <Route exact path = "/products/:sku/baby"               component={ProductDetails}/>
            <Route exact path = "/products/:sku/holiday"            component={ProductDetails}/>
            <Route exact path = "/products/:sku/journal"            component={ProductDetails}/>
            <Route       path = "/products/:sku/inverted/customize" component={CrazyBlanket}/>
            <Route       path = "/products/:sku/binary/customize"   component={BinaryBlanket}/>
            <Route       path = "/products/:sku/single/customize"   component={SingleBlanket}/>
            <Route       path = "/products/:sku/baby/customize"     component={BabyBlanket}/>
            <Route       path = "/products/:sku/holiday/customize"  component={HolidayBlanket}/>
            <Route       path = "/products/:sku/journal/customize"  component={Journal}/>
            <Route       path = "/admin"                            component={Admin} />
            <Route       path = "/about"                            component={AboutUs} />
            <Route       path = "/contact"                          component={Contact} />
            <Route       path = "/cart"                             component={Cart} />
            <Route       path = "/checkout"                         component={Checkout} />
          </Switch>
          <Footer />
        </div>
      </frosted-glass-container>
      </StripeProvider>
    );
  }
}

export default App;
