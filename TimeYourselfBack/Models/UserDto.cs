using Microsoft.AspNetCore.Mvc;

namespace TimeYourselfBack.Models
{
    public class UserDto
    {
        public int? Id { get; set; }
        public string UserNumber {get; set;}
        public string? Token {get; set;}
    }
}
