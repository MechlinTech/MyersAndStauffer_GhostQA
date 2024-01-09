using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.CSharp;
using System.Data;
using System.Data.SqlClient;
using System;
using System.Linq;
using System.Text;

namespace SeleniumTestReport.Helper
{
    public class DBHelper
    {
        private readonly IConfiguration _configuration;
        public DBHelper(IConfiguration configuration)
        {
            _configuration = configuration;
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

        internal string GetDashboardDetails(string testSuitName)
        {
            string DashBoardDetailsJson = string.Empty;
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionString("AppDBContextConnection")))
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

        static void ExtractTestCasesFromProject()
        {
            string projectPath = @"D:\Mechlin Tech\MyersAndStauffer_GhostQA\MyersAndStaufferAutomation.sln";
            // Load the project
            var workspace = Microsoft.CodeAnalysis.MSBuild.MSBuildWorkspace.Create();
            var project = workspace.OpenProjectAsync(projectPath).Result;

            // Traverse the documents in the project
            foreach (var document in project.Documents)
            {
                // Parse the document
                var syntaxRoot = document.GetSyntaxRootAsync().Result;

                // Traverse the syntax tree
                ExtractTestCasesFromSyntaxTree(syntaxRoot);
            }
        }

        static void ExtractTestCasesFromSyntaxTree(SyntaxNode syntaxNode)
        {
            // Use a syntax walker to traverse the syntax tree
            var walker = new TestCaseSyntaxWalker();
            walker.Visit(syntaxNode);

            // Retrieve the test cases found by the walker
            var testCases = walker.TestCases;

            // Process the extracted test cases (e.g., print them)
            foreach (var testCase in testCases)
            {
                Console.WriteLine($"Test Case: {testCase}");
            }
        }

        internal class TestCaseSyntaxWalker : CSharpSyntaxWalker
        {
            public List<string> TestCases { get; } = new List<string>();

            public override void VisitMethodDeclaration(MethodDeclarationSyntax node)
            {
                // Check if the method has a TestMethod attribute
                var hasTestMethodAttribute = node.AttributeLists
                    .SelectMany(attrList => attrList.Attributes)
                    .Any(attribute =>
                        attribute.Name.ToString() == "TestMethod" || attribute.Name.ToString() == "Test");

                if (hasTestMethodAttribute)
                {
                    // Add the method name to the list of test cases
                    TestCases.Add(node.Identifier.Text);
                }

                base.VisitMethodDeclaration(node);
            }
        }
    }
}