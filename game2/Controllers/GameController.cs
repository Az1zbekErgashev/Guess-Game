using game2.Dto;
using game2.Enitiy;
using game2.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace game2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IGameRepository gameRepository;

        public GameController(IGameRepository gameRepository) => this.gameRepository = gameRepository;

        [HttpPost("start")]
        public async Task<ActionResult<NumberGame>> StartGame(string email)
        {
            var userDto = await gameRepository.CreateGame(email);

            return Ok(userDto);
        }
        [HttpPost("{id}/guess")]
        public async Task<ActionResult<UserDto>> CheckNumber(int id, int[] guess)
        {
            if (guess.Length != 4)
                return BadRequest("Invalid guess. Please provide 4 numbers.");

            var userDto = await gameRepository.GetBotNumbers(guess, id);
            return Ok(userDto);
        }
    }
}
