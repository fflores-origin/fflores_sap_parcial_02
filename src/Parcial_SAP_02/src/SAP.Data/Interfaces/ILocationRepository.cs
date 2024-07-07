using SAP.Common;

namespace SAP.Data.Interfaces
{
    public interface ILocationRepository
    {
        List<Location> GetAllLocations();

        List<Distances> GetAllDistances();
    }
}