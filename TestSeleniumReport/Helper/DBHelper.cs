using Microsoft.CodeAnalysis;
using MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile;
using System.Data;
using System.Data.SqlClient;
using TestSeleniumReport.DTO_s;
using TestSeleniumReport.Models;
using Environments = TestSeleniumReport.Models.Environments;

namespace SeleniumTestReport.Helper
{
    public class DBHelper
    {
        private readonly IConfiguration _configuration;
        private readonly TestExecutor _testExecutor;
        public DBHelper(IConfiguration configuration, TestExecutor testExecutor)
        {
            _configuration = configuration;
            _testExecutor = testExecutor;
        }

        public string GetConnectionString(string Key)
        {
            return _configuration.GetConnectionString(Key);
        }

        public string GetDataTestSuits()
        {
            string TestSuites = "";
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString("AppDBContextConnection")))
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

        internal string GetDashboardDetails(string testSuitName, string filterType, int filterValue)
        {
            string DashBoardDetailsJson = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString("AppDBContextConnection")))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetDashBoardChartDetails", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TestSuitName", testSuitName);
                        command.Parameters.AddWithValue("@FilterType", filterType);
                        command.Parameters.AddWithValue("@FilterValue", filterValue);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                DashBoardDetailsJson = reader["DashBoardDetailsJson"].ToString();
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
            return DashBoardDetailsJson;
        }

        public string GetRunDetails(string TestSuitName)
        {
            string RunDetailsJson = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString("AppDBContextConnection")))
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
                using (SqlConnection connection = new SqlConnection(GetConnectionString("AppDBContextConnection")))
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
                using (SqlConnection connection = new SqlConnection(GetConnectionString("AppDBContextConnection")))
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

        internal string GetTestCases()
        {
            string TestCasesListJson = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString("AppDBContextConnection")))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetTestCases", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                TestCasesListJson = reader["TestCasesListJson"].ToString();
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
            return TestCasesListJson;
        }

        internal string AddUpdateTestSuitesJson(Dto_TestSuiteDetailsData model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString("AppDBContextConnection")))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_AddUpdateTestSuites", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TestSuiteName", model.TestSuiteName);
                        command.Parameters.AddWithValue("@TestSuiteType", model.TestSuiteType ?? "");
                        command.Parameters.AddWithValue("@ApplicationId", model.ApplicationId);
                        command.Parameters.AddWithValue("@SendEmail", model.SendEmail);
                        command.Parameters.AddWithValue("@EnvironmentId", model.EnvironmentId);
                        command.Parameters.AddWithValue("@TestSuiteId", model.TestSuiteId);
                        command.Parameters.AddWithValue("@SelectedTestCases", string.Join(", ", model.SelectedTestCases));
                        command.Parameters.AddWithValue("@Description", model.Description ?? "");
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                result = reader["result"].ToString();
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
            return result;
        }

        internal string GetTestSuitesJson()
        {
            string testSuiteListJson = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString("AppDBContextConnection")))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetCustomTestSuites", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                testSuiteListJson = reader["testSuiteListJson"].ToString();
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
            return testSuiteListJson;
        }

        internal string DeleteTestSuites(string TestSuiteName)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString("AppDBContextConnection")))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_DeleteTestSuites", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TestSuiteName", TestSuiteName);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                result = reader["result"].ToString();
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
            return result;
        }

        internal string GetApplications()
        {
            string ApplicationListJson = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString("AppDBContextConnection")))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetApplications", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                ApplicationListJson = reader["ApplicationListJson"].ToString();
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
            return ApplicationListJson;
        }

        internal string GetEnvironments()
        {
            string EnvironmentListJson = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString("AppDBContextConnection")))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetEnvironment", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                EnvironmentListJson = reader["EnvironmentListJson"].ToString();
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
            return EnvironmentListJson;
        }

        internal Dto_TestSuiteDetailsData GetTestSuiteByName(string TestSuiteName)
        {
            Dto_TestSuiteDetailsData testSuites = new Dto_TestSuiteDetailsData();
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString("AppDBContextConnection")))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetTestSuitsByName", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TestSuiteName", TestSuiteName);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                testSuites.TestSuiteId = Convert.ToInt32(reader["TestSuiteId"]);
                                testSuites.TestSuiteName = reader["TestSuiteName"].ToString();
                                testSuites.SendEmail = Convert.ToBoolean(reader["SendEmail"]);
                                testSuites.ApplicationId = Convert.ToInt32(reader["ApplicationId"]);
                                testSuites.EnvironmentId = Convert.ToInt32(reader["EnvironmentId"]);
                                testSuites.TestSuiteType = reader["TestSuiteType"].ToString();
                                testSuites.Description = reader["Description"].ToString();
                                testSuites.SelectedTestCases = reader["SelectedTestCases"].ToString().Split(", ").Select(x => x).ToList();
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
            return testSuites;
        }

        internal string AddUpdateEnvironmentJson(Environments model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString("AppDBContextConnection")))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_AddUpdateEnvironment", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@EnvironmentName", model.EnvironmentName);
                        command.Parameters.AddWithValue("@EnvironmentId", model.EnvironmentId);
                        command.Parameters.AddWithValue("@ApplicationId", model.ApplicationId);
                        command.Parameters.AddWithValue("@BrowserId", model.BroswerId);
                        command.Parameters.AddWithValue("@Baseurl", model.Baseurl);
                        command.Parameters.AddWithValue("@BasePath", model.BasePath);
                        command.Parameters.AddWithValue("@DriverPath", model.DriverPath);
                        command.Parameters.AddWithValue("@CreatedBy", model.CreatedBy);
                        command.Parameters.AddWithValue("@ModifiedBy", model.ModifiedBy);
                        command.Parameters.AddWithValue("@Description", model.Description);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                result = reader["result"].ToString();
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
            return result;
        }

        internal string AddUpdateApplicationJson(Applications model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString("AppDBContextConnection")))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_AddUpdateApplication", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@ApplicationId", model.ApplicationId);
                        command.Parameters.AddWithValue("@ApplicationName", model.ApplicationName);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                result = reader["result"].ToString();
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
            return result;
        }

        internal string GetBrowsers()
        {
            string BrowserListJson = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString("AppDBContextConnection")))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetBrowsers", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                BrowserListJson = reader["Browsers"].ToString();
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
            return BrowserListJson;
        }

        internal string AddUpdateBrowserJson(Browsers model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString("AppDBContextConnection")))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_AddUpdateBrowser", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@BrowserId", model.BrowserId);
                        command.Parameters.AddWithValue("@BrowserName", model.BrowserName);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                result = reader["result"].ToString();
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
            return result;
        }

        internal Environments GetEnvironmentById(int Id)
        {
            Environments environment = new Environments();
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString("AppDBContextConnection")))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetEnvironmentById", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@EnvironmentId", Id);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                environment.EnvironmentId = Convert.ToInt32(reader["EnvironmentId"]);
                                environment.ApplicationId = Convert.ToInt32(reader["ApplicationId"]);
                                environment.EnvironmentName = reader["EnvironmentName"].ToString();
                                environment.DriverPath = reader["DriverPath"].ToString();
                                environment.BasePath = reader["BasePath"].ToString();
                                environment.Baseurl = reader["Baseurl"].ToString();
                                environment.BroswerId = Convert.ToInt32(reader["BroswerId"]);
                                environment.CreatedBy = reader["CreatedBy"].ToString();
                                environment.ModifiedBy = reader["ModifiedBy"].ToString();
                                environment.CreatedOn = Convert.ToDateTime(reader["CreatedOn"]);
                                environment.ModifiedOn = Convert.ToDateTime(reader["ModifiedOn"]);
                                environment.Description = reader["Description"].ToString();
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
            return environment;
        }

        internal string SaveTestCaseData(string testSuiteJsonData)
        {
            string _result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString("AppDBContextConnection")))
                {
                    SqlCommand cmd = new SqlCommand("stp_SaveCustomTestSuiteExecutionData", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    connection.Open();
                    cmd.Parameters.AddWithValue("@TestSuiteJson", testSuiteJsonData);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            reader.Read();
                            _result = reader["result"].ToString();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _result = ex.Message;
            }
            return _result;
        }

        internal string GetRunId(string testSuiteName)
        {
            string TestRunName = "";
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString("AppDBContextConnection")))
                {
                    SqlCommand cmd = new SqlCommand("stp_GetRunId", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    connection.Open();
                    SqlParameter sqlParameter = cmd.Parameters.AddWithValue("@TestSuite", testSuiteName);
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

        internal string RunTestCase(string testCaseName, string testerName, string baseURL, string basePath, string environmentName, string browserName, string driverPath)
        {
            string TestCaseJsonData = string.Empty;
            try
            {
                //TestCaseJsonData = _testExecutor.ExecuteTestCases(browserName, environmentName, testCaseName, baseURL, basePath, driverPath, testerName);
            }
            catch (Exception)
            {
                throw;
            }
            return TestCaseJsonData;
        }
    }
}