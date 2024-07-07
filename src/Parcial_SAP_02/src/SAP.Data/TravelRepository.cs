using SAP.Common;
using SAP.Data.Interfaces;

namespace SAP.Data
{
    public class TravelRepository : ITravelRepository
    {
        private IDataContext _context;

        public TravelRepository(
            IDataContext context)
        {
            _context = context;
        }

        public List<Travel> GetLastTenTravelsByTruckCode(string code)
        {
            throw new NotImplementedException();
        }

        public List<Travel> GetTravelingTrucksState()
        {
            throw new NotImplementedException();
        }
    }
}