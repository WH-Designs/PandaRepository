using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicCollaborationManager.Services.Abstract;
using MusicCollaborationManager.Services.Concrete;
using SpotifyAPI.Web;
using System.Collections.Generic;
using MusicCollaborationManager.Models.DTO;
using static System.Net.Mime.MediaTypeNames;

namespace MusicCollaborationManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpotifyAuthController : ControllerBase
    {
        private readonly SpotifyAuthService _spotifyService;

        public SpotifyAuthController(SpotifyAuthService spotifyService)
        {
            _spotifyService = spotifyService;
        }

        [HttpGet("authuser")]
        public async Task<PrivateUser> GetAuthUser()
        {
            PrivateUser CurrentUser = await _spotifyService.GetAuthUser();
            return CurrentUser;
        }    
        
        [HttpGet("authtoptracks")]
        public async Task<List<FullTrack>> GetAuthUserTopTracks()
        {
            List<FullTrack> TopTracks = await _spotifyService.GetAuthUserTopTracks();
            return TopTracks;
        }       
    }
}