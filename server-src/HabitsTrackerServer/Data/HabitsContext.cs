using HabitsTrackerServer.Models;
using Microsoft.EntityFrameworkCore;

namespace HabitsTrackerServer.Data
{
    public class HabitsContext : DbContext
    {
        public HabitsContext(DbContextOptions<HabitsContext> options)
            : base(options)
        {
        }

        public DbSet<Habit> Habits { get; set; }
    }
}
