using benjanderson.web.Models;
using System.Linq;
using System.Threading.Tasks;

namespace benjanderson.web.Services
{
     public class MongoDatabase
     {
          public MongoDatabase(string connectionString, string databaseName)
          {
               SetColorTestStats(new MongoDBRepository<ColorTestStats>(connectionString, databaseName));
          }

          private MongoDBRepository<ColorTestStats> colorTestStats;

          public MongoDBRepository<ColorTestStats> GetColorTestStats()
          {
               return colorTestStats;
          }

          private void SetColorTestStats(MongoDBRepository<ColorTestStats> value)
          {
               colorTestStats = value;
          }
     }
}
