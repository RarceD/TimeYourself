﻿using TimeYourselfBack.Models;

namespace TimeYourselfBack.Service
{
    public interface IVisualizerManagementService
    {
        bool AddVisualizerRegister(int userId, int configId);
    }
}