using TimeYourselfBack.Models;

namespace TimeYourselfBack.Service
{
    public interface IManageManagementService
    {
        bool AddMetting(ManageDto manage, int userId);
        bool RemoveMetting(ManageDto manage, int userId);
    }
}