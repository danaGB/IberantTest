using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PackingListApp.DTO;

namespace PackingListApp.Interfaces
{
    public interface IPersonServices
    {
        List<PersonDTO> GetAll();

        int Add(PersonDTO person);

        PersonDTO Get(int id);

        int Put(int id, PersonDTO person);

        PersonDTO Delete(int id);
    }
}
