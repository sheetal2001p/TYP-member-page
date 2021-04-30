import react from "react"
import Members from "./Members"
import Admin from "./Admin"
import { Provider } from "react-redux"
import { createStore } from "redux"
import rootReducer from "../Data/index"
import { Route, Switch } from "react-router-dom"
import MemberForm from "./MemberForm"

function App() {
    const store = createStore(rootReducer);
    return (
        <Provider store={store}>
            <Switch>
                <Route exact path="/" component={Members} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/addmember" component={MemberForm} />
            </Switch>
         </Provider>
    )
}

export default App;
