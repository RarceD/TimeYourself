using TimeYourselfBack.Models;

namespace TimeYourselfBack.Service
{
    public interface IVisualizerManagementService
    {
        bool AddVisualizerRegister(int userId, int configId);
        List<VisualizerDto> GetCalerdar(VisualizerDto dto);
        VisualizerLayoutDto GetCalerdarTest(int userId, int? configId);
    }
}