using game2.Dto;
using game2.Enitiy;

namespace game2.Repository
{
    public interface IAuthRepository
    {
        Task<User> Register(UserDto userDto);
        Task<string> Login(UserDto userDto);
        Task<List<User>> GetAll();
        Task<User> GetById(string email);
    }
}
