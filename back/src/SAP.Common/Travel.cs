using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAP.Common
{
    public class Travel
    {
        public Travel()
        {
            Route = [];
        }
        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime FinishedOn { get; set; }
        public int TruckId { get; set; }
        public int OriginId { get; set; }

        public List<TravelRoute> Route { get; set; }
        public Location Location { get; set; }
        public Truck Truck { get; set; }
    }
}