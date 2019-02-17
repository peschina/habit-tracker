using System;
using System.Linq;
using HabitsTrackerServer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace HabitsTrackerServer.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new HabitsContext(serviceProvider
                .GetRequiredService<DbContextOptions<HabitsContext>>()))
            {
                if (context.Habits.Any()) return;
                context.Habits.AddRange(
                    new Habit { Name = "Football", InstanceTime = "02:00", TotalTime = "02:00" },
                    new Habit { Name = "Coding", InstanceTime = "03:00", TotalTime = "03:00" }
                );
                context.SaveChanges();
            }
        }
    }
}
