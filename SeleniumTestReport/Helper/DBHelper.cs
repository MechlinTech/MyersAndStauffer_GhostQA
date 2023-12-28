using SeleniumTestReport.DTO_s;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI.WebControls;

namespace SeleniumTestReport.Helper
{
    public class DBHelper
    {
        public DBHelper()
        {
        }

        public static string GetConnectionString()
        {
            return ConfigurationManager.ConnectionStrings["dbConnection"].ConnectionString;
        }

        public string GetDataTestSuits()
        {
            string TestSuites = "";
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetTestSuits", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                TestSuites = reader["TestSuites"].ToString();
                            }
                        }
                    }
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return TestSuites;
        }

        public string GetRunDetails(string TestSuitName)
        {
            string RunDetailsJson = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetRunDetails", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TestSuitName", TestSuitName);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                RunDetailsJson = reader["RunDetailsJson"].ToString();
                            }
                        }
                    }
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return RunDetailsJson;
        }

        public string GetTestCaseDetails(string TestSuitName, string RunID)
        {
            string TestCaseDetailsJson = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetTestCaseDetails", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TestSuiteName", TestSuitName);
                        command.Parameters.AddWithValue("@TestRunId", RunID);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                TestCaseDetailsJson = reader["TestCaseDetailsJson"].ToString();
                            }
                        }
                    }
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return TestCaseDetailsJson;
        }

        internal string GetTestCaseStepsDetails(string testSuitName, string runId, string testCaseName)
        {
            string testCaseStepDetailsJson = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetTestCaseStepsDetails", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TestSuiteName", testSuitName);
                        command.Parameters.AddWithValue("@TestRunName", runId);
                        command.Parameters.AddWithValue("@TestCaseName", testCaseName);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                testCaseStepDetailsJson = reader["TestCaseStepsJson"].ToString();
                            }
                        }
                    }
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return testCaseStepDetailsJson;
        }






















        internal DataTable GetRunTestDetails(string testSuitName, string runId)
        {
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    using (SqlCommand command = new SqlCommand("stp_GetRunDetails", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TestSuitName", testSuitName);
                        command.Parameters.AddWithValue("@TestRunId", runId);
                        connection.Open();
                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            adapter.Fill(dt);
                        }
                    };
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt;
        }





        //internal dynamic GetListFromDataTable(DataTable testSuits)
        //{
        //    List<string> dataList = new List<string>();

        //    foreach (DataRow row in testSuits.Rows)
        //    {
        //        dataList.Add(row[0].ToString());
        //    }
        //    return dataList;

        //}

        //internal List<Dto_TestRunDetails> GetTestRunListFromDataTable(DataTable testRunId)
        //{
        //    List<Dto_TestRunDetails> dataList = new List<Dto_TestRunDetails>();
        //    foreach (DataRow row in testRunId.Rows)
        //    {
        //        Dto_TestRunDetails _RunId = new Dto_TestRunDetails()
        //        {
        //            TestRun = row["TestRunName"].ToString(),
        //            TestCaseName = row["TestCaseName"].ToString(),
        //            TestRunStatus = row["TestCaseStatus"].ToString(),
        //            TestRunVideoURL = row["TestCaseVideoURL"].ToString(),
        //            TestFailureMessage = row["TestFailureMessage"].ToString(),
        //            TestFailureScreenShot = row["TestFailureScreenShot"].ToString(),
        //            TestStartDate = Convert.ToDateTime(row["TestRunStartDateTime"]),
        //            TestEndDate = Convert.ToDateTime(row["TestRunEndDateTime"]),
        //            TestSteps = row["TestCaseSteps"].ToString()
        //        };
        //        dataList.Add(_RunId);
        //    }
        //    return dataList;
        //}

        //internal List<Dto_RunDetailsList> GetModelListFromDataTable(DataTable testRunId)
        //{
        //    List<Dto_RunDetailsList> dataList = new List<Dto_RunDetailsList>();
        //    foreach (DataRow row in testRunId.Rows)
        //    {
        //        Dto_RunDetailsList _RunId = new Dto_RunDetailsList()
        //        {
        //            TestSuiteName = row["TestSuiteName"].ToString(),
        //            RunId = row["TestRunName"].ToString(),
        //            TestRunStatus = row["TestRunStatus"].ToString(),
        //            TotalTestCases = (int)row["TotalTestCases"],
        //            PassedTestCases = (int)row["PassedTestCases"],
        //            FailedTestCases = (int)row["FailedTestCases"],
        //            RunStartDateTime = Convert.ToDateTime(row["TestRunStartDateTime"]),
        //            RunEndDateTime = Convert.ToDateTime(row["TestRunEndDateTime"]),
        //        };
        //        dataList.Add(_RunId);
        //    }
        //    return dataList;
        //}

        //internal Dto_TestDetails GetDetailsListFromDataTable(DataTable testDetails)
        //{
        //    Dto_TestDetails _TestDetails = new Dto_TestDetails();
        //    foreach (DataRow row in testDetails.Rows)
        //    {
        //        _TestDetails.TotalTestCases = (Int32)row["TotalTestCases"];
        //        _TestDetails.PassedTestCases = (Int32)row["PassedTestCases"];
        //        _TestDetails.FailedTestCases = (Int32)row["FailedTestCases"];
        //    }
        //    return _TestDetails;
        //}

        //internal Dto_TestCaseSteps GetTestCaseStepsFromDataTable(DataTable TestCaseSteps)
        //{
        //    Dto_TestCaseSteps _TestCaseSteps = new Dto_TestCaseSteps();
        //    foreach (DataRow row in TestCaseSteps.Rows)
        //    {
        //        _TestCaseSteps.TestCaseName = row["TestCaseName"].ToString();
        //        _TestCaseSteps.TestCaseStartDate = Convert.ToDateTime(row["TestRunStartDateTime"]);
        //        _TestCaseSteps.TestCaseEndDate = Convert.ToDateTime(row["TestRunEndDateTime"]);
        //        _TestCaseSteps.TestCaseSteps = row["TestCaseSteps"].ToString();
        //    }
        //    return _TestCaseSteps;
        //}
    }
}