using benjanderson.web.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;

namespace benjanderson.web.Models
{
     public class ColorTestStats : BaseEntity
     {
          public DateTime Date { get; set; }

          public int Age { get; set; }

          public double Score { get; set; }

          public string Gender { get; set; }

          public int Clicks { get; set; }

          public string IpAddress { get; set; }
     }
}
