namespace PsevdoCRM.Models
{
    public class Products
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; } 
        public string ProductDescription { get; set; }

        public float price { get; set; }
        public int total { get; set; }

        public string manufacture { get; set; }
    }
}
