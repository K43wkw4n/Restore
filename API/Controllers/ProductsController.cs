using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extenstions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            var query = _context.products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands, productParams.Types)
            .AsQueryable();
            var products = await PagedList<Product>.ToPagedList(query,
            productParams.PageNumber, productParams.PageSize);
            //เพื่อส่งค่ำกำรแบ่งหน้ำไปให้Axios Interceptor น ำไปใช้ต่อ
            Response.AddPaginationHeader(products.MetaData);
            return Ok(products);
        }

        // [HttpGet("[action]")]
        // public async Task<ActionResult> testGetProducts(){
        //     return Ok( await _context.products.ToListAsync());
        // }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {

            var product = await _context.products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            //อ่ำนค่ำที่ซ ้ำกันมำเพียงค่ำเดียว
            var brands = await _context.products.Select(p => p.Brand).Distinct().ToListAsync(); //.Distinct() เอาเฉพาะที่แตกต่างกัน
            var types = await _context.products.Select(p => p.Type).Distinct().ToListAsync();
            return Ok(new { brands, types });
        }

    }
}
