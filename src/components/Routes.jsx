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
import ResetPassword from 'components/ResetPassword';
import NotFound from 'components/NotFound';
import Admin from 'components/Admin';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/units/new" component={UnitInformation} />
    <Route path="/units/:unitId/edit" component={UnitInformation} />
    <Route path="/units/:unitId" component={Unit} />
    <Route path="/units/" component={UnitList} />
    <Route path="/elections/new/:unitId" component={ElectionForm} />
    <Route path="/elections/:electionId/edit" component={ElectionForm} />
    <Route path="/elections/:electionId" component={Election} />
    <Route path="/election-list" component={ElectionList} />
    <Route path="/candidates/new/:electionId" component={Candidate} />
    <Route path="/candidates/:candidateId" component={Candidate} />
    <Route path="/nominations/:nominationId" component={Nomination} />
    <Route path="/register/:type" component={Register} />
    <Route path="/register/" component={Register} />
    <Route path="/help" component={Help} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/reset-password" component={ResetPassword} />
    <Route path="/admin" component={Admin} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
