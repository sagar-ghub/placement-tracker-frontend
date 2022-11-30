import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";

import { slide as Menu } from "react-burger-menu";
import Sidebar from "./components/Sidebar";
import Company from "./components/Company";
import Student from "./components/Student";
import CompanyDetails from "./components/CompanyDetails";
import StudentDetails from "./components/StudentDetails";
import { useState } from "react";
import AddCompany from "./components/company/AddCompany";

function App() {
  const [isLoading, setLoading] = useState(true);
  return (
    <div className="App">
      <Router>
        <Sidebar />

        <div className="app_container">
          <Switch>
            <Route path="/" exact>
              <Home setLoading={setLoading} />
            </Route>
            <Route path="/company" exact>
              <Company isLoading={isLoading} setLoading={setLoading} />
            </Route>
            <Route path="/students" exact>
              <Student isLoading={isLoading} setLoading={setLoading} />
            </Route>
            <Route path="/addcompany" exact>
              <AddCompany isLoading={isLoading} setLoading={setLoading} />
            </Route>
            <Route path="/company/:id" exact>
              <CompanyDetails isLoading={isLoading} setLoading={setLoading} />
            </Route>

            <Route path="/student/:id">
              <StudentDetails isLoading={isLoading} setLoading={setLoading} />
            </Route>
            {/* <Route path="/about" exact component={About} />
        <Route path="/contact" exact component={Contact} /> */}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
