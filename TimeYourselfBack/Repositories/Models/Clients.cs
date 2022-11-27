using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace TimeYourselfBack.Repositories.Models
{
    public class Clients
    {
        [Key]
        public int Id { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string User { get; set; }
        [DataMember]
        public string Token { get; set; }
    }
}
