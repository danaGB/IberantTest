using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PackingListApp.DTO;
using PackingListApp.Models;

namespace PackingListApp.Utils
{
    public static class PersonExtensors
    {
        public static List<PersonDTO> ToPersonDTOList(this List<PersonModel> personModels)
        {
            var personDTOList = new List<PersonDTO>();

            foreach (var personModel in personModels)
            {
                personDTOList.Add(personModel.ToPersonDTO());
            }

            return personDTOList;
        }

        public static PersonDTO ToPersonDTO(this PersonModel personModel)
        {
            return new PersonDTO
            {
                Id = personModel.Id,
                Name = personModel.Name,
                LastName = personModel.LastName,
                Occupation = personModel.Occupation
            };
        }
    }
}
