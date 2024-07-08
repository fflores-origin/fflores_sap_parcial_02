using SAP.Common;

namespace SAP.Services.Interfaces
{
    public interface ITravelResolverService
    {
        List<int> GetShortestRoute(List<Distances> distances);

        List<int> GetShortestRouterByOriginAndDestiny(List<Distances> distances, int origin, int destiny);

        (List<int> shortestRoute, List<int> shortestDistance) GetShortestRouteByOrigin(List<Distances> distances, int origin);
    }
}