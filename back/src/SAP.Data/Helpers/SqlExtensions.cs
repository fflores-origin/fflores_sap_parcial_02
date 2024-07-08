using System.Data;
using System.Data.SqlClient;

namespace SAP.Data.Helpers
{
    public static class SqlExtensions
    {
        public static Int32 AsInt(this SqlDataReader reader, string columnName)
            => reader.GetInt32(reader.GetOrdinal(columnName));

        public static string AsString(this SqlDataReader reader, string columnName)
            => reader.GetString(reader.GetOrdinal(columnName));

        public static DateTime AsDateTime(this SqlDataReader reader, string columnName)
            => reader.GetDateTime(reader.GetOrdinal(columnName));

        public static bool AsBoolean(this SqlDataReader reader, string columnName)
            => reader.GetBoolean(reader.GetOrdinal(columnName));
    }
}