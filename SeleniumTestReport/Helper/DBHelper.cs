using SeleniumTestReport.DTO_s;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

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

        internal List<dto_RunId> GetModelListFromDataTable(DataTable testRunId)
        {
            List<dto_RunId> dataList = new List<dto_RunId>();
            foreach (DataRow row in testRunId.Rows)
            {
                dto_RunId _RunId = new dto_RunId()
                {
                    TestSuiteName = row["TestSuiteName"].ToString(),
                    RunId = row["Runid"].ToString(),
                    RunDateTime = Convert.ToDateTime(row["StartDate"]).ToString("MMMM dd"),
                };
                dataList.Add(_RunId);
            }
            return dataList;
        }

        internal dto_TestDetails GetDetailsListFromDataTable(DataTable testDetails)
        {
            dto_TestDetails _TestDetails = new dto_TestDetails();
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