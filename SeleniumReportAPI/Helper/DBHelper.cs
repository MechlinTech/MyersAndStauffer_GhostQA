using ExcelDataReader;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SeleniumReportAPI.DTO_s;
using SeleniumReportAPI.Models;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.IO.Compression;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using TestSeleniumReport.DTO_s;
using Environments = SeleniumReportAPI.Models.Environments;
using SmtpClient = System.Net.Mail.SmtpClient;

namespace SeleniumReportAPI.Helper
{
    public class DBHelper
    {
        private readonly IConfiguration _configuration;
        private readonly TestExecutor _testExecutor;
        private readonly UserManager<ApplicationUser> _userManager;

        public DBHelper(IConfiguration configuration, TestExecutor testExecutor, IServiceProvider serviceProvider)
        {
            _configuration = configuration;
            _testExecutor = testExecutor;
            _userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        }

        internal string GetConnectionString()
        {
            return _configuration.GetConnectionString("AppDBContextConnection");
        }

        internal async Task<string> VerifyUser(string email, string password)
        {
            string isValidUser = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_ValidateUser", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@UserName", email);
                        command.Parameters.AddWithValue("@Password", password);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                isValidUser = reader["isValidUser"].ToString();
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
            return isValidUser;
        }

        internal async Task<string> GetDataTestSuits()
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

        internal async Task<string> GetDashboardDetails(string testSuitName)
        {
            string DashBoardDetailsJson = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetDashBoardDetails", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TestSuitName", testSuitName);
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

        internal async Task<string> GetRunDetails(string TestSuitName)
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

                                if (string.IsNullOrEmpty(RunDetailsJson))
                                {
                                    RunDetailsJson = "[]";
                                }
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

        internal async Task<string> GetTestCaseDetails(string TestSuitName, string RunID)
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

        internal async Task<string> GetTestCaseStepsDetails(string testSuitName, string runId, string testCaseName)
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

