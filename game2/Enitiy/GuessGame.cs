namespace game2.Enitiy
{
    public class GuessGame
    {
        public int Id { get; set; }
        public int? GameId { get; set; }
        public string? Result { get; set; }
        public History? History { get; set; }
    }
}
