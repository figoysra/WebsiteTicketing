/* eslint-disable react/react-in-jsx-scope */
import {Switch, Route} from "react-router"
import Home from "../Pages/Home"

const Router = () =>{
    return(
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
           
        </Switch>
    )
}

export default Router