using SAP.Common;
using SAP.Common.DTOs;
using SAP.Core.Interfaces;
using SAP.Data.Interfaces;
using SAP.Services.Interfaces;

namespace SAP.Core
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepository _locationRepository;
        private readonly ITravelResolverService _travelResolverService;

        public LocationService(
            ILocationRepository locationRepository,
            ITravelResolverService travelResolverService)
        {
            _locationRepository = locationRepository;
            _travelResolverService = travelResolverService;
        }

        public List<Distances> GetAllDistances()
        {
            return _locationRepository.GetAllDistances();
        }

        public List<Location> GetAllLocations()
        {
            return _locationRepository.GetAllLocations();
        }

        public List<int> GetShortest()
        {
            var distances = _locationRepository.GetAllDistances().ToList();
            var shortestRoute = _travelResolverService.GetShortestRoute(distances);
            return shortestRoute;
        }

        public List<int> GetShortest(int origin, int destiny)
        {
            var distances = _locationRepository.GetAllDistances().ToList();
            var shortestRoute = _travelResolverService.GetShortestRouterByOriginAndDestiny(distances, origin, destiny);
            return shortestRoute;
        }

        public ShortestRouteDTO GetShortest(int origin)
        {
            var distances = _locationRepository.GetAllDistances().ToList();
            var (shortestRoute, shortestDistance) = _travelResolverService.GetShortestRouteByOrigin(distances, origin);
            return new ShortestRouteDTO() { ShortestDistance = shortestDistance, ShortestRoute = shortestRoute };
        }
    }
}