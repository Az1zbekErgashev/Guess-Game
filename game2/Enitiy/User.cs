namespace game2.Enitiy
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }   
        public string Password { get; set;}
        public List<History?> History { get; set; }
        public int GameCount { get; set; }
    }
}
