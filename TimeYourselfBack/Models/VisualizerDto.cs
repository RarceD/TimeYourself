﻿namespace TimeYourselfBack.Models
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
}