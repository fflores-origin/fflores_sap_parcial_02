using SAP.Data;
using SAP.Data.Interfaces;

namespace SAP.API.Bootstrap
{
    public static class DataDependencyInjection
    {
        public static void AddDataDependencyInjection(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddSingleton<IDataContext, DataContext>()
                .AddSingleton<ILocationRepository, LocationsRepository>();
        }
    }
}