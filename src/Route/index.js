import { Switch, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Home from '../pages/Landingpage'
import Searchpage from '../pages/Searchpage'
import Guard from './guard'

const Router =()=>{
    return(
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/login" exact render={(props)=>(<Login  {...props}/>)}/>
        <Route path="/signup" exact render={(props)=>(<Signup  {...props}/>)}/>
        <Guard path="/searchpage" exact component={Searchpage}/>
        <Guard path="" exact component=""/>
        <Route>
          404 NOT FOUND
        </Route>
      </Switch>
    )
}

export default Router