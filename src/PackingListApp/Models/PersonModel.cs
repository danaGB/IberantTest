using System.ComponentModel.DataAnnotations;

namespace PackingListApp.Models
{
    public class PersonModel
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string LastName { get; set; }

        public string Occupation { get; set; }
    }
}
