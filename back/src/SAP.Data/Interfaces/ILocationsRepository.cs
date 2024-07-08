using SAP.Common;

namespace SAP.Data.Interfaces
{
    public interface ILocationsRepository
    {
        List<Location> GetAllLocations();

        List<Distances> GetAllDistances();
    }
}