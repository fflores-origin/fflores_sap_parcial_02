using System.Data.SqlClient;
using SAP.Common;
using SAP.Data.Interfaces;

namespace SAP.Data
{
    public class LocationsRepository : ILocationsRepository
    {
        private IDataContext _context;

        public LocationsRepository(IDataContext context)
        {
            _context = context;
        }

        public List<Distances> GetAllDistances()
        {
            using SqlConnection conn = _context.GetSqlConnection();
            conn.Open();
            var query = "select id, origin_id, destiny_id, distance from distances";

            var list = new List<Distances>();

            using (var command = new SqlCommand(query, conn))
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    list.Add(new Distances()
                    {
                        Id = reader.GetInt32(0),
                        OriginId = reader.GetInt32(1),
                        DestinyId = reader.GetInt32(2),
                        Distance = reader.GetInt32(3),
                    });
                }
            }

            return list;
        }

        public List<Location> GetAllLocations()
        {
            using SqlConnection conn = _context.GetSqlConnection();
            conn.Open();
            var query = "select id, [name] from locations";

            var list = new List<Location>();

            using (var command = new SqlCommand(query, conn))
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    list.Add(new Location()
                    {
                        Id = reader.GetInt32(0),
                        Name = reader.GetString(1),
                    });
                }
            }

            return list;
        }
    }
}