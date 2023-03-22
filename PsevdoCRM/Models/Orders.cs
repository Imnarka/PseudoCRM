namespace PsevdoCRM.Models
{
    public class Orders
    {
        public int Id_order { get; set; }

        public string delivery_adress { get; set; }

        public bool is_delivery { get; set; }

        public int fk_client { get; set; }

        public int fk_product { get; set; }

        public string dateOfOrder { get; set; }

        public int counter { get; set; }
    }
}
