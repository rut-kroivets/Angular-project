namespace serverProject.Models
{
    public enum Study
    {
        Online,
        Offline,
        Hybrid
    }
    public class Course
    {
        public int id { get; set; }
        public Lecturer lecturer { get; set; }
        public string? name { get; set; }
        public Category? category { get; set; }
        public int? countOfLessons { get; set; }
        public DateTime? dateOfStart { get; set; }
        public List<string>? syllabus { get; set; }
        public Study? study { get; set; }
        public string? image { get; set; }

        public Course(int id, Lecturer lecturer, string? name, Category? category, int? countOfLessons, DateTime? start, List<string>? syllabus, Study? study, string? image)
        {
            this.id = id;
            this.lecturer = lecturer;
            this.name = name;
            this.category = category;
            this.countOfLessons = countOfLessons;
            this.dateOfStart = start;
            this.syllabus = syllabus;
            this.study = study;
            this.image = image;
        }
        public Course()
        {
        }
    }
}
