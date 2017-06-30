using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace benjanderson.web.Services
{
    public interface IConnectionStringFactory
    {
          string ConnectionString { get; set; }

          string Database { get; set; }
    }
}
