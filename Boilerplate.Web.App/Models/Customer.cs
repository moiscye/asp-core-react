using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Boilerplate.Web.App.Models
{
    public partial class Customer
    {
        public Customer()
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
