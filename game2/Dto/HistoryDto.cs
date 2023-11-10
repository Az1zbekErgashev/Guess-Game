using game2.Enitiy;

namespace game2.Dto
{
    public class HistoryDto
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public string? UserEmail { get; set; }
        public int Game { get; set; }
        public int Winner { get; set; }
        public int GameCount { get; set; }
    }
}
