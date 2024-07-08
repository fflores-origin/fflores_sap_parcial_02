namespace SAP.Common
{
    public class Truck
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public int StatusId { get; set; }
        public TruckStatus Status { get; set; }
    }
}