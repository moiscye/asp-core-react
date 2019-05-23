using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Boilerplate.Web.App.Controllers.Api
{


    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly SalesDBContext _context;

        public ProductsController(SalesDBContext context)
        {
            _context = context;
            if (_context.Product.Count() == 0)
            {
                // Create a new TodoItem if collection is empty,
                // which means you can't delete all TodoItems.
                
                _context.Product.Add(new Product { Name = "Item1", Price = 2});
                _context.SaveChanges();
            }
        }


        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Product.ToListAsync();
        }


        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Product.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // POST: api/Products
            [HttpPost]
        public async Task<ActionResult<Product>> PostTodoItem(Product product)
        {
            _context.Product.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }


        // PUT: api/Products/
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product item)
        {
            if (id != item.Id)//fix this one to query the db
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Todo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var item = await _context.Product.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            _context.Product.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}