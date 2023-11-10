using game2.Enitiy;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations;
using IHistoryRepository = game2.Repository.IHistoryRepository;

namespace game2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistoryController : ControllerBase
    {
        private readonly Repository.IHistoryRepository _historyRepository;

        public HistoryController(IHistoryRepository historyRepository)
        {
            _historyRepository = historyRepository;
        }
        [HttpGet]
        public async Task<ActionResult<History>> GetAll() => Ok(await _historyRepository.GetAll());
    }
}
