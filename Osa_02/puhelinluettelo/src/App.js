
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState(
    {
      name: '',
      number: '',
    }
  )

  const [showPerson, setShowPerson] = useState([])
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null);

  /*useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        //console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])*/

  //console.log('render', persons.length, 'persons')
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setShowPerson(initialPersons);
    });
  }, []);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const addPerson = (event) => {
    event.preventDefault();
    const currentName = persons.filter(
      (person) => person.name === newPerson.name
    );

    if (currentName.length === 0) {
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setShowPerson(persons.concat(returnedPerson));
          setMessage(`Added ${newPerson.name} to phonebook`);
        })
        .catch((error) => setMessage(error.response.data.error));
    } else {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(currentName[0].id, newPerson)
          .then((returnedPerson) => {
            const updatedPersons = persons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            );
            setPersons(updatedPersons);
            setShowPerson(updatedPersons);
            setMessage(`Updated ${newPerson.name}'s number`);
          })
          .catch((error) => setMessage(error.response.data.error));
      }
    }
    setNewPerson({ name: "", number: "" });
  };

    const handleNewPerson = (event) => {
    //console.log(event.target.value)
    const {name, value} = event.target
    setNewPerson({
      ...newPerson,
      [name]: value
    })
  }

  const filterName = (event) => {
    const search = event.target.value
    setFilter(search)
    setShowPerson(
      persons.filter((person) => person.name.toLowerCase().includes(search))
    )
  }
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then((response) => {
        const updatedPersons = persons.filter((person) => person.id !== id);
        setPersons(updatedPersons);
        setShowPerson(updatedPersons);
        setMessage(`Removed ${name} from phonebook`);
      });
    }
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
      filter={filter}
      filterName={filterName}
      />
      <Form
      addPerson={addPerson}
      newPerson={newPerson}
      handleNewPerson={handleNewPerson}
      />
      <h2>Numbers</h2>
      <Person
      showPerson={showPerson}
      deletePerson={deletePerson}
      />
    </div>
  )

}

export default App