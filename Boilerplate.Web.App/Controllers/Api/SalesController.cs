using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Boilerplate.Web.App.Controllers.Api
{
  [Route("api/[controller]")]
  [ApiController]
  public class SalesController : ControllerBase
  {
    private readonly SalesDBContext _context;
    public SalesController(SalesDBContext context)
    {
      _context = context;

      //   if (_context.Sales.Count() == 0)
      //   {
      //     // Create a new TodoItem if collection is empty,
      //     // which means you can't delete all TodoItems.

      //     _context.Sales.Add(new Sales
      //     {
      //       ProductId = 2,
      //       CustomerId = 4,
      //       StoreId = 2,
      //       DateSold = DateTime.Today
      //     });
      //     _context.SaveChanges();
      //   }
    }

    // GET: api/Sales
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Sales>>> GetSales(int page, int numPerPage)
    {
      if (page == -1 & numPerPage == -1)
      {
        return await _context.Sales.Select(sales =>
          new Sales
          {
            Id = sales.Id,
            CustomerId = sales.CustomerId,
            ProductId = sales.ProductId,
            StoreId = sales.StoreId,
            DateSold = sales.DateSold,
            Customer = sales.Customer,
            Product = sales.Product,
            Store = sales.Store
          }
          ).ToListAsync();
      }
      var sales2 = await _context.Sales.Select(sales =>
          new Sales
          {
            Id = sales.Id,
            CustomerId = sales.CustomerId,
            ProductId = sales.ProductId,
            StoreId = sales.StoreId,
            DateSold = sales.DateSold,
            Customer = sales.Customer,
            Product = sales.Product,
            Store = sales.Store
          }
          ).ToListAsync();
      var result = sales2.Skip((page - 1) * numPerPage).Take(numPerPage);
      return Ok(result);



    }


    // GET: api/Sales/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Sales>> GetSales(int id)
    {
      var sale = await _context.Sales.FindAsync(id);

      if (sale == null)
      {
        return NotFound();
      }

      return sale;
    }

    // POST: api/Sales
    [HttpPost]
    public async Task<ActionResult<Sales>> PostTodoItem(Sales sales)
    {
      var existingSale = await _context.Sales.FindAsync(sales.Id);
      if (existingSale != null)
        return BadRequest("Sale already exist");


      _context.Sales.Add(sales);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetSales), new { id = sales.Id }, sales);
    }


    // PUT: api/Sales/
    [HttpPut("{id}")]
    public async Task<IActionResult> PutSales(int id, Sales item)
    {

      var existingSale = await _context.Sales.FindAsync(id);
      Console.WriteLine("Sales id is looking : " + id);
      //
      if (existingSale == null)
      {
        Console.WriteLine("Sales id is looking : " + id);
        return BadRequest();
      }

      existingSale.CustomerId = item.CustomerId;
      existingSale.ProductId = item.ProductId;
      existingSale.StoreId = item.StoreId;
      existingSale.DateSold = item.DateSold;

      _context.Sales.Update(existingSale);
      await _context.SaveChangesAsync();
      return Ok(existingSale);
      //            if (id != item.Id)//fix this one to query the db
      //            {
      //                return BadRequest();
      //            }
      //
      //            _context.Entry(item).State = EntityState.Modified;
      //            await _context.SaveChangesAsync();
      //
      //            return NoContent();
    }

    // DELETE: api/Saless
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSale(int id)
    {
      var item = await _context.Sales.FindAsync(id);

      if (item == null)
      {
        return NotFound();
      }

      _context.Sales.Remove(item);
      await _context.SaveChangesAsync();

      return Ok("Deleted");
    }


  }
}
