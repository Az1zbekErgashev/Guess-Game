using game2.Dto;
using game2.Enitiy;
using game2.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace game2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;

        public UserController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(UserDto userDto) => Ok(await _authRepository.Login(userDto));

        [HttpPost("Register")]
        public async Task<ActionResult<User>>Register(UserDto userDto) => Ok(await _authRepository.Register(userDto));
    }
}

