using System.ComponentModel.DataAnnotations;

namespace ProductAPI
{
    public class Product
    {
        
        [Key] public int AutoID { get; set; }
        public string Name { get; set; } = string.Empty;
        public Int64 Price { get; set; } = 0;
        public bool Status { get; set; } = false;
        public string Description { get; set; } = string.Empty;

    }
}
