using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using PsevdoCRM.Models;
using System.Data;

namespace PsevdoCRM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ClientsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select * from clients ";

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
        public JsonResult Post(Clients cl)
        {
            string query = @"insert into clients (full_name, phone, adress)
                            values
                            (@full_name, @phone, @adress)";

            DataTable dt = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WebApiDatabase");
            NpgsqlDataReader myReader;

            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@full_name", cl.full_name);
                    myCommand.Parameters.AddWithValue("@phone", cl.phone);
                    myCommand.Parameters.AddWithValue("@adress", cl.adress);
                    myReader = myCommand.ExecuteReader();
                    dt.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added succesfully!");
        }

        [HttpPut]
        public JsonResult Put(Clients cl)
        {
            string query = @"update clients
                            set 
                            full_name= @full_name, 
                            phone = @phone, 
                            adress = @adress
                            where id_client = @id_client";

            DataTable dt = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WebApiDatabase");
            NpgsqlDataReader myReader;

            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id_client", cl.id_client);
                    myCommand.Parameters.AddWithValue("@full_name", cl.full_name);
                    myCommand.Parameters.AddWithValue("@phone", cl.phone);
                    myCommand.Parameters.AddWithValue("@adress", cl.adress);
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
            string query = @"delete from clients where id_client=@id_client";

            DataTable dt = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WebApiDatabase");
            NpgsqlDataReader myReader;

            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id_client", id);
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
