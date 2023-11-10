using game2.Data;
using game2.Enitiy;
using Microsoft.EntityFrameworkCore;
namespace game2.Repository
{
    public class GameRepository : IGameRepository
    {
        private readonly AppDbContext _appDbContext;
        public GameRepository(AppDbContext appDbContext) => this._appDbContext = appDbContext;
        public async Task<NumberGame> CreateGame(string email)
        {
            var user = await _appDbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
            if (user == null)
            {
                throw new BadHttpRequestException("User not found.");
            }
            var list = new NumberGame();
            var random = new Random();
            var numbers = Enumerable.Range(1, 4).Select(_ => random.Next(1, 10)).ToArray();
            list.Numbers = numbers;
            list.IsGameOver = false;
            list.RemainingAttempts = 8;
            list.GuessGame = new GuessGame();
            list.GuessGame.Result = null;

            await _appDbContext.AddAsync(list);
            await _appDbContext.SaveChangesAsync();
            var gameCount = await _appDbContext.Games.CountAsync();
            var history = new History
            {
                GameCount = user.GameCount = user.GameCount + 1,
                GameId = list.Id,
                UserName = user.Name,
                UserEmail = user.Email,
                Winner = 0
            };
            list.GuessGame.History = history;
            await _appDbContext.SaveChangesAsync();
            return list;
        }
        public async Task<NumberGame> GetBotNumbers(int[] numbers, int gameID)
        {
            var gameOff = true;
            var game = await _appDbContext.Games.Include(i => i.GuessGame).Include(i => i.GuessGame).ThenInclude(x => x.History).FirstOrDefaultAsync(x => x.Id == gameID);
            if (game == null) throw new BadHttpRequestException("Game not found.");
            if (game.IsGameOver == true) gameOff = false;
            else gameOff = true;
            if (gameOff)
            {
                    game.RemainingAttempts--;
                    var correctNumbersCount = 0;
                    var correctNumber = 0;
                    for (var i = 0; i < 4; i++)
                    {
                        if (game.Numbers[i] == numbers[i]) correctNumbersCount++;
                        if (game.Numbers.Contains(numbers[i])) correctNumber++;
                    }
                    if (correctNumbersCount == 4)
                    {
                        game.IsGameOver = true;
                        game.GuessGame.Result = "Вы выиграли!";
                        game.GuessGame.History.Winner++;
                        gameOff = false;
                    }
                    else if (game.RemainingAttempts == 0)
                    {
                        game.IsGameOver = true;
                        game.GuessGame.Result = "Вы проиграли";
                        gameOff = false; }
                    else game.GuessGame.Result = $" У вас  P {correctNumbersCount}.  M {correctNumber}.";

                  await _appDbContext.SaveChangesAsync();
                    return game;
            }
            else throw new BadHttpRequestException("Game not found.");

        }
    }
}
