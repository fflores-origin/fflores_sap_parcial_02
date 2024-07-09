using System.Data.SqlClient;
using SAP.Common;
using SAP.Data.Helpers;
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
            using SqlConnection conn = _context.GetSqlConnection();
            conn.Open();
            var travels = new List<Travel>();
            var query = $@"EXEC get_travels_by_code @code = N'{code}'";
            using (var command = new SqlCommand(query, conn))
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    var travel = new Travel
                    {
                        Id = reader.AsInt("id"),
                        CreatedOn = reader.AsDateTime("created_on").Value,
                        FinishedOn = reader.AsDateTime("finished_on"),
                        TruckId = reader.AsInt("truck_id"),
                        OriginId = reader.AsInt("origin_id"),
                        Location = new Location()
                        {
                            Id = reader.AsInt("origin_id"),
                            Name = reader.AsString("location_name")
                        },
                        Truck = new Truck()
                        {
                            Id = reader.AsInt("truck_id"),
                            Code = reader.AsString("code")
                        }
                    };

                    travels.Add(travel);
                }

                if (reader.NextResult())
                {
                    var routes = new List<TravelRoute>();

                    while (reader.Read())
                    {
                        var route = new TravelRoute
                        {
                            Id = reader.AsInt("id"),
                            LocationId = reader.AsInt("location_id"),
                            Order = reader.AsInt("order"),
                            TravelId = reader.AsInt("travel_id"),
                            Actual = reader.AsBoolean("actual"),
                        };

                        routes.Add(route);
                    }

                    foreach (var travel in travels)
                        travel.Route = routes.Where(x => x.TravelId == travel.Id).OrderBy(x => x.Order).ToList();
                }
            }

            return travels;
        }

        public List<Travel> GetTravelingTrucksState()
        {
            using SqlConnection conn = _context.GetSqlConnection();
            conn.Open();
            var travels = new List<Travel>();
            var query = $@"EXEC get_travels_on_going";
            using (var command = new SqlCommand(query, conn))
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    var travel = new Travel
                    {
                        Id = reader.AsInt("id"),
                        CreatedOn = reader.AsDateTime("created_on").Value,
                        FinishedOn = reader.AsDateTime("finished_on"),
                        TruckId = reader.AsInt("truck_id"),
                        OriginId = reader.AsInt("origin_id"),
                        Location = new Location()
                        {
                            Id = reader.AsInt("origin_id"),
                            Name = reader.AsString("location_name")
                        },
                        Truck = new Truck()
                        {
                            Id = reader.AsInt("truck_id"),
                            Code = reader.AsString("code")
                        }
                    };

                    travels.Add(travel);
                }

                if (reader.NextResult())
                {
                    var routes = new List<TravelRoute>();

                    while (reader.Read())
                    {
                        var route = new TravelRoute
                        {
                            Id = reader.AsInt("id"),
                            LocationId = reader.AsInt("location_id"),
                            Order = reader.AsInt("order"),
                            TravelId = reader.AsInt("travel_id"),
                            Actual = reader.AsBoolean("actual"),
                        };

                        routes.Add(route);
                    }

                    foreach (var travel in travels)
                        travel.Route = routes.Where(x => x.TravelId == travel.Id).OrderBy(x => x.Order).ToList();
                }
            }

            return travels;
        }
    }
}