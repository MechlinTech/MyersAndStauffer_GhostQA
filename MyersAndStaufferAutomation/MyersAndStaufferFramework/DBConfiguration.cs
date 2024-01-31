using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;

namespace MyersAndStaufferFramework
{
    public class DBConfiguration
    {
        public static IConfiguration configuration { get; }

        static DBConfiguration()
        {
            configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .Build();
        }

        public static string GetDBConnectionString(string Key)
        {
            return configuration[Key];
        }

        public static void SaveTestCaseData(string testData)
        {
            try
            {
                string connectionString = GetDBConnectionString("AppSettings:ConnectionString");
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("stp_UpsertTableData", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    connection.Open();
                    cmd.Parameters.AddWithValue("@DynamicObject", testData);
                    cmd.Parameters.AddWithValue("@TableName", "tbl_TestCase");
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static void UpdateTestStepsJson(string testStepJson, string testSuite, string testRun, string testCase)
        {
            try
            {
                string connectionString = GetDBConnectionString("AppSettings:ConnectionString");
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("stp_UpdateTestStepData", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    connection.Open();
                    cmd.Parameters.AddWithValue("@testStepJson", testStepJson);
                    cmd.Parameters.AddWithValue("@testSuite", testSuite);
                    cmd.Parameters.AddWithValue("@testRun", testRun);
                    cmd.Parameters.AddWithValue("@testCase", testCase);
                    cmd.Parameters.AddWithValue("@TableName", "tbl_TestCase");
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static string GetRunId(string testSuite)
        {
            string TestRunName = "";
            try
            {
                string connectionString = GetDBConnectionString("AppSettings:ConnectionString");
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("stp_GetRunId", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    connection.Open();
                    SqlParameter sqlParameter = cmd.Parameters.AddWithValue("@TestSuite", testSuite);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            // Access data from the result set
                            TestRunName = reader["TestRunName"].ToString();
                        }
                    }
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                TestRunName = "Error";
                throw ex;
            }
            return TestRunName;
        }
    }
}