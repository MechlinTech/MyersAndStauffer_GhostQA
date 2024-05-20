import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Functional from "./Stacks/Functional";
import Api from "./Stacks/Api";
import { Box } from "@material-ui/core";
import EditTestSuite from "../pages/TestSuite/EditTestSuite";
import AddNewEnvironment from "../pages/Settings/Component/ExecutionEnvironment/AddNewEnvironment";
import EditNewEnvironment from "../pages/Settings/Component/ExecutionEnvironment/EditNewEnvironment";
import CircularProgress from "@mui/material/CircularProgress";
import Invitation from "../pages/Invitaion";
import Account from "../pages/Account";
import CreateTestCase from "../pages/TestLab/CreateTestcase";
import EditTestCase from "../pages/TestLab/CreateTestcase/editTestLab";
import Results from "./Stacks/Results";
import Summary from "../pages/Performance/Result/ResultDetails";
import Error from "../pages/Performance/Result/ResultDetails/Error";
import RequestState from "../pages/Performance/Result/ResultDetails/RequestState/RequestState";
import CompareGraph from "../pages/Performance/Component/Compare/CompareGraph";
import InitialSetup from "../pages/Performance/Result/ResultDetails/InitialSetup/index";
import TestCase from "../pages/TestCase";
import Location from "../pages/MainSettings/Component/Performance/Location";
import Integration from "../pages/MainSettings/Component/Performance/Integration";
import ViewAgent from "../pages/MainSettings/Component/Performance/Location/ViewAgent";
import Detail from "../pages/MainSettings/Component/UserAccount/Detail";
import Organization from "../pages/MainSettings/Component/UserAccount/Organization";
import Members from "../pages/MainSettings/Component/Organization/Members";
const Dashboard = lazy(() => import("../pages/Dashboard/"));
const Environment = lazy(() =>
  import("../pages/Settings/Component/ExecutionEnvironment/index")
);
const Application = lazy(() =>
  import("../pages/Settings/Component/Application/index")
);
const Browser = lazy(() => import("../pages/Settings/Component/Browser/index"));
const TestUser = lazy(() => import("../pages/Settings/Component/TestUser"));
const RoleManagement = lazy(() =>
  import("../pages/Settings/Component/RoleManagement/index")
);
const UserManagement = lazy(() =>
  import("../pages/Settings/Component/UserManagement/index")
);
const BasicAccordion = lazy(() => import("../comman/Accordion/index"));
const TestSuitsDetails = lazy(() => import("../pages/TestSuitsDetails"));
const Settings = lazy(() => import("../pages/Settings"));
const AddTestSuite = lazy(() => import("../pages/TestSuite/AddTestSuite"));
const NotFound = lazy(() => import("../pages/NotFound"));
const TestLab = lazy(() => import("../pages/TestLab/TestLab"));
const Performance = lazy(() => import("../pages/Performance/Performance"));
const MainSettings = lazy(() => import("../pages/MainSettings"));

export default function Navigations() {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress sx={{ color: "#654DF7" }} />
        </Box>
      }
    >
      <Routes>
        <Route path="/" element={<Functional />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/check" element={<h1>check</h1>} />
          <Route path="settings" element={<Settings />}>
            <Route path="Environment" element={<Environment />} />
            <Route path="Application" element={<Application />} />
            <Route path="Browser" element={<Browser />} />
            <Route path="Roles" element={<RoleManagement />} />
            <Route path="User" element={<UserManagement />} />
            <Route path="test-user" element={<TestUser />} />
          </Route>
          <Route path="testLab" element={<TestLab />} />
          <Route path="testLab/:nodeId" element={<TestLab />} />
          <Route
            path="testLab/createTestcase/:rootId"
            element={<CreateTestCase />}
          />
          <Route
            // path="testLab/editTestcase/:testCaseName/:testId"
            path="testLab/editTestcase/:testId"
            element={<EditTestCase />}
          />
          <Route path="testcase" element={<TestCase />} />
        </Route>
        <Route path="performance" element={<Performance />}></Route>
        <Route path="/result" element={<Results />}>
          <Route
            path="/result/:rootId/:tab/summary/:runId?"
            element={<Summary />}
          />
          <Route
            path="/result/:rootId/:tab/error/:runId?"
            element={<Error />}
          />
          <Route
            path="/result/:rootId/:tab/initial-setup/:runId?"
            element={<InitialSetup />}
          />
          <Route
            path="/result/:rootId/:tab/request-state/:runId?"
            element={<RequestState />}
          />
        </Route>
        <Route
          path="performance/compare/:compareName"
          element={<CompareGraph />}
        />
        <Route path="api" element={<Api />}>
          <Route
            path=""
            element={
              <Box m={10} component={"h1"}>
                api1
              </Box>
            }
          />
          <Route
            path="api2"
            element={
              <Box m={10} component={"h1"}>
                api2
              </Box>
            }
          />
        </Route>

        <Route path="/accordian" element={<BasicAccordion />} />
        <Route path="/myaccount" element={<Account />} />
        <Route
          path="/test/:testSuiteName/:testRunName"
          element={<TestSuitsDetails />}
        />
        <Route path="/add-suite" element={<AddTestSuite />} />
        <Route
          path="/setting/add-environment"
          element={<AddNewEnvironment />}
        />
        <Route
          path="/setting/edit-environment"
          element={<EditNewEnvironment />}
        />
        <Route path="/edit/:suiteName" element={<EditTestSuite />} />
        <Route path="/AcceptInvitation/:toEmail" element={<Invitation />} />
        <Route path="main-settings" element={<MainSettings />}>
          <Route path="location" element={<Location />} />
          <Route path="view-agent/:id" element={<ViewAgent />} />
          <Route path="integration" element={<Integration />} />
          <Route path="detail" element={<Detail />} />
          <Route path="organization" element={<Organization />} />
          <Route path="members" element={<Members />} />
          <Route path="add-member" element={<Organization />} />

          <Route path="integration" element={<Integration />} />
          {/* <Route path="Application" element={<Application />} /> */}
          <Route
            path="Application/Sub-Application"
            element={<RoleManagement />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
