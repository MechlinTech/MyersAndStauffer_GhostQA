using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SeleniumReportAPI.DTO_s;
using SeleniumReportAPI.Helper;
using SeleniumReportAPI.Models;

namespace SeleniumReportAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    [ApiController]
    public class PerformanceController : ControllerBase
    {
        private readonly DBHelper _helper;

        public PerformanceController(DBHelper helper)
        {
            _helper = helper;
        }

        /// <summary>
        /// Get Project Root Relation
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetProjectData")]
        public async Task<ActionResult> GetProjectData()
        {
            return Ok(await _helper.GetProjectData());
        }

        /// <summary>
        /// Add project Root Relation
        /// </summary>
        /// <param ProjectRootRelation="ProjectRootRelation"></param>
        /// <returns></returns>
        [HttpPost("AddProjectData")]
        public async Task<ActionResult> AddProjectData(ProjectRootRelation model)
        {
            return Ok(await _helper.AddProjectData(model));
        }

        /// <summary>
        ///  Update Root Relation 
        /// </summary>
        /// <param Id="Id"></param>
        /// /// <param Name="Name"></param>
        /// <returns></returns>
        [HttpPost("UpdateProjectData")]
        public async Task<ActionResult> UpdateProjectData(ProjectRootRelation model)
        {
            return Ok(await _helper.UpdateProjectData(model));
        }

        /// <summary>
        ///  Delete Root Relation By Id  and Parent Id
        /// </summary>
        /// <param Id="Id"></param>
        /// <param ParentId="ParentId"></param>
        /// <returns></returns>
        [HttpPost("DeleteProjectData")]
        public async Task<ActionResult> DeleteProjectData(ProjectRootRelation model)
        {
            return Ok(await _helper.DeleteProjectData(model));
        }

        /// <summary>
        /// Add Performance File
        /// </summary>
        /// <param Dto_AddPerformance="Dto_AddPerformance"></param>
        /// <returns></returns>
        [HttpPost("AddPerformanceFile")]
        public async Task<ActionResult> AddPerformanceFile([FromForm] Dto_AddPerformance model)
        {
            return Ok(await _helper.AddPerformanceFile(model));
        }

        /// <summary>
        /// Get Performance File By Id RootId
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetPerformanceFileByRootId")]
        public async Task<ActionResult> GetPerformanceFileByRootId(int RootId)
        {
            return Ok(await _helper.GetPerformanceFileByRootId(RootId));
        }

        /// <summary>
        ///  Delete Performance File By Id
        /// </summary>
        /// <param Id="Id"></param>
        /// <returns></returns>
        [HttpPost("DeletePerformanceFile")]
        public async Task<ActionResult> DeletePerformanceFile(int Id)
        {
            return Ok(await _helper.DeletePerformanceFile(Id));
        }

        /// <summary>
        /// Add Location
        /// </summary>
        /// <param PerformanceLocation="PerformanceLocation"></param>
        /// <returns></returns>
        [HttpPost("AddLocation")]
        public async Task<ActionResult> AddLocation(PerformanceLocation model)
        {
            return Ok(await _helper.AddLocation(model));
        }

        /// <summary>
        /// Get Location By PerformanceFileId
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetLocationByPerformanceFileId")]
        public async Task<ActionResult> GetLocationByPerformanceFileId(int PerformanceFileId)
        {
            return Ok(await _helper.GetLocationByPerformanceFileId(PerformanceFileId));
        }

        /// <summary>
        ///  Delete Performance File By Id
        /// </summary>
        /// <param Id="Id"></param>
        /// <returns></returns>
        [HttpPost("DeleteLocation")]
        public async Task<ActionResult> DeleteLocation(int Id)
        {
            return Ok(await _helper.DeleteLocation(Id));
        }

        /// <summary>
        /// Add Property
        /// </summary>
        /// <param PerformanceProperties = "PerformanceProperties"></param>
        /// <returns></returns>
        [HttpPost("AddProperty")]
        public async Task<ActionResult> AddProperty(PerformanceProperties model)
        {
            return Ok(await _helper.AddProperty(model));
        }

        /// <summary>
        /// Get Property By PerformanceFileId
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetPropertyByPerformanceFileId")]
        public async Task<ActionResult> GetPropertyByPerformanceFileId(int PerformanceFileId)
        {
            return Ok(await _helper.GetPropertyByPerformanceFileId(PerformanceFileId));
        }

        /// <summary>
        ///  Delete Property By Id
        /// </summary>
        /// <param Id="Id"></param>
        /// <returns></returns>
        [HttpPost("DeleteProperties")]
        public async Task<ActionResult> DeleteProperties(int Id)
        {
            return Ok(await _helper.DeleteProperties(Id));
        }

        /// <summary>
        /// Add Test Data
        /// </summary>
        /// <param Dto_AddTestData="Dto_AddTestData"></param>
        /// <returns></returns>
        [HttpPost("AddTestData")]
        public async Task<ActionResult> AddTestData([FromForm] Dto_AddTestData model)
        {
            return Ok(await _helper.AddTestData(model));
        }

        /// <summary>
        /// Get Test Data By PerformanceFileId
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetTestDataByPerformanceFileId")]
        public async Task<ActionResult> GetTestDataByPerformanceFileId(int PerformanceFileId)
        {
            return Ok(await _helper.GetTestDataByPerformanceFileId(PerformanceFileId));
        }

        /// <summary>
        /// Delete Test Data
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpPost("DeleteTestData")]
        public async Task<ActionResult> DeleteTestData(int Id)
        {
            return Ok(await _helper.DeleteTestData(Id));
        }

        /// <summary>
        /// Add Load Test Data
        /// </summary>
        /// <param name="loadData"></param>
        /// <returns></returns>
        [HttpPost("AddUpdateLoadData")]
        public async Task<ActionResult> AddUpdateLoadData(Dto_Load loadData)
        {
            return Ok(await _helper.AddUpdateLoadData(loadData));
        }

        /// <summary>
        /// Get Load By PerformanceFileId
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetLoadByPerformanceFileId")]
        public async Task<ActionResult> GetLoadByPerformanceFileId(int PerformanceFileId)
        {
            return Ok(await _helper.GetLoadByPerformanceFileId(PerformanceFileId));
        }

        /// <summary>
        /// Delete Load Test Data
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpPost("DeleteLoadData")]
        public async Task<ActionResult> DeleteLoadData(int Id)
        {
            return Ok(await _helper.DeleteLoadTestData(Id));
        }

        /// <summary>
        /// Execute Performance JMX
        /// </summary>
        /// <param name="Dto_LoadExecuteResponse"></param>
        /// <returns></returns>
        [HttpPost("ExecutePerformanceJMX")]
        public async Task<ActionResult> ExecutePerformanceJMX(Dto_LoadExecuteResponse model)
        {
            return Ok(await _helper.ExecutePerformanceJMX(model));
        }

        /// <summary>
        /// Update Location  Data
        /// </summary>
        /// <param name="PerformanceLocation"></param>
        /// <returns></returns>
        [HttpPost("UpdateLoaction")]
        public async Task<ActionResult> UpdateLoaction(PerformanceLocation model)
        {
            return Ok(await _helper.UpdateLoaction(model));
        }

        /// <summary>
        /// Update Location  Data
        /// </summary>
        /// <param name="PerformanceLocation"></param>
        /// <returns></returns>
        [HttpPost("AddExecuterData")]
        public async Task<ActionResult> AddExecuterData(Dto_LoadExecuteResponse model)
        {
            return Ok(await _helper.AddExecuterData(model));
        }

        /// <summary>
        /// Get Executed Performance Data By RootId
        /// </summary>
        ///  <param name="RootId"></param>
        /// <returns></returns>
        [HttpGet("GetExecutedPerformanceByRootId")]
        public async Task<ActionResult> GetExecutedPerformanceByRootId(int RootId)
        {
            return Ok(await _helper.GetExecutedPerformanceByRootId(RootId));
        }

        /// <summary>
        /// Get Executed Performance Data By ClientId
        /// </summary>
        ///  <param name="ClientId"></param>
        /// <returns></returns>
        [HttpGet("stp_GetExecutedPerformanceByClientId")]
        public async Task<ActionResult> stp_GetExecutedPerformanceByClientId(string ClientId)
        {
            return Ok(await _helper.stp_GetExecutedPerformanceByClientId(ClientId));
        }

        /// <summary>
        /// Get Location List
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetLocationList")]
        public async Task<ActionResult> GetLocationList()
        {
            return Ok(await _helper.GetLocationList());
        }
    }
}
