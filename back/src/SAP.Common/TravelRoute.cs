namespace SAP.Common
{
    public class TravelRoute
    {
        public int Id { get; set; }
        public int TravelId { get; set; }
        public int LocationId { get; set; }
        public int Order { get; set; }
        public bool Actual { get; set; }

        public Travel Travel { get; set; }
        public Location Location { get; set; }
    }
}