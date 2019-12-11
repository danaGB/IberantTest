using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PackingListApp.Models;

namespace PackingListApp.Interfaces
{
    public interface IPersonServices
    {
        List<PersonModel> GetAll();

        int Add(PersonModel person);

        PersonModel Get(int id);

        int Put(int id, PersonModel person);

        PersonModel Delete(int id);
    }
}
