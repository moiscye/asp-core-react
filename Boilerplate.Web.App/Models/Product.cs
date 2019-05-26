using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Boilerplate.Web.App.Models
{
    public partial class Product
    {
        public Product()
        {
            Sales = new HashSet<Sales>();
        }
        [Required]
        public int Id { get; set; }
        [StringLength(255)]
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal Price { get; set; }

        public ICollection<Sales> Sales { get; set; }
    }
}
