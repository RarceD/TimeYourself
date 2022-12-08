using TimeYourselfBack.Models;

namespace TimeYourselfBack.Service
{
    public interface IVisualizerManagementService
    {
        List<string> GetVisualizerPeople(int userId, int? configId, DateTime dateTime);
        List<VisualizerLayoutDto> GetCalerdar(int userId, int? configId, int year);
    }
}