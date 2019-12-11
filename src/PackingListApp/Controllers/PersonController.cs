using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PackingListApp.DTO;
using PackingListApp.Interfaces;
using PackingListApp.Models;
using Microsoft.AspNetCore.Mvc;
using PackingList.Core.Queries;
using Microsoft.AspNet.OData.Query;

namespace PackingListApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        public readonly IPersonServices _personService;
        public PersonController(IPersonServices personService)
        {
            _personService = personService;
        }

        // GET: api/Person
        [HttpGet]
        public IActionResult Get(ODataQueryOptions<PersonModel> options)
        {
            var list = _personService.GetAll();
            return Ok(new QueryResult<PersonDTO>(list, list.Count));
        }

        // GET: api/Person/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var person = _personService.Get(id);

            if (person == null)
                return NotFound();

            return Ok(person);
        }

        // POST: api/Person
        [HttpPost]
        public IActionResult Post([FromBody] PersonDTO person)
        {
            var id = _personService.Add(person);
            return Ok(new CommandHandledResult(true, id.ToString(), id.ToString(), id.ToString()));
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] PersonDTO person)
        {
            var idPerson = _personService.Put(id, person);

            if (idPerson == -1)
                return NotFound();

            return Ok(new CommandHandledResult(true, id.ToString(), id.ToString(), id.ToString()));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var person = _personService.Delete(id);

            if (person == null)
                return NotFound();

            return Ok(person);
        }
    }
}
