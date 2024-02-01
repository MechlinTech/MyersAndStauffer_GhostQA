import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Functional from "./Stacks/Functional";
import Api from "./Stacks/Api";
import { Box } from "@material-ui/core";
import EditTestSuite from "../pages/TestSuite/EditTestSuite";
import AddNewEnvironment from "../pages/Settings/Component/ExecutionEnvironment/AddNewEnvironment";

const Dashboard = lazy(() => import("../pages/Dashboard/"));
const Environment = lazy(() => import("../pages/Settings/Component/ExecutionEnvironment/index"));
const Application = lazy(() => import("../pages/Settings/Component/Application/index"));
const Browser = lazy(() => import("../pages/Settings/Component/Browser/index"));
const RoleManagement = lazy(() => import("../pages/Settings/Component/RoleManagement/index"));
const UserManagement = lazy(() => import("../pages/Settings/Component/UserManagement/index"));
const BasicAccordion = lazy(() => import("../comman/Accordion/index"));
const TestSuitsDetails = lazy(() => import("../pages/TestSuitsDetails"));
const Settings = lazy(() => import("../pages/Settings"));
const AddTestSuite = lazy(() => import("../pages/TestSuite/AddTestSuite"));
const NotFound = lazy(() => import("../pages/NotFound"));

export default function Navigations() {
  return (
    <Suspense
      fallback={
        <div>
          <h1>LOADING ....</h1>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Functional />} >
          <Route path="/" element={<Dashboard/>} />
          <Route path="settings" element={<Settings/>} >
            <Route path="Environment" element={<Environment/> }/>
            <Route path="Application" element={<Application/>} />
            <Route path="Browser" element={<Browser/>} />
            <Route path="Roles" element={<RoleManagement/>} />
            <Route path="User" element={<UserManagement/>} />
          </Route>
        </Route>
        <Route path="test" element={<Api />} >
          <Route path="" element={<Box m={10} component={'h1'}>api1</Box>} />
          <Route path="api2" element={<Box m={10} component={'h1'}>api2</Box>} />
        </Route>

        <Route path="/accordian" element={<BasicAccordion />} />
        <Route path="/:testSuiteName/:testRunName" element={<TestSuitsDetails />} />
        <Route path="/add-suite" element={<AddTestSuite />} />
        <Route path="/setting/add-environment" element={<AddNewEnvironment/>} />
        <Route path="/edit-suite" element={<EditTestSuite />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}