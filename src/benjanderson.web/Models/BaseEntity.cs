//using benjanderson.web.Models;
//using benjanderson.web.Services;
//using MongoDB.Bson.Serialization.Attributes;
//using System;
//using System.Collections.Generic;
//using System.Reflection;

//namespace benjanderson.web.Models
//{
//     [BsonIgnoreExtraElements]
//     public abstract partial class BaseEntity : ParentEntity
//     {
//          public BaseEntity()
//          {
//               GenericAttributes = new List<GenericAttribute>();
//          }

//          public IList<GenericAttribute> GenericAttributes { get; set; }

//          public override bool Equals(object obj)
//          {
//               return Equals(obj as BaseEntity);
//          }

//          private static bool IsTransient(BaseEntity obj)
//          {
//               return obj != null && Equals(obj._id, default(int));
//          }

//          private Type GetUnproxiedType()
//          {
//               return GetType();
//          }

//          public virtual bool Equals(BaseEntity other)
//          {
//               if (other == null)
//                    return false;

//               if (ReferenceEquals(this, other))
//                    return true;

//               if (!IsTransient(this) &&
//                   !IsTransient(other) &&
//                   Equals(_id, other._id))
//               {
//                    var otherType = other.GetUnproxiedType();
//                    var thisType = GetUnproxiedType();
//                    return thisType.IsAssignableFrom(otherType) ||
//                            otherType.IsAssignableFrom(thisType);
//               }

//               return false;
//          }

//          public override int GetHashCode()
//          {
//               if (Equals(_id, default(int)))
//                    return base.GetHashCode();
//               return _id.GetHashCode();
//          }

//          public static bool operator ==(BaseEntity x, BaseEntity y)
//          {
//               return Equals(x, y);
//          }

//          public static bool operator !=(BaseEntity x, BaseEntity y)
//          {
//               return !(x == y);
//          }
//     }
//}
