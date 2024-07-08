using SAP.Common;
using SAP.Common.DTOs;

namespace SAP.Core.Interfaces
{
    public interface ILocationService
    {
        List<Location> GetAllLocations();

        List<Distances> GetAllDistances();

        List<int> GetShortest();

        List<int> GetShortest(int origin, int destiny);

        ShortestRouteDTO GetShortest(int origin);

        object GetLastTravelsByTruckCode(string code);
    }
}