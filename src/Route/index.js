import { Switch, Route } from 'react-router-dom'
import Login from '../pages/login'
import Signup from '../pages/signup'
import Landing from '../pages/landingpage'
import Searchpage from '../pages/searchpage'
import Guard from './guard'

const Router =()=>{
    return(
      <Switch>
        <Route path="/" exact>
          <Landing/>
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