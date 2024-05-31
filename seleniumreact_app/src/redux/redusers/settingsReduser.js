import {
  GET_TEST_SUITS,
  GET_USER_LIST,
  GET_PERFORMANCE_INTEGRATION,
  JIRA_ISSUE_TYPES,
  JIRA_PROJECT_LIST,
  GET_ALL_JIRA_ISSUE
} from "../actions/settingAction";

const initialState = {
  testSuitsList: [],
  virtualUser: 0,
  totalLocation: 0,
  testUserList: [],
  performanceIntegration: [],
  jiraIssueTypes: [],
  jiraProjectList: [],
  jiraIssueList: []
};

const settingsReduser = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEST_SUITS: {
      return {
        ...state,
        testSuitsList: action.payload,
      };
    }
    case GET_USER_LIST: {
      return {
        ...state,
        testUserList: action.payload,
      };
    }
    case GET_PERFORMANCE_INTEGRATION: {
      return {
        ...state,
        performanceIntegration: action.payload,
      };
    }
    case JIRA_ISSUE_TYPES: {
      const transformedArray = action.payload?.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      return {
        ...state,
        jiraIssueTypes: transformedArray,
      };
    }
    case JIRA_PROJECT_LIST: {
      const transformedArray = action.payload?.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      return {
        ...state,
        jiraProjectList: transformedArray,
      };
    }
    case GET_ALL_JIRA_ISSUE: {
      return {
        ...state,
        jiraIssueList: action.payload,
      };
    }
    default:
      return state;
  }
};
export default settingsReduser;
