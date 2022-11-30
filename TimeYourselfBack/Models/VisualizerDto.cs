namespace TimeYourselfBack.Models
{
    public class VisualizerDto
    {
        public int? Id { get; set; }
        public int UserId { get; set; }
        public int ConfigId { get; set; }
        public int? Month { get; set; }
        public int? Day { get; set; }
        public int? Year { get; set; }
    }


    public class VisualizerDayDto
    {
        public int Id { get; set; }
        public string Person { get; set; }
    }
    public class VisualizerMonthDto
    {
        public int Id { get; set; }
        public List<VisualizerDayDto> Days { get; set; }
    }
    public class VisualizerLayoutDto
    {
        public int UserId { get; set; }
        public List<VisualizerMonthDto> Months { get; set; }
    }

}
