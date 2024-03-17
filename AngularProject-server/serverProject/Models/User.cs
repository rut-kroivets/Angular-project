namespace serverProject.Models
{
    public class User
    {
        public int id { get; set; }
        public string? name { get; set; }
        public string? mail { get; set; }
        public string password { get; set; }

        public string address { get; set; }
        public User()
        {

        }
        public User(int id, string name, string mail, string password, string address)
        {
            this.id = id;
            this.name = name;
            this.mail = mail;
            this.password = password;
            this.address = address;

        }

    }
}
