using game2.Enitiy;

namespace game2.Dto
{
    public class GuessGameDto
    {
        public int Id { get; set; }
        public string? Guess { get; set; }
        public string? Result { get; set; }
        public History? History { get; set; }

    }
}
