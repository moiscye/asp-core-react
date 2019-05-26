using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Boilerplate.Web.App.Models
{
    public class Store
    {
        public Store()
        {
            Sales = new HashSet<Sales>();
        }
        [Required]
        public int Id { get; set; }
        [StringLength(255)]
        [Required]
        public string Name { get; set; }
        [StringLength(255)]
        [Required]
        public string Address { get; set; }

        public ICollection<Sales> Sales { get; set; }
    }
}
