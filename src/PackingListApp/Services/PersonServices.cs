using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PackingListApp.Interfaces;
using PackingListApp.EntityFramework;
using PackingListApp.Models;

namespace PackingListApp.Services
{
    public class PersonServices : IPersonServices
    {
        private readonly TestContext _context;
        public PersonServices(TestContext context)
        {
            _context = context;
        }

        public int Add(PersonModel person)
        {
            _context.PersonModels.Add(person);
            _context.SaveChanges();

            return person.Id;
        }

        public PersonModel Delete(int id)
        {
            var personModel = _context.PersonModels.FirstOrDefault(p => p.Id == id);

            if (personModel == null)
                return null; // Person not Found

            _context.PersonModels.Remove(personModel);

            _context.SaveChanges();

            return personModel;
        }

        public PersonModel Get(int id)
        {
            var personModel = _context.PersonModels.FirstOrDefault(p => p.Id == id);

            if (personModel == null)
                return null; // Person not Found

            return personModel;
        }

        public List<PersonModel> GetAll()
        {
            return _context.PersonModels.ToList();
        }

        public int Put(int id, PersonModel person)
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
