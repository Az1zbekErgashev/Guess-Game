using game2.Dto;
using game2.Enitiy;

namespace game2.Repository
{
    public interface IGameRepository
    {
        Task<NumberGame> CreateGame(string email);
        Task<NumberGame> GetBotNumbers(int[] numbers, int gameID);
    }
}
