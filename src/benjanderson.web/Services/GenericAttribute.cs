﻿using MongoDB.Bson.Serialization.Attributes;

namespace benjanderson.web.Services
{
     [BsonIgnoreExtraElements]
     public partial class GenericAttribute
     {
          /// <summary>
          /// Gets or sets the entity identifier
          /// </summary>
          //public string EntityId { get; set; }

          /// <summary>
          /// Gets or sets the key group
          /// </summary>
          //public string KeyGroup { get; set; }

          /// <summary>
          /// Gets or sets the key
          /// </summary>
          public string Key { get; set; }

          /// <summary>
          /// Gets or sets the value
          /// </summary>
          public string Value { get; set; }

          /// <summary>
          /// Gets or sets the store identifier
          /// </summary>
          public string StoreId { get; set; }

     }
}
