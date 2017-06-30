using benjanderson.web.Models;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Security.Authentication;

namespace benjanderson.web.Services
{
     public class MongoDBRepository<T> where T : BaseEntity
     {
          public MongoDBRepository(IConnectionStringFactory connectionStringFactory)
          {
               if (connectionStringFactory == null)
               {
                    throw new ArgumentNullException(nameof(connectionStringFactory));
               }

               if (string.IsNullOrWhiteSpace(connectionStringFactory.ConnectionString))
               {
                    throw new ArgumentException("connection string cannot be null");
               }

               MongoClientSettings settings = MongoClientSettings.FromUrl(new MongoUrl(connectionStringFactory.ConnectionString));
               settings.SslSettings = new SslSettings() { EnabledSslProtocols = SslProtocols.Tls12 };

               var client = new MongoClient(settings);
               if (!string.IsNullOrWhiteSpace(connectionStringFactory.Database))
               {
                    _database = client.GetDatabase(connectionStringFactory.Database);
               }
               else
               {
                    var databaseName = new MongoUrl(connectionStringFactory.ConnectionString).DatabaseName;
                    _database = client.GetDatabase(databaseName);
               }
               _collection = _database.GetCollection<T>(typeof(T).Name);
          }

          protected IMongoDatabase _database;
          public IMongoDatabase Database
          {
               get
               {
                    return _database;
               }
          }

          protected IMongoCollection<T> _collection;
          public IMongoCollection<T> Collection
          {
               get
               {
                    return _collection;
               }
          }

          /// <summary>
          /// Get entity by identifier
          /// </summary>
          /// <param name="id">Identifier</param>
          /// <returns>Entity</returns>
          public virtual T GetById(string id)
          {
               return this._collection.Find(e => e._id.ToString() == id).FirstOrDefaultAsync().Result;
          }

          /// <summary>
          /// Insert entity
          /// </summary>
          /// <param name="entity">Entity</param>
          public virtual T Insert(T entity)
          {
               this._collection.InsertOne(entity);
               return entity;
          }

          /// <summary>
          /// Insert entities
          /// </summary>
          /// <param name="entities">Entities</param>
          public virtual void Insert(IEnumerable<T> entities)
          {
               foreach (var entity in entities)
                    Insert(entity);
          }

          /// <summary>
          /// Update entity
          /// </summary>
          /// <param name="entity">Entity</param>
          public virtual T Update(T entity)
          {
               var update = this._collection.ReplaceOneAsync(x => x._id == entity._id, entity, new UpdateOptions() { IsUpsert = false }).Result;
               return entity;

          }

          /// <summary>
          /// Update entities
          /// </summary>
          /// <param name="entities">Entities</param>
          public virtual void Update(IEnumerable<T> entities)
          {
               foreach (T entity in entities)
               {
                    Update(entity);
               }
          }

          /// <summary>
          /// Delete entity
          /// </summary>
          /// <param name="entity">Entity</param>
          public virtual void Delete(T entity)
          {
               this._collection.FindOneAndDeleteAsync(e => e._id == entity._id);
          }

          /// <summary>
          /// Delete entities
          /// </summary>
          /// <param name="entities">Entities</param>
          public virtual void Delete(IEnumerable<T> entities)
          {
               foreach (T entity in entities)
               {
                    this._collection.FindOneAndDeleteAsync(e => e._id == entity._id);
               }
          }

          public virtual IMongoQueryable<T> Table
          {
               get { return this._collection.AsQueryable(); }
          }
     }
}
