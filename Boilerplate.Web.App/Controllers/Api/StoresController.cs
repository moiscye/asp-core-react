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
  public class StoresController : ControllerBase
  {
    private readonly SalesDBContext _context;

    public StoresController(SalesDBContext context)
    {
      _context = context;
      if (_context.Store.Count() == 0)
      {
        // Create a new TodoItem if collection is empty,
        // which means you can't delete all TodoItems.

        _context.Store.Add(new Store { Name = "Item1", Address = "main" });
        _context.SaveChanges();
      }
    }

    // GET: api/Stores
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Store>>> GetStores(int page, int numPerPage)
    {
      if (page == -1 & numPerPage == -1)
      {
        return await _context.Store.ToListAsync();
      }
      var store = await _context.Store.ToListAsync();
      var result = store.Skip((page - 1) * numPerPage).Take(numPerPage);
      return Ok(result);

    }


    // GET: api/Stores/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Store>> GetStore(int id)
    {
      var store = await _context.Store.FindAsync(id);

      if (store == null)
      {
        return NotFound();
      }

      return store;
    }

    // POST: api/Stores
    [HttpPost]
    public async Task<ActionResult<Store>> PostTodoItem(Store store)
    {
      _context.Store.Add(store);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetStore), new { id = store.Id }, store);
    }


    // PUT: api/Stores/
    [HttpPut("{id}")]
    public async Task<IActionResult> PutStore(int id, Store item)
    {
      if (id != item.Id)//fix this one to query the db
      {
        return BadRequest();
      }

      _context.Entry(item).State = EntityState.Modified;
      await _context.SaveChangesAsync();

      return NoContent();
    }

    // DELETE: api/Stores
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStore(int id)
    {
      var item = await _context.Store.FindAsync(id);

      if (item == null)
      {
        return NotFound();
      }

      _context.Store.Remove(item);
      await _context.SaveChangesAsync();

      return NoContent();
    }


  }
}
