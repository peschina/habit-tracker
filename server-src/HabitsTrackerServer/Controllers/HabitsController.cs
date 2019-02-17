using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HabitsTrackerServer.Data;
using HabitsTrackerServer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HabitsTrackerServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HabitsController : ControllerBase
    {
        private readonly HabitsContext _context;

        public HabitsController(HabitsContext context)
        {
            _context = context;
        }

        // GET: api/habits
        [HttpGet]
        public IEnumerable<Habit> Get() => _context.Habits.ToList();

        // GET: api/habits/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult<Habit>> Get(int id)
        {
            var habit = await _context.Habits.FindAsync(id);

            if (habit == null)
            {
                return NotFound();
            }

            return habit;
        }

        // POST: api/habits
        [HttpPost]
        public async Task<ActionResult<Habit>> Post(Habit habit)
        {
            _context.Habits.Add(habit);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = habit.Id }, habit);
        }

        // PUT: api/habits/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Habit>> Put(int id, Habit habit)
        {
            if (id != habit.Id)
            {
                return BadRequest();
            }

            _context.Entry(habit).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/habits/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Habit>> Delete(int id)
        {
            var habit = await _context.Habits.FindAsync(id);

            if (habit == null)
            {
                return NotFound();
            }

            _context.Habits.Remove(habit);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
