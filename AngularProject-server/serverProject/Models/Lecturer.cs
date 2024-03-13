namespace serverProject.Models
{
    public class Lecturer
    {
        public int id { get; set; }
        public string? name { get; set; }
        public string? address { get; set; }
        public string? mail { get; set; }
        public string password { get; set; }

        public Lecturer()
        {

        }
        public Lecturer(int id, string? name, string? address, string? mail, string password)
        {
            this.id = id;
            this.name = name;
            this.address = address;
            this.mail = mail;
            this.password = password;
        }
    }
}
