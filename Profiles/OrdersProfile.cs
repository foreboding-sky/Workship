using AutoMapper;
using Workshop.Models;

namespace Workshop.Profiles
{
    public class NotesProfile : Profile
    {
        public NotesProfile()
        {
            CreateMap<OrderCreateDto, Order>();
        }
    }
}