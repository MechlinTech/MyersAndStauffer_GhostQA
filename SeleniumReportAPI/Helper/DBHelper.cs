using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SeleniumReportAPI.Helper
{
    public class DBHelper
    {
        private readonly IConfiguration _configuration;
        public DBHelper(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GetConnectionString()
        {
            return _configuration.GetConnectionString("AppDBContextConnection");
        }

        internal string VerifyUser(string email, string password)
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

        internal string GetDashboardDetails(string testSuitName)
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


    }
}