using SAP.Core.Interfaces;
using SAP.Core;

namespace SAP.API.Bootstrap
{
    public static class CoreDependencyInjection
    {
        public static void AddCoreDependencyInjection(this IServiceCollection services, IConfiguration configuration)
        {
            // core
            services
                .AddSingleton<ILocationService, LocationService>();
        }
    }
}