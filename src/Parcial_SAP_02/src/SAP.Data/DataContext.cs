using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SAP.Data.Interfaces;

namespace SAP.Data
{
    public class DataContext : IDataContext
    {
        private readonly string _connectionString;

        public DataContext(IConfiguration configuration)
        {
            _connectionString = configuration["ConnectionStrings:DataSql"];
        }

        public string GetConnection()
        { return _connectionString; }

        public SqlConnection GetSqlConnection()
            => new(_connectionString);
    }
}