        internal JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }

        internal async Task<string> GetTestSuitesJson()
        {
            string testSuiteListJson = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
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

        internal async Task<string> AddUpdateTestSuitesJson(Dto_TestSuiteDetailsData model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
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
                        command.Parameters.AddWithValue("@Description", model.Description);
                        command.Parameters.AddWithValue("@TestUserId", model.TestUserId);
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

        internal async Task<string> DeleteTestSuites(string TestSuiteName)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
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

        internal async Task<string> GetTestSuiteByName(string TestSuiteName)
        {
            string result = string.Empty;
            Dto_TestSuiteDetailsData testSuites = new Dto_TestSuiteDetailsData();
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
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

        internal async Task<string> GetTestCasesJson()
        {
            string TestCasesListJson = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
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

        internal async Task<string> GetApplications()
        {
            string ApplicationListJson = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
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

        internal async Task<string> GetEnvironments()
        {
            string EnvironmentListJson = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
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

        internal async Task<string> RunTestCase(string testSuiteName, string testCaseName, string testRun, string testerName, string baseURL, string basePath, string environmentName, string browserName, string driverPath, string TestUserName, string Password)
        {
            string TestCaseJsonData = string.Empty;
            try
            {
                SaveExecutionProgress(testSuiteName, testCaseName, testRun, testerName, environmentName);
                TestCaseJsonData = _testExecutor.ExecuteTestCases(browserName, environmentName, testCaseName, baseURL, basePath, driverPath, testerName, TestUserName, Password);
                UpdateExecutionProgress(testSuiteName, testCaseName, testRun, testerName, environmentName);
            }
            catch (Exception)
            {
                throw;
            }
            return TestCaseJsonData;
        }

        private void UpdateExecutionProgress(string testSuiteName, string testCaseName, string testRun, string testerName, string environmentName)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_UpdateExecutionInProgressFlag", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TestSuiteName", testSuiteName);
                        command.Parameters.AddWithValue("@TestRunName", testRun);
                        command.Parameters.AddWithValue("@TestCaseName", testCaseName);
                        command.Parameters.AddWithValue("@TesterName", testerName);
                        command.Parameters.AddWithValue("@TestEnvironment", environmentName);
                        command.ExecuteNonQuery();
                    }
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private void SaveExecutionProgress(string testSuiteName, string testCaseName, string testRun, string testerName, string environmentName)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_SaveExecutionInProgress", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TestSuiteName", testSuiteName);
                        command.Parameters.AddWithValue("@TestRunName", testRun);
                        command.Parameters.AddWithValue("@TestCaseName", testCaseName);
                        command.Parameters.AddWithValue("@TesterName", testerName);
                        command.Parameters.AddWithValue("@TestEnvironment", environmentName);
                        command.ExecuteNonQuery();
                    }
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        internal async Task<bool> GetExecutionInProgress()
        {
            bool ExecutionInProgress = false;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_IsExecutionInProgress", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                ExecutionInProgress = (bool)reader["ExecutionInProgress"];
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
            return ExecutionInProgress;
        }

        internal async Task<string> AddUpdateEnvironmentJson(Environments model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_AddUpdateEnvironment", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@EnvironmentId", model.EnvironmentId);
                        command.Parameters.AddWithValue("@EnvironmentName", model.EnvironmentName);
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

        internal async Task<string> AddUpdateApplicationJson(Applications model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
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

        internal async Task<string> GetRunId(string testSuiteName)
        {
            string TestRunName = "";
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
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

        internal async Task<string> SaveTestCaseData(string testSuiteJsonData)
        {
            string _result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
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

        internal async Task<Environments> GetEnvironmentById(int Id)
        {
            Environments environment = new Environments();
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
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
                                environment.BrowserName = reader["BrowserName"].ToString();
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

        internal async Task<string> AddUpdateBrowserJson(Browsers model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
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

        internal async Task<string> GetBrowsers()
        {
            string BrowserListJson = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
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

        internal async Task<string> GetDashboardDetails(string testSuitName, string filterType, int filterValue)
        {
            string DashBoardDetailsJson = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
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

        internal async Task<string> DeleteApplication(int ApplicationId)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_DeleteApplication", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@ApplicationId", ApplicationId);
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

        internal async Task<string> DeleteBrowser(int BrowserId)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_DeleteBrowser", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@BrowserId", BrowserId);
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

        internal async Task<string> DeleteEnvironment(int EnvironmentId)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_DeleteEnvironment", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@EnvironmentId", EnvironmentId);
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

        internal async Task<string> SaveInBuiltTestSuites(Object testDataJson)
        {
            string result = string.Empty;
            try
            {
                string connectionString = GetConnectionString();
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("stp_InsertBuiltInTestSuiteDetails", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    connection.Open();
                    cmd.Parameters.AddWithValue("@DynamicObject", testDataJson.ToString());
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            reader.Read();
                            result = reader["result"].ToString();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }

        public object SendEmail(string toEmail, string Mailtype, string Url, string GenratePassword)
        {
            if (!IsValidEmail(toEmail))
            {
                return new { message = "Invalid email address format." };
            }

            string result = string.Empty;
            var BodyString = string.Empty;
            var fromEmail = _configuration["EmailDetails:EmailUsername"];
            var senderDisplayName = _configuration["EmailDetails:SenderDisplayName"];
            var hostName = _configuration["EmailDetails:EmailHost"];
            var subject = "Invitation to Join Our Platform";
            var user = GetProfilByEmail(toEmail);
            var passWord = _configuration["EmailDetails:EmailPassword"];
            var port = Convert.ToInt32(_configuration["EmailDetails:Port"]);
            BodyString = Mailtype.Equals("Invitation")
                ? @"<!DOCTYPE html>
                                <html lang=""en"">
                                <body style=""font-family: Arial, sans-serif; margin: 0; padding: 0;"">
                                <table align=""center"" border=""0"" cellpadding=""0"" cellspacing=""0"" width=""600"">
                                <tr>
                                <td style=""padding: 20px 0; text-align: center;"">
                                <h2 style=""color: #654DF7;"">You're Invited! Join Ghost-QA Platform 🎉</h2>
                                </td>
                                </tr>
                                <tr>
                                <td style=""padding: 20px 0;"">
                                <p>You're Invited! Join the GhostQA Platform 🎉<p>
                                <p>Dear [" + toEmail.ToUpper() + @"],</p>
                                <p>We are thrilled to invite you to join GhostQA Platform! 🌟</p>
                                <p>To accept your invitation and immerse yourself in the QA adventure, simply click the button below:</p>
                                <p><a href=""" + $"{Url}AcceptInvitation/{toEmail}" + @""" style=""background-color: #654DF7; border: none; color: white; padding: 15px 25px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 8px;"">View Invitation</a></p>
                                </td>
                                </tr>
                                </table>
                                </body>
                                </html>"
                : Mailtype.Equals("Accept") ? @"<!DOCTYPE html>
                                <html lang=""en"">
                                <body style=""font-family: Arial, sans-serif; margin: 0; padding: 0;"">
                                <table align=""center"" border=""0"" cellpadding=""0"" cellspacing=""0""    width=""600"">
                                <tr>
                                <td style=""padding: 20px 0; text-align: center;"">
                                <h2 style=""color: #654DF7;"">Welcome to Ghost - QA Platform 🎉</h2>
                                </td>
                                </tr>
                                <tr>
                                <td style=""padding: 20px 0;"">
                                <p>Dear [" + toEmail.ToUpper() + @"],</p>
                                <p>We are excited to serve you our Ghost - QA Platform services! 🌟</p>
                                <p>Thank you for accepting the invitation here is your temporary password:</p>
                                <em><b>Password: </b> " + GenratePassword + @"</em>
                                <p>If you want to change your password click on below 'Change Password' link or button</p>
                                <p><a href=""" + $"{Url}ChangePassword/{toEmail}" + @""" style=""background-color: #654DF7; border: none; color: white; padding: 15px 25px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 8px;"">Change Password</a></p>
                                </td>
                                </tr>
                                </table>
                                </body>
                                </html>" : "";

            if (Mailtype.Equals("Invitation") && !string.IsNullOrEmpty(user.Result))
            {
                return new
                {
                    status = "Failed",
                    message = "User Already Exist"
                };
            }

            var smtpClient = new SmtpClient(hostName)
            {
                Port = port,
                Credentials = new NetworkCredential(fromEmail, passWord),
                EnableSsl = true,
            };

            var fromEmailAddress = new MailAddress(fromEmail, senderDisplayName);
            var mailMessage = new MailMessage()
            {
                From = fromEmailAddress,
                Subject = subject,
                IsBodyHtml = true,
                Body = BodyString
            };
            mailMessage.To.Add(toEmail);

            try
            {
                System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12;
                smtpClient.Send(mailMessage);
                result = "Email sent successfully!";
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return new
            {
                status = "Success",
                message = result
            };
        }

        public async Task<object> AcceptInvitation(string Email, string Url)
        {
            if (!IsValidEmail(Email))
                return new { message = "Invalid email address format." };

            string GeneratorPassword = GenerateRandomPassword(8);

            ApplicationUser user = new()
            {
                Email = Email,
                UserName = Email,
                SecurityStamp = Guid.NewGuid().ToString()
            };
            IdentityResult result = null;
            var EmailStatus = (dynamic)null;
            try
            {
                result = await _userManager.CreateAsync(user, GeneratorPassword);

                if (!result.Succeeded)
                {
                    throw new ArgumentException($"Unable to register user");
                }
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                await _userManager.ConfirmEmailAsync(user, token);
                EmailStatus = SendEmail(Email, "Accept", Url, GeneratorPassword);
            }
            catch (Exception ex)
            {
                return new { message = $"Error: {ex.Message}" };
            }

            return new { userStatus = result.Succeeded, emailStatus = EmailStatus };
        }

        private bool IsValidEmail(string email)
        {
            string pattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
            Regex regex = new Regex(pattern);
            return regex.IsMatch(email);
        }

        public async Task<IdentityResult> ChangePasswordAsync(Dto_ChangePassword model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "User not found." });
            }
            var passwordCheckResult = await _userManager.CheckPasswordAsync(user, model.OldPassword);

            if (!passwordCheckResult)
            {
                return IdentityResult.Failed(new IdentityError { Description = "Old password is incorrect." });
            }

            var changePasswordResult = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

            return changePasswordResult.Succeeded
                ? IdentityResult.Success
                : IdentityResult.Failed(new IdentityError { Description = "Failed to change password." });
        }
        internal async Task<string> GetUserDetails()
        {
            string UsersListJson = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetUserDetails", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                UsersListJson = reader["UsersListJson"].ToString();
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
            return UsersListJson;
        }

        internal async Task<string> UpdateUserProfile(Dto_UpdateUserProfile model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_UpdateUserProfile", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@FullName", model.FullName);
                        command.Parameters.AddWithValue("@OrganizationName", model.OrganizationName);
                        command.Parameters.AddWithValue("@Email", model.Email);
                        command.Parameters.AddWithValue("@Id", model.Id);
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

        internal async Task<string> GetProfilByEmail(string Email)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetProfileByEmail", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Email", Email);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                result = reader["UserProfile"].ToString();
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

        internal async Task<string> DisableEnableUser(Dto_DisableEnableUser model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_DisableEnableUser", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@UserId", model.UserId);
                        command.Parameters.AddWithValue("@IsDisabled", model.IsDisabled);
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

        internal async Task<string> GetDataRootRelation()
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetRootRelation", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
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

        internal async Task<string> GetTestCaseDetails()
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetTestCaseDetailsLab", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
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
        internal async Task<string> GetTestStepsDetails()
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetTestStepsDetails", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
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

        internal async Task<string> AddRootRelation(RootRelation model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_AddRootRelation", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@RootId", model.RootId);
                        command.Parameters.AddWithValue("@Node", model.Node);
                        command.Parameters.AddWithValue("@Parent", model.Parent);
                        command.Parameters.AddWithValue("@Name", model.Name);
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
        internal async Task<string> AddTestCaseDetails(TestCaseDetails model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_AddTestCaseDetails", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TestCaseDetailsId", model.TestCaseDetailsId);
                        command.Parameters.AddWithValue("@RootId", model.RootId);
                        command.Parameters.AddWithValue("@StartUrl", model.StartUrl);
                        command.Parameters.AddWithValue("@TestCaseName", model.TestCaseName);
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
        internal async Task<string> AddTestStepsDetails(Dto_AddTestStepsJson AddStepsJson)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_AddTestStepsDetails", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@AddStepsJson", JsonConvert.SerializeObject(AddStepsJson));
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
        internal async Task<string> UpdateRootRelation(RootRelation model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_UpdateRootRelation", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@RootId", model.RootId);
                        command.Parameters.AddWithValue("@Name", model.Name);
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
        internal async Task<string> GetTestCaseDetailsByRootId(int RootId)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetTestCaseDetailsByRootId", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@RootId", RootId);
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
        internal async Task<string> GetTestStepsDetailsByTestStepsId(int TestStepsId)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetTestStepsDetailsByTestStepsId", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TestStepsId", TestStepsId);
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

        internal async Task<string> DeleteRootRelation(RootRelation model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_DeleteRootRelation", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@RootId", model.RootId);
                        command.Parameters.AddWithValue("@ParentId", model.Parent);
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
        internal async Task<string> GetExcutedByRootId(int RootId, string TestName)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetExcutedByRootId", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@RootId", RootId);
                        command.Parameters.AddWithValue("@TestName", TestName);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                result = reader["TestSuite"].ToString();
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

        internal async Task<string> GetProjectData()
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetProjectRootRelation", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
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

        internal async Task<string> AddProjectData(ProjectRootRelation model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_AddProjectRootRelation", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@ParentId", model.ParentId);
                        command.Parameters.AddWithValue("@Name", model.Name);
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
        internal async Task<string> UpdateProjectData(ProjectRootRelation model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_UpdateProjectRootRelation", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Id", model.Id);
                        command.Parameters.AddWithValue("@Name", model.Name);
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
        internal async Task<string> DeleteProjectData(ProjectRootRelation model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_DeleteProjectRootRelation", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Id", model.Id);
                        command.Parameters.AddWithValue("@ParentId", model.ParentId);
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

        internal async Task<string> AddPerformanceFile(Dto_AddPerformance model)
        {
            string result = string.Empty;
            try
            {
                bool containsJMXExtension = Path.GetExtension(model.FileName).Equals(".jmx", StringComparison.OrdinalIgnoreCase);
                if (!containsJMXExtension)
                {
                    return result = "Only JMX file can be uploaded";
                }
                string fileName = model.BinaryData.FileName;
                string directoryPath = _configuration["LocationFile:JMXFile"];
                string filePath = Path.Combine(directoryPath, model.FileName);
                string directoryPathDev = _configuration["LocationFile:JMXFileDev"];
                string filePathDev = Path.Combine(directoryPathDev, model.FileName);

                // Ensure directory exists
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }

                // Ensure directory exists
                if (!Directory.Exists(directoryPathDev))
                {
                    Directory.CreateDirectory(directoryPathDev);
                }

                // Save uploaded file to disk
                if (!File.Exists(filePath))
                {
                    using (FileStream stream = new FileStream(filePath, FileMode.Create))
                    {
                        await model.BinaryData.CopyToAsync(stream);
                    }
                }

                if (!File.Exists(filePathDev))
                {
                    using (FileStream stream = new FileStream(filePathDev, FileMode.Create))
                    {
                        await model.BinaryData.CopyToAsync(stream);
                    }
                }


                // Save file path to database
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    await connection.OpenAsync();
                    using (SqlCommand command = new SqlCommand("stp_AddPerformance", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@RootId", model.RootId);
                        command.Parameters.AddWithValue("@TestCaseName", model.TestCaseName);
                        command.Parameters.AddWithValue("@FileName", fileName); // Save file name instead of full path
                        command.Parameters.AddWithValue("@FilePath", filePath);
                        await command.ExecuteNonQueryAsync();
                    }
                }

                result = "Success";
            }
            catch (Exception ex)
            {
                // Handle exceptions appropriately, logging or rethrowing as necessary
                Console.WriteLine($"An error occurred: {ex.Message}");
                result = "Failed"; // Update result to indicate failure
            }
            return result;
        }

        internal async Task<string> GetPerformanceFileByRootId(int RootId)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetPerformaceFile", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@RootId", RootId);
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
        internal async Task<string> DeletePerformanceFile(int Id)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_DeletePerformanceFile", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Id", Id);
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
        internal async Task<string> UploadFiles(IFormFile file, string basePath)
        {
            string result = string.Empty;
            try
            {
                string recordingFolderPath = string.Empty;
                string filePath = string.Empty;
                if (file.ContentType.Contains("video"))
                {
                    recordingFolderPath = Path.Combine(basePath, "Recordings");
                    //Video Save Directory
                    string videodir = Path.Combine(recordingFolderPath, $"{DateTime.Now:yyyy-MM-dd}");
                    if (!Directory.Exists(videodir))
                    {
                        Directory.CreateDirectory(videodir);
                    }

                    //Record to a file and save on local
                    filePath = Path.Combine(videodir, $"{DateTime.Now:yyyy-MM-dd_hh-mm-ss}.webm");
                }
                else
                {
                    var FailureSSPath = Path.Combine(basePath, "FailureScreenShots", DateTime.Now.ToString("MMMM_dd_yyyy"));
                    if (!Directory.Exists(FailureSSPath))
                    {
                        Directory.CreateDirectory(FailureSSPath);
                    }
                    filePath = Path.Combine(FailureSSPath, file.FileName + DateTime.Now.ToString("yy-MM-dd hh-mm-ss") + ".png");
                }

                // Save uploaded file to disk
                using (FileStream stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                result = "Success";
            }
            catch (Exception ex)
            {
                // Handle exceptions appropriately, logging or rethrowing as necessary
                Console.WriteLine($"An error occurred: {ex.Message}");
                result = "Failed"; // Update result to indicate failure
            }
            return result;
        }
        internal async Task<string> AddLocation(PerformanceLocation model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    await connection.OpenAsync();
                    using (SqlCommand command = new SqlCommand("stp_AddLocation", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@PerformanceFileId", model.PerformanceFileId);
                        command.Parameters.AddWithValue("@Name", model.Name);
                        command.Parameters.AddWithValue("@NumberUser", model.NumberUser);
                        command.Parameters.AddWithValue("@PercentageTraffic", model.PercentageTraffic);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                result = reader["result"].ToString();
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }

        internal async Task<string> GetLocationByPerformanceFileId(int PerformanceFileId)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetLocationByPerformanceFileId", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@PerformanceFileId", PerformanceFileId);
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
        internal async Task<string> DeleteLocation(int Id)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_DeleteLocation", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Id", Id);
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
        internal async Task<string> AddProperty(PerformanceProperties model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    await connection.OpenAsync();
                    using (SqlCommand command = new SqlCommand("stp_AddProperties", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@PerformanceFileId", model.PerformanceFileId);
                        command.Parameters.AddWithValue("@Name", model.Name);
                        command.Parameters.AddWithValue("@Value", model.Value);
                        await command.ExecuteNonQueryAsync();
                    }
                }

                result = "Success";
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }

        internal async Task<string> GetPropertyByPerformanceFileId(int PerformanceFileId)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetPropertyByPerformanceFileId", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@PerformanceFileId", PerformanceFileId);
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
        internal async Task<string> DeleteProperties(int Id)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_DeleteProperties", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Id", Id);
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

        internal async Task<string> AddTestData(Dto_AddTestData model)
        {
            string result = string.Empty;
            string name = string.Empty;
            IExcelDataReader reader = null;
            DataTable dt = null;
            bool containsCSVExtension = Path.GetExtension(model.File.FileName).Equals(".CSV", StringComparison.OrdinalIgnoreCase);
            if (!containsCSVExtension)
            {
                return result = "Only CSV file can be uploaded";
            }
            string directoryPath = _configuration["LocationFile:CSVFile"];
            string filePath = Path.Combine(directoryPath, model.File.FileName);

            // Ensure directory exists
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }

            // Save uploaded file to disk
            using (FileStream stream = new FileStream(filePath, FileMode.Create))
            {
                await model.File.CopyToAsync(stream);
            }
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            using (var stream = new MemoryStream())
            {
                await model.File.CopyToAsync(stream);
                name = model.File.FileName;
                reader = ExcelReaderFactory.CreateCsvReader(stream);
                var dataSet = reader.AsDataSet(new ExcelDataSetConfiguration
                {
                    ConfigureDataTable = _ => new ExcelDataTableConfiguration
                    {
                        UseHeaderRow = true
                    }
                });
                dt = dataSet.Tables[0];

            }

            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            foreach (DataRow dr in dt.Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    row.Add(col.ColumnName, dr[col]);
                }
                rows.Add(row);
            }
            var JsonData = JsonConvert.SerializeObject(rows);
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    await connection.OpenAsync();
                    using (SqlCommand command = new SqlCommand("stp_AddTestData", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@PerformanceFileId", model.PerformanceFileId);
                        command.Parameters.AddWithValue("@Name", name);
                        command.Parameters.AddWithValue("@JsonData", JsonData);
                        command.Parameters.AddWithValue("@FilePath", filePath);
                        await command.ExecuteNonQueryAsync();
                    }
                }

                result = "Successfully Save";
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }

        internal async Task<string> GetTestDataByPerformanceFileId(int PerformanceFileId)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetTestDataByPerformanceFileId", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@PerformanceFileId", PerformanceFileId);
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

        internal async Task<string> DeleteTestData(int Id)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_DeleteTestData", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Id", Id);
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
        internal async Task<object> AddUpdateLoadData(Dto_Load loadData)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    await connection.OpenAsync();
                    using (SqlCommand command = new SqlCommand("stp_AddUpdateLoadData", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@PerformanceFileId", loadData.PerformancefileId);
                        command.Parameters.AddWithValue("@TotalUser", loadData.TotalUsers);
                        command.Parameters.AddWithValue("@DurationMin", loadData.DurationInMinutes);
                        command.Parameters.AddWithValue("@RampupTime", loadData.RampupTime);
                        command.Parameters.AddWithValue("@Steps", loadData.RampupSteps);
                        await command.ExecuteNonQueryAsync();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }

        internal async Task<string> GetLoadByPerformanceFileId(int PerformanceFileId)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetLoadByPerformanceFileId", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@PerformanceFileId", PerformanceFileId);
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
        internal async Task<string> DeleteLoadTestData(int Id)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_DeleteLoad", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Id", Id);
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

        internal async Task<object> AddExecuteResult(Dto_ExecutedData model)
        {
            string result = string.Empty;
            var jObj = (JObject)model.data.json;
            var jsonData = JsonConvert.DeserializeObject<JsonOption>(jObj.First.First.ToString());
            string fileName = jsonData.results[0].file.Replace("cypress/", "").Replace(".cy.js", "");
            DateTime startTime = DateTime.Parse(model.startDate.ToString());
            DateTime endTime = DateTime.Parse(model.endDate.ToString());
            TimeSpan duration = endTime - startTime;
            var strLog = CompressString(model.data.container_logs_str);
            List<dynamic> results = new List<dynamic>();
            foreach (var t in jsonData.results[0].suites[0].tests)
            {
                results.Add(new
                {
                    Status = t.state,
                    Duration = duration,
                    stepName = t.title
                });

                if (t.state == "failed")
                {
                    results.Add(new
                    {
                        Status = t.state,
                        Duration = duration,
                        stepName = t.err.message
                    });

                    results.Add(new
                    {
                        Status = t.state,
                        Duration = duration,
                        stepName = t.err.estack
                    });
                }
            }

            using (SqlConnection connection = new SqlConnection(GetConnectionString()))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand("stp_AddExecuteData", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@TestSuite", fileName);
                    command.Parameters.AddWithValue("@TestCase", model.data.container_id);
                    command.Parameters.AddWithValue("@TestCaseName", jsonData.results[0].suites[0].title);
                    command.Parameters.AddWithValue("@Status", jsonData.stats.failures > 0 ? "failed" : "passed");
                    command.Parameters.AddWithValue("@StartDateTime", model.startDate);
                    command.Parameters.AddWithValue("@EndDateTime", model.endDate);
                    command.Parameters.AddWithValue("@TestStepJson", JsonConvert.SerializeObject(results));
                    command.Parameters.AddWithValue("@SuiteDuration", jsonData.stats.duration.ToString());
                    command.Parameters.AddWithValue("@TestDuration", jsonData.results[0].suites[0].duration.ToString());
                    command.Parameters.AddWithValue("@TestScreenShot", JsonConvert.SerializeObject(model.data.runs_artifacts));
                    command.Parameters.AddWithValue("@TesterName", string.Empty);
                    command.Parameters.AddWithValue("@TestVideoUrl", GetArtifactUrl(model.data, "video"));
                    command.Parameters.AddWithValue("@TestCaseDetailsId", model.testCaseDetailId);
                    command.Parameters.AddWithValue("@ContainerLog", strLog);
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

            return result;
        }

        private string GetArtifactUrl(Dto_RootObject model, string str)
        {
            return model.runs_artifacts.Where(x => x.type == str).Count() > 0 ? model.runs_artifacts.Where(x => x.type == str).Select(y => y.files).FirstOrDefault() : string.Empty;
        }
        internal async Task<string> GetTestDetailByTestName(int TestId)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetTestDetailByTestCaseName", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TestId", TestId);
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

        internal async Task<string> GetTestStepsDetailByTestCaseId(string TestCaseId)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetTestStepsDetailByTestCaseId", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TestCaseId", TestCaseId);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                var res = reader["result"].ToString();
                                if (res.Contains("fails"))
                                {
                                    result = res;
                                }
                                else
                                {
                                    List<DTo_LogData> res2 = JsonConvert.DeserializeObject<List<DTo_LogData>>(res);
                                    result = res2[0].ContainerLog == null ? res : JsonConvert.SerializeObject(new List<dynamic>()
                                    {
                                        new
                                        {
                                             TestScreenShotUrl = res2[0].TestScreenShotUrl,
                                             ContainerLog = DecompressString(res2[0].ContainerLog)
                                        }
                                    });
                                }
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

        internal async Task<string> GetTestCaseDetailsByTestDetailId(int TestCaseId)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetTestCaseDetailsByTestDetailId", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TestDetailId", TestCaseId);
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

        internal async Task<object> UpdateTestCaseDetails(TestCaseDetails model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    await connection.OpenAsync();
                    using (SqlCommand command = new SqlCommand("stp_UpdateTestCaseDetails", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TestCaseDetailsId", model.TestCaseDetailsId);
                        command.Parameters.AddWithValue("@TestCaseName", model.TestCaseName);
                        command.Parameters.AddWithValue("@StartUrl", model.StartUrl);
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

        internal async Task<string> DeleteTestCaseDetailsByTestCaseDetailsId(int TestCaseDetailsId)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_DeleteTestCaseDetailsByTestCaseDetailsId", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TestCaseDetailsId", TestCaseDetailsId);
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

        internal async Task<Dto_LoadExecuteResponse> ExecutePerformanceJMX(Dto_LoadExecuteResponse model)
        {
            string result = string.Empty;
            var guid = Guid.NewGuid().ToString();
            var totalUserCount = 0;
            var totalDuration = 0;
            var totalRampUpSteps = 0;
            var totalRampUpTime = 0;
            var scenarios = new List<Scenarios>();
            var maxDuration = 0;
            string estimate = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetExecutePerformanceData", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@RootId", model.RootId);
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

                var executedData = JsonConvert.DeserializeObject<List<Dto_ExecutionPerformance>>(result);
                using (var httpClient = new HttpClient())
                {
                    foreach (var data in executedData)
                    {
                        var formData = new MultipartFormDataContent();
                        formData.Headers.TryAddWithoutValidation("X-CSRFTOKEN", "xJkh4UeQtq6uvMdPjtW2TX5gLZM9VdBsNZ206NwsRTc3XoWNVy8Gk7lGIU9TzV9O");
                        string path = $"{_configuration["LocationFile:JMXFileDev"]}";
                        // Get the operating system platform
                        PlatformID platform = Environment.OSVersion.Platform;
                        // Check the platform and set path accordingly
                        path = platform switch
                        {
                            // For Windows
                            PlatformID.Win32NT => Path.Combine(path, data.FileName),
                            _ => $"{path.Replace("\\", "/")}/{data.FileName}",
                        };
                        using (var fileStream = new FileStream(path, FileMode.Open))
                        {
                            var fileContent = new StreamContent(fileStream);
                            formData.Add(fileContent, "test_file", data.FileName);
                            formData.Add(new StringContent("GhostQA"), "name");
                            formData.Add(new StringContent(data.RampUpTimeInSeconds.ToString()), "jrampup_time");
                            formData.Add(new StringContent(data.TotalUsers.ToString()), "jthreads_total_user");
                            formData.Add(new StringContent(data.RampUpSteps.ToString()), "jrampup_steps");
                            formData.Add(new StringContent(data.DurationInMinutes.ToString()), "durations");
                            formData.Add(new StringContent(guid), "client_reference_id");
                            using (var response = await httpClient.PostAsync(_configuration["CypressAPI:PerformanceExecutor"], formData))
                            {
                                var res1 = await response.Content.ReadAsStringAsync();
                            }
                        }

                        totalUserCount += data.TotalUsers;
                        totalDuration += data.DurationInMinutes;
                        totalRampUpSteps += data.RampUpSteps;
                        totalRampUpTime += data.RampUpTimeInSeconds;
                        var scenario = new Scenarios
                        {
                            Id = data.Id,
                            ScenarioName = data.TestCaseName,
                            Duration = data.DurationInMinutes,
                            Location = "Asia Pacific (Mumbai) Ap-South-1"
                        };
                        scenarios.Add(scenario);
                        maxDuration = executedData.Max(data => data.DurationInMinutes);
                        estimate = DateTimeOffset.Parse(model.StartDate).AddSeconds(maxDuration).ToString("yyyy-MM-ddTHH:mm:ss.fffZ");
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return new Dto_LoadExecuteResponse()
            {
                Name = model.Name,
                Client_Id = guid,
                TesterName = model.TesterName,
                RootId = model.RootId,
                StartDate = model.StartDate,
                TotalUser = totalUserCount,
                TotalDuration = totalDuration,
                TotalRampUpSteps = totalRampUpSteps,
                TotalRampUpTime = totalRampUpTime,
                maxDuration = maxDuration,
                Scenarios = scenarios,
                EstimatedTime = estimate
            };
        }

        internal async Task<string> AddExecuterData(Dto_LoadExecuteResponse model)
        {
            string result = string.Empty;
            var data = JsonConvert.SerializeObject(model.responseData);
            var dat2 = CompressString(data);
            using (SqlConnection connection = new SqlConnection(GetConnectionString()))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand("stp_AddExecutePerformanceData", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@RootId", model.RootId);
                    command.Parameters.AddWithValue("@Name", model.Name);
                    command.Parameters.AddWithValue("@RunId", model.Client_Id);
                    command.Parameters.AddWithValue("@Status", "Complete");
                    command.Parameters.AddWithValue("@StartDateTime", model.StartDate);
                    command.Parameters.AddWithValue("@EndDateTime", model.EndDate);
                    command.Parameters.AddWithValue("@LoadDataJson", dat2);
                    command.Parameters.AddWithValue("@TesterName", model.TesterName);
                    command.Parameters.AddWithValue("@MaxDuration", model.maxDuration);
                    command.Parameters.AddWithValue("@Scenarios", JsonConvert.SerializeObject(model.Scenarios));
                    command.Parameters.AddWithValue("@TotalDuration", model.TotalDuration);
                    command.Parameters.AddWithValue("@TotalRampUpSteps", model.TotalRampUpSteps);
                    command.Parameters.AddWithValue("@TotalRampUpTime", model.TotalRampUpTime);
                    command.Parameters.AddWithValue("@TotalUser", model.TotalUser);
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

            return result;
        }

        internal byte[] CompressString(string text)
        {
            byte[] buffer = System.Text.Encoding.UTF8.GetBytes(text);
            using (MemoryStream memoryStream = new MemoryStream())
            {
                using (DeflateStream deflateStream = new DeflateStream(memoryStream, CompressionMode.Compress, true))
                {
                    deflateStream.Write(buffer, 0, buffer.Length);
                }
                return memoryStream.ToArray();
            }
        }

        internal async Task<object> UpdateLoaction(PerformanceLocation model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    await connection.OpenAsync();
                    using (SqlCommand command = new SqlCommand("stp_UpdateLocation", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Id", model.Id);
                        command.Parameters.AddWithValue("@Name", model.Name);
                        command.Parameters.AddWithValue("@NumberUser", model.NumberUser);
                        command.Parameters.AddWithValue("@PercentageTraffic", model.PercentageTraffic);
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
        internal async Task<string> GetExecutedPerformanceByRootId(int RootId)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetExecutedPerformanceByRootId", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@RootId", RootId);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                result = reader["RunDetailsJson"].ToString();
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
        internal async Task<string> stp_GetExecutedPerformanceByClientId(string ClientId)
        {
            List<Dto_LoadBinaryResponse> result;
            List<Dto_LoadExecuteResponse> responses = new List<Dto_LoadExecuteResponse>();
            string data = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetExecutedPerformanceByClientId", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@ClientId", ClientId);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                var res = reader["result"].ToString();
                                if (res.Contains("fails"))
                                {
                                    data = res;
                                }
                                else
                                {
                                    result = JsonConvert.DeserializeObject<List<Dto_LoadBinaryResponse>>(reader["result"].ToString());
                                    var scenarios = JsonConvert.DeserializeObject<List<Scenarios>>(Regex.Unescape(result[0].scenarios));
                                    var mdl = new Dto_LoadExecuteResponse()
                                    {
                                        responseData = JsonConvert.DeserializeObject<Dto_AddExecutePerformanceData>(DecompressString(result[0].responseData)),
                                        TesterName = result[0].TesterName,
                                        TotalDuration = result[0].TotalDuration,
                                        TotalRampUpSteps = result[0].TotalRampUpSteps,
                                        TotalRampUpTime = result[0].TotalRampUpTime,
                                        TotalUser = result[0].TotalUser,
                                        Client_Id = result[0].Client_Id,
                                        Scenarios = scenarios,
                                        StartDate = result[0].StartDate,
                                        EndDate = result[0].EndDate,
                                        RootId = result[0].RootId,
                                        maxDuration = result[0].maxDuration,
                                        Name = result[0].Name,
                                        EstimatedTime = DateTimeOffset.Parse(result[0].StartDate).AddSeconds(result[0].maxDuration).ToString("yyyy-MM-ddTHH:mm:ss.fffZ"),
                                    };
                                    responses.Add(mdl);
                                    data = JsonConvert.SerializeObject(responses);
                                }
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
            return data;
        }
        internal string DecompressString(byte[] compressedData)
        {
            using (MemoryStream memoryStream = new MemoryStream(compressedData))
            using (DeflateStream deflateStream = new DeflateStream(memoryStream, CompressionMode.Decompress))
            using (StreamReader streamReader = new StreamReader(deflateStream))
            {
                return streamReader.ReadToEnd();
            }
        }

        internal async Task<string> GetLocationList()
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetLocation", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
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

        internal async Task<string> GetFunctionalTest()
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetFunctionalTest", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
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

        internal async Task<string> AddFunctionalTest(FuncationalTest model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_AddFunctionalTest", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@RootId", model.RootId);
                        command.Parameters.AddWithValue("@Node", model.Node);
                        command.Parameters.AddWithValue("@Parent", model.Parent);
                        command.Parameters.AddWithValue("@Name", model.Name);
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

        internal async Task<string> UpdateFunctionalTest(FuncationalTest model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_UpdateFunctionalTest", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@RootId", model.RootId);
                        command.Parameters.AddWithValue("@Name", model.Name);
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

        internal async Task<string> DeleteFunctionalTest(FuncationalTest model)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_DeleteFunctionalTest", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@RootId", model.RootId);
                        command.Parameters.AddWithValue("@ParentId", model.Parent);
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

        internal List<object> SendExecutionDataMail(string testSuiteName, string testRunName, string testerName, string Url)
        {
            List<object> result = new List<object>();
            var testrunData = GetTestRunData(testSuiteName, testRunName);
            var data = JsonConvert.DeserializeObject<Dto_TestRunData>(testrunData.Result);
            if (!string.IsNullOrEmpty(testerName))
            {
                if (testerName.Length > 0)
                {
                    foreach (string toEmail in testerName.Split(","))
                    {
                        if (!IsValidEmail(toEmail))
                        {
                            result.Add(new { status = "Failed", message = "Invalid email address format.", email = toEmail });
                        }
                        var BodyString = string.Empty;
                        var fromEmail = _configuration["EmailDetails:EmailUsername"];
                        var senderDisplayName = _configuration["EmailDetails:SenderDisplayName"];
                        var hostName = _configuration["EmailDetails:EmailHost"];
                        var subject = "Test Suite Execution Result";
                        var user = GetProfilByEmail(toEmail);
                        var passWord = _configuration["EmailDetails:EmailPassword"];
                        var port = Convert.ToInt32(_configuration["EmailDetails:Port"]);

                        BodyString = $@"<!DOCTYPE html>
                                        <html lang=""en""> 
			                            <head>         
			                            <body style=""font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0;"">
                                        <H2>Hi {toEmail},</H2>
                                        <p>Below is the test execution result for Test-Suite {testSuiteName}:</p>
                                        <table style=""width: 100%; border-collapse: collapse; margin-bottom: 20px;"">
                                        <thead>
                                        <tr>
                                        <th style=""border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;"">Run Id</th>
                                        <th style=""border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;"">Start Date</th>
                                        <th style=""border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;"">End Date</th>
                                        <th style=""border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;"">Status</th>
                                        <th style=""border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;"">Total</th>
                                        <th style=""border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;"">Passed</th>
                                        <th style=""border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;"">Failed</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                        <td style=""border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #fff;"">
                                        <a href=""{Url}test/{testSuiteName}/{data.TestRunName}"" style=""text-decoration: none; color: #654DF7;"">{data.TestRunName}</a>
                                        </td>
                                        <td style=""border: 1px solid #ddd; padding: 8px; text-align: center;"">{data.TestRunStartDateTime:dd-MMM-yyyy HH:mm:ss}</td>
                                        <td style=""border: 1px solid #ddd; padding: 8px; text-align: center;"">{data.TestRunEndDateTime}</td>
                                        <td style=""border: 1px solid #ddd; padding: 8px; text-align: center;"">{data.TestRunStatus}</td>
                                        <td style=""border: 1px solid #ddd; padding: 8px; text-align: center;"">{data.TotalTestCases}</td>
                                        <td style=""border: 1px solid #ddd; padding: 8px; text-align: center;"">{data.PassedTestCases}</td>
                                        <td style=""border: 1px solid #ddd; padding: 8px; text-align: center;"">{data.FailedTestCases}</td>
                                        </tr>
                                        </tbody>
                                        </table>
                                        <H2>Thank you</H2>
                                        </body>
			                            </html>";

                        var smtpClient = new SmtpClient(hostName)
                        {
                            Port = port,
                            Credentials = new NetworkCredential(fromEmail, passWord),
                            EnableSsl = true,
                        };

                        var fromEmailAddress = new MailAddress(fromEmail, senderDisplayName);
                        var mailMessage = new MailMessage()
                        {
                            From = fromEmailAddress,
                            Subject = subject,
                            IsBodyHtml = true,
                            Body = BodyString
                        };
                        mailMessage.To.Add(toEmail);

                        try
                        {
                            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12;
                            smtpClient.Send(mailMessage);
                            result.Add(new { status = "Success", message = "Mail Sent Successfully", email = toEmail });
                        }
                        catch (Exception ex)
                        {
                            result.Add(new { status = "Failed", message = ex.Message, email = toEmail });
                        }
                    }
                }
            }
            return result;
        }

        internal async Task<string> GetTestRunData(string testSuiteName, string testRunName)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetTestRunData", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@TestSuitName", testSuiteName);
                        command.Parameters.AddWithValue("@TestRunName", testRunName);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                result = reader["RunDetailsJson"].ToString();
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
        internal async Task<string> GetAllTestUser()
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetAllTestUser", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
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
        internal async Task<string> GetTestUserById(int Id)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetTestUserById", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Id", Id);
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
        internal async Task<string> AddTestUser(TestUser model, string createdBy)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_AddTestUser", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Id", model.Id);
                        command.Parameters.AddWithValue("@UserName", model.UserName);
                        command.Parameters.AddWithValue("@Password", model.Password);
                        command.Parameters.AddWithValue("@CreatedBy", createdBy);
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

        internal async Task<string> DeleteTestUser(int Id)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_DeleteTestUser", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Id", Id);
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

        internal async Task<string> GetFunctionalTestCaseByRootId(int RootId)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetFunctionalTestCaseByRootId", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@RootId", RootId);
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

        internal async Task<string> AddFunctionalTestCase(FunctionalTestCase model, string createdBy)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_AddFunctionalTestCase", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@RootId", model.RootId);
                        command.Parameters.AddWithValue("@TestCaseName", model.TestCaseName);
                        command.Parameters.AddWithValue("@PreCondition", model.PreCondition);
                        command.Parameters.AddWithValue("@Steps", model.Steps);
                        command.Parameters.AddWithValue("@ExpectedResult", model.ExpectedResult);
                        command.Parameters.AddWithValue("@CreatedBy", createdBy);
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

        internal async Task<string> UpdateFunctionalTestCase(FunctionalTestCase model, string updatedBy)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_UpdateFunctionalTestCase", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Id", model.Id);
                        command.Parameters.AddWithValue("@Status", model.Status);
                        command.Parameters.AddWithValue("@ActualResult", model.ActualResult);
                        command.Parameters.AddWithValue("@updatedBy", updatedBy);
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

        internal async Task<string> DeleteFuncationalTestCase(int Id)
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_DeleteFuncationalTestCase", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Id", Id);
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

        internal string GenerateRandomPassword(int length)
        {
            const string allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%&*?"; // Include all the characters you want in your password        
            Random rng = new Random();
            StringBuilder password = new StringBuilder();
            for (int i = 0; i < length; i++)
            {
                int index = rng.Next(allowedChars.Length);
                password.Append(allowedChars[index]);
            }
            return password.ToString();
        }

        public async Task<Dto_Response> SendPasswordResetMailAsync(string Email)
        {
            var user = await _userManager.FindByEmailAsync(Email);

            if (user == null)
                return new Dto_Response() { status = "NotFound", message = "User not found!" };

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var result = SendEmail("Ghost-QA - Password Reset Request", $"Please click the following button to reset your password: <br><br> <a href={_configuration["EmailDetails:ResetPasswordLink"]}?token={token}&email={Email}><button>Reset Password</button></a>", true, Email);

            return new Dto_Response() { status = result.status, message = result.message };
        }

        public async Task<Dto_Response> ResetPasswordAsync(string Email, string Token, string NewPassword)
        {
            var user = await _userManager.FindByEmailAsync(Email);

            if (user == null)
                return new Dto_Response() { status = "NotFound", message = "User not found!" };

            var resetPassResult = await _userManager.ResetPasswordAsync(user, Token, NewPassword);

            if (!resetPassResult.Succeeded)
                return new Dto_Response() { status = "ResetFailed", message = string.Join(" ", resetPassResult.Errors.Select(x => x.Description)) };

            return new Dto_Response() { status = "Success", message = "Password has been reset successfully!" };
        }

        public Dto_Response SendEmail(string subject, string body, bool isBodyHtml, string toEmail)
        {
            var smtpClient = new SmtpClient(_configuration["EmailDetails:EmailHost"])
            {
                Port = Convert.ToInt32(_configuration["EmailDetails:Port"]),
                Credentials = new NetworkCredential(_configuration["EmailDetails:EmailUsername"], _configuration["EmailDetails:EmailPassword"]),
                EnableSsl = true,
            };

            var fromEmailAddress = new MailAddress(_configuration["EmailDetails:EmailUsername"], _configuration["EmailDetails:SenderDisplayName"]);

            var mailMessage = new MailMessage()
            {
                From = fromEmailAddress,
                Subject = subject,
                Body = body,
                IsBodyHtml = isBodyHtml
            };

            mailMessage.To.Add(toEmail);

            try
            {
                smtpClient.Send(mailMessage);
                return new Dto_Response() { status = "Success", message = "Email sent successfully!" };
            }
            catch (Exception ex)
            {
                return new Dto_Response { status = "EmailFailed", message = ex.Message };
            }
        }

        internal async Task<string> GetAllActiveUserDetails()
        {
            string result = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString()))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("stp_GetAllActiveUserDetails", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
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
    }
}