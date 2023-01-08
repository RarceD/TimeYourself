using Microsoft.JSInterop.Infrastructure;
using TimeYourselfBack.Models;
using TimeYourselfBack.Repositories;
using TimeYourselfBack.Repositories.Models;

namespace TimeYourselfBack.Service;
public class ManageManagementService : IManageManagementService
{

    private readonly ApplicationDbContext _context;

    public ManageManagementService(ApplicationDbContext context)
    {
        _context = context;
    }
    public bool AddMetting(ManageDto dto, int userId)
    {
        try
        {
            Visualizer newEntry = new()
            {
                UserId = userId,
                ConfigId = dto.ConfigId
            };
            if (dto.InsertDate == null)
                newEntry.InsertDate = DateTime.Now.ToString();
            else
                newEntry.InsertDate = dto.InsertDate.ToString()!;

            // Check first if there is not a register with this date and person:
            var maybeExist = _context.Visualizer.Where(x=>x.UserId == userId && x.ConfigId == dto.ConfigId).ToList();
            foreach (var v in maybeExist)
            {
                if (CompareTime(v.InsertDate, dto.InsertDate)) return false;
            }
            
            // If not I add new one:
            _context.Add(newEntry);
            _context.SaveChanges();
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

    public bool RemoveMetting(ManageDto dto, int userId)
    {
        try
        {
            var toRemove = _context.Visualizer.Where(x => x.UserId == userId && x.ConfigId == dto.ConfigId).ToList();
            if (toRemove.Count == 0) return false;

            foreach (var v in toRemove)
            {
                if (CompareTime(v.InsertDate, dto.InsertDate))
                {
                    _context.Remove(v);
                    _context.SaveChanges();
                    return true;
                }
            }
            return false;
        }
        catch (Exception)
        {
            return false;
        }

    }
    private static bool CompareTime(string strDate, DateTime? userDate)
    {
        DateTime dbDate = DateTime.Parse(strDate);
        if (userDate != null)
        {
            DateTime userInfo = (DateTime)userDate;
            return dbDate.Day == userInfo.Day
                && dbDate.Month == userInfo.Month
                && dbDate.Year == userInfo.Year;
        }
        return false;
    }
}
