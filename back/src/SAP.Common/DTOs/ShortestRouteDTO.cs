using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAP.Common.DTOs
{
    public class ShortestRouteDTO
    {
        public List<int> ShortestRoute { get; set; }
        public List<int> ShortestDistance { get; set; }
    }
}