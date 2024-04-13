using AutoMapper;
using Workshop.Models;

namespace Workshop.Profiles
{
    public class WorkshopProfile : Profile
    {
        public WorkshopProfile()
        {
            CreateMap<ClientWriteDTO, Client>();
            CreateMap<Client, ClientReadDTO>();

            CreateMap<DeviceWriteDTO, Device>();
            CreateMap<Device, DeviceReadDTO>();

            CreateMap<ServiceWriteDTO, Service>();
            CreateMap<Service, ServiceReadDTO>();

            CreateMap<ItemWriteDTO, Item>()
                .ForMember(dst => dst.Device, src => src.MapFrom(src => src.Device));
            CreateMap<Item, ItemReadDTO>()
                .ForMember(dst => dst.Device, src => src.MapFrom(src => src.Device));

            CreateMap<OrderWriteDTO, Order>()
                .ForMember(dst => dst.Product, src => src.MapFrom(src => src.Product));
            CreateMap<Order, OrderReadDTO>()
                .ForMember(dst => dst.Product, src => src.MapFrom(src => src.Product));

            CreateMap<StockItemWriteDTO, StockItem>()
                .ForMember(dst => dst.Item, src => src.MapFrom(src => src.Item));
            CreateMap<StockItem, StockItemReadDTO>()
                .ForMember(dst => dst.Item, src => src.MapFrom(src => src.Item));

            CreateMap<RepairWriteDTO, Repair>()
                .ForMember(dst => dst.Client, src => src.MapFrom(src => src.Client))
                .ForMember(dst => dst.Products, src => src.MapFrom(src => src.Products))
                .ForMember(dst => dst.OrderedProducts, src => src.MapFrom(src => src.OrderedProducts))
                //.ForMember(dst => dst.RepairServices, src => src.MapFrom(src => src.RepairServices))
                .ForMember(dst => dst.Device, src => src.MapFrom(src => src.Device));
            CreateMap<Repair, RepairReadDTO>()
                .ForMember(dst => dst.Client, src => src.MapFrom(src => src.Client))
                .ForMember(dst => dst.Products, src => src.MapFrom(src => src.Products.Select(x => x.Item).ToList()))
                .ForMember(dst => dst.OrderedProducts, src => src.MapFrom(src => src.OrderedProducts))
                //.ForMember(dst => dst.RepairServices, src => src.MapFrom(src => src.RepairServices))
                .ForMember(dst => dst.Device, src => src.MapFrom(src => src.Device));

            CreateMap<StockItemWriteDTO, RepairItem>()
                .ForMember(dst => dst.Item, src => src.MapFrom(src => src));
        }
    }
}