using System.Data.SqlClient;
using SAP.Common;
using SAP.Data.Interfaces;

namespace SAP.Data
{
    public class TrucksRepository : ITrucksRepository
    {
        private IDataContext _context;

        public TrucksRepository(IDataContext context)
        {
            _context = context;
        }

        public List<Truck> GetAll()
        {
            using SqlConnection conn = _context.GetSqlConnection();
            conn.Open();
            var query = @"select
	                          t.id,
	                          t.code,
	                          ts.id as status_id,
	                          ts.[description] as status_description
                          from trucks t
	                          join truck_status ts on
		                          t.status_id = ts.id";

            var list = new List<Truck>();

            using (var command = new SqlCommand(query, conn))
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    list.Add(new Truck()
                    {
                        Id = reader.GetInt32(0),
                        Code = reader.GetString(1),
                        StatusId = reader.GetInt32(2),
                        Status = new TruckStatus()
                        {
                            Id = reader.GetInt32(2),
                            Description = reader.GetString(3)
                        }
                    });
                }
            }

            return list;
        }

        public List<Truck> GetAllByStatus(int statusId)
        {
            using SqlConnection conn = _context.GetSqlConnection();
            conn.Open();
            var query = $@"select
	                          t.id,
	                          t.code,
	                          ts.id as status_id,
	                          ts.[description] as status_description
                          from trucks t
	                          join truck_status ts on
		                          t.status_id = ts.id
                          where t.status_id = {statusId}";

            var list = new List<Truck>();

            using (var command = new SqlCommand(query, conn))
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    list.Add(new Truck()
                    {
                        Id = reader.GetInt32(0),
                        Code = reader.GetString(1),
                        StatusId = reader.GetInt32(2),
                        Status = new TruckStatus()
                        {
                            Id = reader.GetInt32(2),
                            Description = reader.GetString(3)
                        }
                    });
                }
            }

            return list;
        }

        public Truck GetByCode(string code)
        {
            using SqlConnection conn = _context.GetSqlConnection();
            conn.Open();
            var query = $@"select
	                          t.id,
	                          t.code,
	                          ts.id as status_id,
	                          ts.[description] as status_description
                          from trucks t
	                          join truck_status ts on
		                          t.status_id = ts.id
                          where t.code = '{code}'";

            Truck item = null;

            using (var command = new SqlCommand(query, conn))
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    item = new Truck()
                    {
                        Id = reader.GetInt32(0),
                        Code = reader.GetString(1),
                        StatusId = reader.GetInt32(2),
                        Status = new TruckStatus()
                        {
                            Id = reader.GetInt32(2),
                            Description = reader.GetString(3)
                        }
                    };
                }
            }

            return item;
        }
    }
}