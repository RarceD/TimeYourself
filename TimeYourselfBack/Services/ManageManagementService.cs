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
            Visualizer newEntry = new();
            newEntry.UserId = userId;
            newEntry.ConfigId = dto.ConfigId;
            if (dto.InsertDate == null)
                newEntry.InsertDate = DateTime.Now.ToString();
            else
                newEntry.InsertDate = dto.InsertDate.ToString()!;
            _context.Add(newEntry);
            _context.SaveChanges();
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public bool RemoveMetting(ManageDto dto, int userId)
    {
        try
        {
            // TODO: Insert Data must be taken in consideration
            IEnumerable<Visualizer> toRemove = _context.Visualizer.Where(x => x.UserId == userId && x.ConfigId == dto.ConfigId).ToList();
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
        catch (Exception ex)
        {
            return false;
        }

    }
    private bool CompareTime(string strDate, DateTime? userDate)
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
