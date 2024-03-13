using Microsoft.AspNetCore.Mvc;
using serverProject.Models;
using System.Diagnostics.Metrics;

namespace serverProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController
    {
        private static List<Category> categories = new List<Category> {
                new Category { id = 1, name = "Programming", icon = "code" },
                new Category { id = 2, name = "Design", icon = "paint-brush" },
                new Category { id = 3, name = "Business", icon = "briefcase" },
                new Category { id = 4, name = "Language", icon = "language" },
                new Category { id = 5, name = "Health", icon = "heart" }
        };
        private static int counter = categories.Count;
        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return categories;
        }

        [HttpGet("{id}")]
        public ActionResult<Category> Get(int id)
        {
            var category = categories.FirstOrDefault(c => c.id == id);
            
            return category;
        }

        [HttpPost]
        public void Post([FromBody] Category value)
        {
            value.id = ++counter;
            categories.Add(value);
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Category value)
        {
            var category = categories.FirstOrDefault(c => c.id == id);
            
            category.name = value.name;
            category.icon = value.icon;

        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var category = categories.FirstOrDefault(c => c.id == id);
            
            categories.Remove(category);
        }
    }
}