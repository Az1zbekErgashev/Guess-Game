using game2.Enitiy;

namespace game2.Dto
{
    public class NumberGameDto
    {
        public int Id { get; set; }
        public int RemainingAttempts { get; set; }
        public bool? IsGameOver { get; set; }
        public int[]? Numbers { get; set; }

        public GuessGame? GuessGame { get; set; }


    }
}
