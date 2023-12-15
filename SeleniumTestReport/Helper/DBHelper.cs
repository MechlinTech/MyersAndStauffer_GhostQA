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

        public DataTable GetDataTestSuits()
        {
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    using (SqlCommand command = new SqlCommand("stp_GetTestSuits", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        connection.Open();
                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            adapter.Fill(dt);
                        }
                        connection.Close();
                    };
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt;
        }

        public DataTable GetDataRunIDs(string TestSuitName)
        {
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    using (SqlCommand command = new SqlCommand("stp_GetRunIDs", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TestSuitName", TestSuitName);
                        connection.Open();
                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            adapter.Fill(dt);
                        }
                        connection.Close();
                    };
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt;
        }

        internal DataTable GetRunIdDetails(string testSuitName, string runId)
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

        public DataTable GetTestCaseDetails(string TestSuitName, string RunID)
        {
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    using (SqlCommand command = new SqlCommand("stp_GetTestCaseDetails", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TestSuitName", TestSuitName);
                        command.Parameters.AddWithValue("@TestRunId", RunID);
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

        internal dynamic GetListFromDataTable(DataTable testSuits)
        {
            List<string> dataList = new List<string>();

            foreach (DataRow row in testSuits.Rows)
            {
                dataList.Add(row[0].ToString());
            }
            return dataList;

        }

        internal List<Dto_TestRunDetails> GetTestRunListFromDataTable(DataTable testRunId)
        {
            List<Dto_TestRunDetails> dataList = new List<Dto_TestRunDetails>();
            foreach (DataRow row in testRunId.Rows)
            {
                Dto_TestRunDetails _RunId = new Dto_TestRunDetails()
                {
                    TestRun = row["TestRunName"].ToString(),
                    TestCaseName = row["TestCaseName"].ToString(),
                    TestRunStatus = row["TestCaseStatus"].ToString(),
                    TestFailureMessage = row["TestFailureMessage"].ToString(),
                    TestFailureScreenShot = row["TestFailureScreenShot"].ToString(),
                    TestStartDate = Convert.ToDateTime(row["TestRunStartDateTime"]).ToString("MM/dd/yyyy hh:mm:ss tt"),
                    TestEndDate = Convert.ToDateTime(row["TestRunEndDateTime"]).ToString("MM/dd/yyyy hh:mm:ss tt"),
                    TestSteps = row["TestCaseSteps"].ToString()
                };
                dataList.Add(_RunId);
            }
            return dataList;
        }

        internal List<Dto_RunId> GetModelListFromDataTable(DataTable testRunId)
        {
            List<Dto_RunId> dataList = new List<Dto_RunId>();
            foreach (DataRow row in testRunId.Rows)
            {
                Dto_RunId _RunId = new Dto_RunId()
                {
                    TestSuiteName = row["TestSuiteName"].ToString(),
                    RunId = row["TestRunName"].ToString(),
                    RunDateTime = Convert.ToDateTime(row["TestRunStartDateTime"]).ToString("MMMM dd"),
                };
                dataList.Add(_RunId);
            }
            return dataList;
        }

        internal Dto_TestDetails GetDetailsListFromDataTable(DataTable testDetails)
        {
            Dto_TestDetails _TestDetails = new Dto_TestDetails();
            foreach (DataRow row in testDetails.Rows)
            {
                _TestDetails.TotalTestCases = (Int32)row["TotalTestCases"];
                _TestDetails.PassedTestCases = (Int32)row["PassedTestCases"];
                _TestDetails.FailedTestCases = (Int32)row["FailedTestCases"];
            }
            return _TestDetails;
        }


    }
}