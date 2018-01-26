import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'components/Home';
import UnitInformation from 'components/Forms/UnitInformation';
import Unit from 'components/Unit';
import UnitList from 'components/UnitList';
import ElectionForm from 'components/Forms/Election';
import Candidate from 'components/Forms/Candidate';
import Nomination from 'components/Forms/Nomination';
import ElectionList from 'components/ElectionList';
import Election from 'components/Election';
import Register from 'components/Forms/Register';
import Login from 'components/Forms/Login';
import Help from 'components/Help';
import Logout from 'components/Logout';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/units/new" component={UnitInformation} />
    <Route path="/units/:unitId/edit" component={UnitInformation} />
    <Route path="/units/:unitId" component={Unit} />
    <Route path="/units/" component={UnitList} />
    <Route path="/elections/new" component={ElectionForm} />
    <Route path="/candidate" component={Candidate} />
    <Route path="/nomination" component={Nomination} />
    <Route path="/elections/:electionId/edit" component={ElectionForm} />
    <Route path="/elections/:electionId" component={Election} />
    <Route path="/election-list" component={ElectionList} />
    <Route path="/register/:type" component={Register} />
    <Route path="/register/" component={Register} />
    <Route path="/help" component={Help} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
  </Switch>
);

export default Routes;
