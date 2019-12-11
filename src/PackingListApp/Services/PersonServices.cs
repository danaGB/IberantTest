using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PackingListApp.DTO;
using PackingListApp.Interfaces;
using PackingListApp.EntityFramework;
using PackingListApp.Models;
using PackingListApp.Utils;

namespace PackingListApp.Services
{
    public class PersonServices : IPersonServices
    {
        private readonly TestContext _context;
        public PersonServices(TestContext context)
        {
            _context = context;
        }

        public int Add(PersonDTO person)
        {
            var newPerson = new PersonModel
            {
                Name = person.Name,
                LastName = person.LastName,
                Occupation = person.Occupation
            };

            _context.PersonModels.Add(newPerson);
            _context.SaveChanges();

            return newPerson.Id;
        }

        public PersonDTO Delete(int id)
        {
            var personModel = _context.PersonModels.FirstOrDefault(p => p.Id == id);

            if (personModel == null)
                return null; // Person not Found

            _context.PersonModels.Remove(personModel);

            _context.SaveChanges();

            return personModel.ToPersonDTO();
        }

        public PersonDTO Get(int id)
        {
            var personModel = _context.PersonModels.FirstOrDefault(p => p.Id == id);

            if (personModel == null)
                return null; // Person not Found

            return personModel.ToPersonDTO();
        }

        public List<PersonDTO> GetAll()
        {
            var personModelList = _context.PersonModels.ToList();
            return personModelList.ToPersonDTOList();
        }

        public int Put(int id, PersonDTO person)
        {
            var personModel = _context.PersonModels.FirstOrDefault(p => p.Id == id);

            if (personModel == null)
                return -1; // Person not Found

            personModel.Name = person.Name;
            personModel.LastName = person.LastName;
            personModel.Occupation = person.Occupation;

            _context.SaveChanges();

            return id;
        }
    }
}
