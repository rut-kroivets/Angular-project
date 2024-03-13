namespace serverProject.Models
{
    public class Category
    {
        public int id { get; set; }
        public string? name { get; set; }
        public string? icon { get; set; }

        public Category()
        {

        }
        public Category(int id, string? name, string? icon)
        {
            this.id = id;
            this.name = name;
            this.icon = icon;
        }
    }
}
