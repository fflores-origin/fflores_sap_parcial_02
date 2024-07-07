using SAP.Common;

namespace SAP.Data.Interfaces
{
    public interface ITravelRepository
    {
        List<Travel> GetLastTenTravelsByTruckCode(string code);

        List<Travel> GetTravelingTrucksState();
    }
}