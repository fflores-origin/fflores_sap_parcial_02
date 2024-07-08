using SAP.Services.Interfaces;
using SAP.Services;

namespace SAP.API.Bootstrap
{
    public static class ServicesDependencyInjection
    {
        public static void AddServicesDependencyInjection(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddSingleton<ITravelResolverService, TravelResolverService>();
        }
    }
}