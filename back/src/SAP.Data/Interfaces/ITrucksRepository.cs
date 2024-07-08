using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SAP.Common;

namespace SAP.Data.Interfaces
{
    public interface ITrucksRepository
    {
        List<Truck> GetAll();

        Truck GetByCode(string code);

        List<Truck> GetAllByStatus(int statusId);
    }
}