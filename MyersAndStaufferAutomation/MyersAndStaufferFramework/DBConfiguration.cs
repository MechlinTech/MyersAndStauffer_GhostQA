using Microsoft.Extensions.Configuration;
using Org.BouncyCastle.Ocsp;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Text;
using System.Text.Json;

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

        private static string GetDBConnectionString(string Key)
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
                    SqlParameter sqlParameter = cmd.Parameters.AddWithValue("@DynamicObject", testData);
                    cmd.Parameters.AddWithValue("@TableName", "tbl_TestCase");
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private static string ConvertObjectIntoJson(TestData testData)
        {
            return JsonSerializer.Serialize(testData);
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
