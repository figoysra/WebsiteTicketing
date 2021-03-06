import { Switch, Route } from 'react-router-dom'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Home from '../pages/LandingPage'
import SearchPage from '../pages/SearchPage'
import FlightDetail from '../pages/Flightdetails'
import MyBooking from '../pages/Mybooking'
import Dashboard from '../pages/Dashboard'
import Guard from './Guard'

const Router =()=>{
    return(
      <Switch>
        
        <Route path="/" exact>
          <Home/>
        </Route>
        
        <Route path="/searchpage" exact>
          <SearchPage/>
        </Route>
        
        <Route path="/login" render={(props)=>(<Login  {...props}/>)}/>
        
        <Route path="/signup" render={(props)=>(<SignUp  {...props}/>)}/>
        
        <Guard path="/dashboard" component={Dashboard}/>
        
        <Guard path="/mybooking" component={MyBooking}/>
        
        <Guard path="/flightdetail/:idTicket" component={FlightDetail }/>
        
        <Route>
          404 NOT FOUND
        </Route>

      </Switch>
    )
}

export default Router