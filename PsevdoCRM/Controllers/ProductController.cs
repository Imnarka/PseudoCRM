using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using PsevdoCRM.Models;
using System.Data;

namespace PsevdoCRM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ProductController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select * from product ";

            DataTable dt = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WebApiDatabase");
            NpgsqlDataReader myReader;

            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();   
                using (NpgsqlCommand myComman = new NpgsqlCommand(query, myCon))
                {
                    myReader = myComman.ExecuteReader();
                    dt.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(dt);
        }


        [HttpPost]
        public JsonResult Post(Products prod)
        {
            string query = @"insert into Product (name, description, price, total, manufacture) 
                            values
                            (@name, @description, @price, @total, @manufacture)";

            DataTable dt = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WebApiDatabase");
            NpgsqlDataReader myReader;

            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@name", prod.ProductName);
                    myCommand.Parameters.AddWithValue("@description", prod.ProductDescription);
                    myCommand.Parameters.AddWithValue("@price", Convert.ToDecimal(prod.price));
                    myCommand.Parameters.AddWithValue("@total", Convert.ToInt64(prod.total));
                    myCommand.Parameters.AddWithValue("@manufacture", prod.manufacture);
                    myReader = myCommand.ExecuteReader();
                    dt.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added succesfully!");
        }

        [HttpPut]
        public JsonResult Put(Products prod)
        {
            string query = @"update product
                            set 
                            name = @name, 
                            description = @description, 
                            price = @price, 
                            total = @total,
                            manufacture = @manufacture
                            where productid = @ProductID";

            DataTable dt = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WebApiDatabase");
            NpgsqlDataReader myReader;

            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ProductID", prod.ProductID);
                    myCommand.Parameters.AddWithValue("@name", prod.ProductName);
                    myCommand.Parameters.AddWithValue("@description", prod.ProductDescription);
                    myCommand.Parameters.AddWithValue("@price", Convert.ToDecimal(prod.price));
                    myCommand.Parameters.AddWithValue("@total", Convert.ToInt64(prod.total));
                    myCommand.Parameters.AddWithValue("@manufacture", prod.manufacture);
                    myReader = myCommand.ExecuteReader();
                    dt.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated succesfully!");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"delete from Product where ProductID=@ProductID";

            DataTable dt = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WebApiDatabase");
            NpgsqlDataReader myReader;

            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ProductID", id);
                    myReader = myCommand.ExecuteReader();
                    dt.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted succesfully!");
        }
    }
}
