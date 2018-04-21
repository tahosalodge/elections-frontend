import React from 'react';
import { Route, Switch } from 'react-router-dom';

import UnitImport from './UnitImport';
import CreateUser from './CreateUser';
import UserList from './UserList';
import ExportCandidates from './ExportCandidates';
import NominationApproval from './NominationApproval';

const AdminRoutes = () => (
  <Switch>
    <Route path="/admin/import" component={UnitImport} />
    <Route path="/admin/create-user" component={CreateUser} />
    <Route path="/admin/users" component={UserList} />
    <Route path="/admin/nomination-approval" component={NominationApproval} />
    <Route path="/admin/export-candidates" component={ExportCandidates} />
  </Switch>
);

export default AdminRoutes;
