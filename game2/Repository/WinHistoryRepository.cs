using game2.Data;
using game2.Enitiy;
using Microsoft.EntityFrameworkCore;

namespace game2.Repository
{
    public class WinHistoryRepository : IWinRepositoryt
    {
        private readonly AppDbContext appDbContext;

        public WinHistoryRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public async Task CreateWinHisotry(History history)
        {
            await appDbContext.AddAsync(history);
            await appDbContext.SaveChangesAsync();
        }
    }
}
