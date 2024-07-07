using System.Data.SqlClient;

namespace SAP.Data.Interfaces
{
    public interface IDataContext
    {
        string GetConnection();

        SqlConnection GetSqlConnection();
    }
}