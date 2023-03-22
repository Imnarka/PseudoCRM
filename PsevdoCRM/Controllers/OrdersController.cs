using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using PsevdoCRM.Models;
using System.Data;

namespace PsevdoCRM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public OrdersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpGet]
        [Route("mostselling")]
        public JsonResult GetMostSelling()
        {
            string query = @"select product.name, count(*) as deal_count from orders_detail
                            join clients on orders_detail.fk_client = id_client
                            join product on orders_detail.fk_product = productid
                            group by product.name
                            order by deal_count desc";

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

        [HttpGet]
        [Route("dashboard")]
        public JsonResult GetCountAdress()
        {
            string query = @"select delivery_adress, 
                                    count(*) 
                            from orders_detail 
                            group by delivery_adress";

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

        [HttpGet]
        [Route("MostBiggestEmployees")]
        public JsonResult GetMostBiggestEmployees()
        {
            string query = @"select full_name, sum(price*counter) as sum from orders_detail
                            join clients
                            on orders_detail.fk_client = clients.id_client
                            join product
                            on orders_detail.fk_product = product.productid
                            group by full_name
                            order by sum desc
                            limit 3";

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

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select id_order, clients.full_name, product.name, delivery_adress, to_char(orders_detail.date, 'YYYY-MM-DD'), orders_detail.counter * product.price as total 
                            from orders_detail
                            join product on orders_detail.fk_product = product.productid
                            join clients on orders_detail.fk_client = clients.id_client;";

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
        public JsonResult Post(Orders od)
        {
            string query = @"insert into orders_detail
                            values
                            (@id_order, @delivery_adress, @delivery, @fk_client, @fk_product, @date, @counter)";

            DataTable dt = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WebApiDatabase");
            NpgsqlDataReader myReader;

            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id_order", od.Id_order);
                    myCommand.Parameters.AddWithValue("@delivery_adress", od.delivery_adress);
                    myCommand.Parameters.AddWithValue("@delivery", Convert.ToBoolean(od.is_delivery));
                    myCommand.Parameters.AddWithValue("@fk_client", od.fk_client);
                    myCommand.Parameters.AddWithValue("@date", Convert.ToDateTime(od.dateOfOrder));
                    myCommand.Parameters.AddWithValue("@counter", od.counter);
                    myReader = myCommand.ExecuteReader();
                    dt.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added succesfully!");
        }

        [HttpPut]
        public JsonResult Put(Orders od)
        {
            string query = @"update Product
                            set 
                            delivery_adress= @delivery_adress, 
                            delivery = @delivery, 
                            fk_client = @fk_client,
                            fk_product = @fk_product
                            date = @date
                            counter = @counter
                            where id_order = @id_order";

            DataTable dt = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WebApiDatabase");
            NpgsqlDataReader myReader;

            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id_order", od.Id_order);
                    myCommand.Parameters.AddWithValue("@delivery_adress", od.delivery_adress);
                    myCommand.Parameters.AddWithValue("@delivery", Convert.ToBoolean(od.is_delivery));
                    myCommand.Parameters.AddWithValue("@fk_client", od.fk_client);
                    myCommand.Parameters.AddWithValue("@date", Convert.ToDateTime(od.dateOfOrder));
                    myCommand.Parameters.AddWithValue("@counter", od.counter);
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
            string query = @"delete from orders_detail where id_order=@id_order";

            DataTable dt = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WebApiDatabase");
            NpgsqlDataReader myReader;

            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id_order", id);
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
