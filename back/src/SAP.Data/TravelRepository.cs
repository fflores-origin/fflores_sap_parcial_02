using SAP.Common;
using SAP.Data.Interfaces;
using System.Data.SqlClient;

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
            using SqlConnection conn = _context.GetSqlConnection();
            conn.Open();
            var query = $@"select top(10)
	                           t.id,
	                           t.created_on, 
	                           t.finished_on, 
	                           t.truck_id, 
	                           t.origin_id,
                               l.[name] location_name,
	                           tr.code,
	                           tr.status_id truck_status_id,
	                           ts.[description] truck_status_description
                           from travels t
                           inner join trucks tr on tr.id = t.truck_id
                           inner join truck_status ts on ts.id = tr.status_id
                           inner join locations l on l.id = t.origin_id
                           where tr.code = '{code}'
                           order by t.created_on desc";

            var list = new List<Travel>();

            using (var command = new SqlCommand(query, conn))
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    list.Add(new Travel()
                    {
                        Id = reader.GetInt32(0),
                        CreatedOn = reader.GetDateTime(1),
                        FinishedOn = reader.GetDateTime(2),
                        TruckId = reader.GetInt32(3),
                        OriginId = reader.GetInt32(4),
                        Location = new Location() { Id = reader.GetInt32(4), Name = reader.GetString(5) },
                        Truck = new Truck() { Id = reader.GetInt32(3), Code = reader.GetString(6) },
                        Route = new List<TravelRoute>()

                    });
                }
            }

            return list; ;
        }

        public List<Travel> GetTravelingTrucksState()
        {
            throw new NotImplementedException();
        }
    }
}