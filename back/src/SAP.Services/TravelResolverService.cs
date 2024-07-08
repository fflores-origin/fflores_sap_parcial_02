using SAP.Common;
using SAP.Services.Interfaces;

namespace SAP.Services
{
    public class TravelResolverService : ITravelResolverService
    {
        public TravelResolverService()
        {
        }

        public List<int> GetShortestRouterByOriginAndDestiny(List<Distances> distances, int origin, int destiny)
        {
            var cities = GetDistinctCities(distances)
                .Where(x => x != origin && x != destiny)
                .ToList();

            var result = ResolveShortestTravel(origin, destiny, cities, distances);
            return result.shortestRoute;
        }

        public List<int> GetShortestRoute(List<Distances> distances)
        {
            var cities = GetDistinctCities(distances);
            var result = ResolveShortestTravel(cities, distances);
            return result.shortestRoute;
        }

        public (List<int> shortestRoute, List<int> shortestDistance) GetShortestRouteByOrigin(List<Distances> distances, int origin)
        {
            var cities = GetDistinctCities(distances)
                .Where(x => x != origin)
                .ToList();

            var result = ResolveShortestTravel(origin, cities, distances);
            return result;
        }

        private static List<int> GetDistinctCities(List<Distances> distances)
            => distances.SelectMany(d => new[] { d.OriginId, d.DestinyId }).Distinct().ToList();

        private static (List<int> shortestRoute, List<int> shortestDistance) ResolveShortestTravel(int origin, List<int> cities, List<Distances> distances)
        {
            var routes = new List<List<int>>();
            Exchange(cities, 0, cities.Count - 1, routes);

            List<int> shortestRoute = [];
            List<int> shortestDistances = [];
            int shortestDistance = int.MaxValue;

            foreach (var route in routes)
            {
                var fullRoute = new List<int> { origin };
                fullRoute.AddRange(route);
                fullRoute.Add(origin);

                var resultado = CalculateDistance(fullRoute, distances);
                int distanciaTotal = resultado.Item1;
                if (distanciaTotal < shortestDistance)
                {
                    shortestDistance = distanciaTotal;
                    shortestRoute = new List<int>(fullRoute);
                    shortestDistances = new List<int>(resultado.Item2);
                }
            }

            return (shortestRoute, shortestDistances);
        }

        private static (List<int> shortestRoute, List<int> shortestDistance) ResolveShortestTravel(List<int> cities, List<Distances> distances)
        {
            var routes = new List<List<int>>();

            Exchange(cities, 0, cities.Count - 1, routes);

            List<int> shortestRoute = [];
            List<int> shortestDistances = [];
            int shortestDistance = int.MaxValue;

            foreach (var route in routes)
            {
                var result = CalculateDistance(route, distances);
                int totalDistance = result.totalDistance;
                if (totalDistance < shortestDistance)
                {
                    shortestDistance = totalDistance;
                    shortestRoute = new List<int>(route);
                    shortestDistances = new List<int>(result.distanceBetweenCities);
                }
            }

            return (shortestRoute, shortestDistances);
        }

        private static (List<int> shortestRoute, List<int> shortestDistance) ResolveShortestTravel(int origin, int destiny, List<int> cities, List<Distances> distances)
        {
            var routes = new List<List<int>>();

            Exchange(cities, 0, cities.Count - 1, routes);

            List<int> shortestRoute = [];
            List<int> shortestDistances = [];
            int shortestDistance = int.MaxValue;

            foreach (var route in routes)
            {
                route.Insert(0, origin);
                route.Add(destiny);
                var result = CalculateDistanceWithOriginAndDestiny(route, distances);
                int totalDistance = result.totalDistance;
                if (totalDistance < shortestDistance)
                {
                    totalDistance = shortestDistance;
                    shortestRoute = new List<int>(route);
                    shortestDistances = new List<int>(result.distanceBetweenCities);
                }
            }

            return (shortestRoute, shortestDistances);
        }

        private static void Exchange(List<int> cities, int left, int right, List<List<int>> routes)
        {
            if (left == right)
            {
                routes.Add(new List<int>(cities));
            }
            else
            {
                for (int i = left; i <= right; i++)
                {
                    SwapCity(cities, left, i);
                    Exchange(cities, left + 1, right, routes);
                    SwapCity(cities, left, i);
                }
            }
        }

        private static void SwapCity(List<int> cities, int i, int j)
        {
            (cities[j], cities[i]) = (cities[i], cities[j]);
        }

        private static (int totalDistance, List<int> distanceBetweenCities) CalculateDistance(List<int> route, List<Distances> distances)
        {
            int totalDistance = 0;
            var distanceBetweenCities = new List<int>();

            for (int i = 0; i < route.Count - 1; i++)
            {
                var segment = distances
                    .FirstOrDefault(d =>
                        (d.OriginId == route[i] && d.DestinyId == route[i + 1]) ||
                        (d.OriginId == route[i + 1] && d.DestinyId == route[i])
                    );
                if (segment == null) return (int.MaxValue, new List<int>());
                totalDistance += segment.Distance;
                distanceBetweenCities.Add(segment.Distance);
            }

            var turn = distances
                .FirstOrDefault(d =>
                    (d.OriginId == route.Last() && d.DestinyId == route.First()) ||
                    (d.OriginId == route.First() && d.DestinyId == route.Last())
                );

            if (turn != null)
            {
                totalDistance += turn.Distance;
                distanceBetweenCities.Add(turn.Distance);
            }

            return (totalDistance, distanceBetweenCities);
        }

        private static (int totalDistance, List<int> distanceBetweenCities) CalculateDistanceWithOriginAndDestiny(List<int> route, List<Distances> distances)
        {
            int totalDistance = 0;
            var distanceBetweenCities = new List<int>();

            for (int i = 0; i < route.Count - 1; i++)
            {
                var segmento = distances
                    .FirstOrDefault(d =>
                        (d.OriginId == route[i] && d.DestinyId == route[i + 1]) ||
                        (d.OriginId == route[i + 1] && d.DestinyId == route[i]));

                if (segmento == null) return (int.MaxValue, new List<int>()); // Si no se encuentra una distancia, se considera infinito
                totalDistance += segmento.Distance;
                distanceBetweenCities.Add(segmento.Distance);
            }

            return (totalDistance, distanceBetweenCities);
        }
    }
}