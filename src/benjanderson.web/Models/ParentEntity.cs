using MongoDB.Bson;

namespace benjanderson.web.Models
{
     public abstract class ParentEntity
     {
          public ParentEntity()
          {
               __id = ObjectId.GenerateNewId();
          }

          public ObjectId _id
          {
               get { return __id; }
               set
               {
                    if (value == ObjectId.Empty)
                         __id = ObjectId.GenerateNewId();
                    else
                         __id = value;
               }
          }

          private ObjectId __id;

     }
}
