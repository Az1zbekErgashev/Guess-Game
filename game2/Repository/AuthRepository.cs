using game2.Data;
using game2.Dto;
using game2.Enitiy;
using game2.Jwt;
using Microsoft.EntityFrameworkCore;
using BCryptNet = BCrypt.Net;
namespace game2.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly AppDbContext context;

        public AuthRepository(AppDbContext context) => this.context = context;

        public async Task<List<User>> GetAll() => await context.Users.ToListAsync();

        public async Task<User> GetById(string email)=> await context.Users.FirstOrDefaultAsync(x => x.Email == email);
        public async Task<string> Login(UserDto userDto)
        {
            var user = await context.Users.FirstOrDefaultAsync(e => e.Email == userDto.Email);

            if (user != null)
            {
                var verify = BCrypt.Net.BCrypt.Verify(userDto.Password, user.Password);
                if (verify)
                {
                    var token = CreateTokenInJwtAuthorizationFromUsers.CreateToken(user);
                    return token;
                }
                else throw new BadHttpRequestException("Wrong password");
            }

            throw new BadHttpRequestException("User not found.");
        }

        public async Task<User> Register(UserDto userDto)
        {
            var users = await context.Users.FirstOrDefaultAsync(u => u.Email == userDto.Email);
            if (users != null)
            {
                throw new BadHttpRequestException("User");
            }

            var salt = BCryptNet.BCrypt.GenerateSalt();
            var passwordHash
                = BCrypt.Net.BCrypt.HashPassword(userDto.Password, salt);

            var user = new User
            {
                Name = userDto.Name,
                Email = userDto.Email,
                Password = passwordHash
            };

            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
            return user;
        }
    }
}
