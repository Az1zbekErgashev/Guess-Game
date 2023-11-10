using game2.Data;
using game2.Enitiy;
using Microsoft.EntityFrameworkCore;
namespace game2.Repository
{
    public class HistoryRepository : IHistoryRepository
    {
        private readonly AppDbContext _context;
        public HistoryRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<History>> GetAll()
        {
            List<History> historyList = await _context.History.ToListAsync();
            var groupedHistories = historyList
                .GroupBy(h => h.UserEmail)
                .ToList();
            foreach (var group in groupedHistories)
            {
                int totalGameCount = group.Sum(h => h.GameCount);
                int totalWinner = group.Sum(h => h.Winner);
                foreach (var history in group)
                {
                    history.GameCount = totalGameCount;
                    history.Winner = totalWinner;
                }
            }
            var uniqueHistories = groupedHistories
                .Select(group => group.First())
                .ToList();
            return uniqueHistories;
        }
    }
}
