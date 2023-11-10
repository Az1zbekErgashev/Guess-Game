namespace game2.Enitiy
{
    public class NumberGame
    {
        public int Id { get; set; }
        public int[]? Numbers { get; set; }
        public int RemainingAttempts { get; set; }
        public bool? IsGameOver { get; set; }
        public GuessGame? GuessGame { get; set; }
    }
}
