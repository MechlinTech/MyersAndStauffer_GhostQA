import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Functional from "./Stacks/Functional";
import Api from "./Stacks/Api";
import { Box } from "@material-ui/core";
import EditTestSuite from "../pages/TestSuite/EditTestSuite";
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
import Location from "../pages/Settings/Component/Performance/Location";
import ViewAgent from "../pages/Settings/Component/Performance/Location/ViewAgent";
import Detail from "../pages/Settings/Component/UserAccount/Detail";
import Organization from "../pages/Settings/Component/UserAccount/Organization";
import Members from "../pages/Settings/Component/Organization/Members";
import TestLabSuitsDetails from "../pages/TestLab/Result/TestSuitsDetails/index";
import Integration from "../pages/Settings/Component/Functional-Local-Testing/Integration";
const Dashboard = lazy(() => import("../pages/Dashboard/"));
const LocalTesting = lazy(() => import("../pages/LocalTesting"))
const Environment = lazy(() => import("../pages/Settings/Component/Functional-Local-Testing/ExecutionEnvironment/index"));
const Application = lazy(() => import( "../pages/Settings/Component/Functional-Local-Testing/Application/index"));
const Browser = lazy(() => import("../pages/Settings/Component/Functional-Local-Testing/Browser/index")
);
const TestUser = lazy(() =>
  import("../pages/Settings/Component/Functional-Local-Testing/TestUser/index")
);
const EnvironmentTestLab = lazy(() =>
  import(
    "../pages/Settings/Component/Functional-Test-Lab/ExecutionEnvironment/index"
  )
);
const ApplicationTestLab = lazy(() =>
  import("../pages/Settings/Component/Functional-Test-Lab/Application/index")
);
const BrowserTestLab = lazy(() =>
  import("../pages/Settings/Component/Functional-Test-Lab/Browser/index")
);
const TestUserTestLab = lazy(() =>
  import("../pages/Settings/Component/Functional-Test-Lab/TestUser/index")
);
const BasicAccordion = lazy(() => import("../comman/Accordion/index"));
const TestSuitsDetails = lazy(() => import("../pages/TestSuitsDetails"));
const AddTestSuite = lazy(() => import("../pages/TestSuite/AddTestSuite"));

const NotFound = lazy(() => import("../pages/NotFound"));
const TestLab = lazy(() => import("../pages/TestLab/TestLab"));
const Performance = lazy(() => import("../pages/Performance/Performance"));
const MainSettings = lazy(() => import("../pages/Settings"));

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
          <Route path="testLab" element={<TestLab />} />
          <Route path="local-testing" element={<LocalTesting />} />
          <Route path="testLab/:nodeId" element={<TestLab />} />
          <Route
            path="testLab/createTestcase/:rootId"
            element={<CreateTestCase />}
          />
          <Route
            path="testLab/editTestcase/:testId"
            element={<EditTestCase />}
          />
          <Route path="testcase" element={<TestCase />} />
        </Route>
        <Route
          path="testLab-detail/:testSuiteName/:testRunId"
          element={<TestLabSuitsDetails />}
        />
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
        <Route path="/edit/:suiteName" element={<EditTestSuite />} />
        <Route path="/AcceptInvitation/:toEmail" element={<Invitation />} />
        <Route path="settings" element={<MainSettings />}>
          <Route path="location" element={<Location />} />
          <Route path="view-agent/:id" element={<ViewAgent />} />

          <Route path="detail" element={<Detail />} />
          <Route path="organization" element={<Organization />} />
          <Route path="members" element={<Members />} />
          <Route path="add-member" element={<Organization />} />

          {/* Funcational Local Testing Routes */}
          <Route path="environment" element={<Environment />} />
          <Route path="browser" element={<Browser />} />
          <Route path="application" element={<Application />} />
          <Route path="test-user" element={<TestUser />} />
          <Route path="integration" element={<Integration />} />

          {/* Funcational Test-Lab Routes */}
          <Route path="test-lab-environment" element={<EnvironmentTestLab />} />
          <Route path="test-lab-browser" element={<BrowserTestLab />} />
          <Route path="test-lab-application" element={<ApplicationTestLab />} />
          <Route path="test-lab-test-user" element={<TestUserTestLab />} />

          <Route path="on-prem/integration" element={<h1>Integration</h1>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
