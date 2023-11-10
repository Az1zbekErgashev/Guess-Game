using game2.Dto;
using game2.Enitiy;

namespace game2.Repository
{
    public interface IHistoryRepository
    {
        Task<List<History>> GetAll();
    }
}
