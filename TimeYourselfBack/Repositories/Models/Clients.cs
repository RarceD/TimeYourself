using System.ComponentModel.DataAnnotations;

namespace TimeYourselfBack.Repositories.Models
{
    public class Clients
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string User { get; set; }
        public string Token { get; set; }
    }
}
