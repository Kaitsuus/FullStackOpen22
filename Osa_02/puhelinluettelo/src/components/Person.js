const Person = ({showPerson, deletePerson}) => {
    return(
        <div>
            {showPerson.map((person) =>(
                <div key={person.id}>
                    {person.name} {person.number}{' '}
                    <button onClick={() => deletePerson(person)}>
                    delete</button>
                </div>
            ))}
        </div>
    )
}
export default Person