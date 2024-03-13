using Microsoft.AspNetCore.Mvc;
using serverProject.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace serverProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LecturerController : ControllerBase
    {
        private static List<Lecturer> lecturers = new List<Lecturer>{
        new Lecturer { id = 1, name = "John Smith", address = "123 Main St", mail = "john@example.com", password = "password1" },
        new Lecturer { id = 2, name = "Jane Doe", address = "456 Elm St", mail = "jane@example.com", password = "password2" },
        new Lecturer { id = 3, name = "Alice Johnson", address = "789 Oak St", mail = "alice@example.com", password = "password3" },
        new Lecturer { id = 4, name = "Bob Brown", address = "101 Pine St", mail = "bob@example.com", password = "password4" },
        new Lecturer { id = 5, name = "Emily Davis", address = "202 Cedar St", mail = "emily@example.com", password = "password5" }
        };
        private static int counter = 0;


        // GET: api/<LecturerController>
        [HttpGet]
        public IEnumerable<Lecturer> Get()
        {
            return lecturers;
        }

        // GET api/<LecturerController>/5
        [HttpGet("{id}")]
        public Lecturer Get(int id)
        {
            return lecturers.Find(l=>l.id==id);
        }

        // POST api/<LecturerController>
        [HttpPost]
        public void Post([FromBody] Lecturer value)
        {
            value.id = ++counter;
            lecturers.Add(value);
        }

        // PUT api/<LecturerController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Lecturer value)
        {
            var l = lecturers.Find(l => l.id == id);
            if (l is null)
            {
                l.id = ++counter;
                lecturers.Add(l);
            }
            else
            {
                l.name = value.name;
                l.mail = value.mail;
                l.address = value.address;
                l.password = value.password;
            }
        }

        // DELETE api/<LecturerController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var l = lecturers.Find(l => l.id == id);
            lecturers.Remove(l);

        }
    }
}
