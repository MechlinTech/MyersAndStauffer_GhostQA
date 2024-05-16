namespace SeleniumReportAPI.DTO_s
{
    public class Dto_UserOrganization
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Description { get; set; }
        public IFormFile BinaryData { get; set; }
    }
}
