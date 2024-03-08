using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
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

    }
}
