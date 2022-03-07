using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DashboardBuilder.Models
{
    public class Dashboard
    {
        public const int MaxNameLength = 1024;

        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(MaxNameLength)]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string Canvas { get; set; }

        public override string ToString()
        {
            var modelString = JsonConvert.SerializeObject(this);
            return modelString;
        }
    }
}
