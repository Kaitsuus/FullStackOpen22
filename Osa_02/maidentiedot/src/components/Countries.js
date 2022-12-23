const Countries = ({showCountries, setShowCountries}) => {
    if (showCountries.length === 1) return null

    return showCountries.map((country) => (
        <div key={country.name.official}>
            {country.name.common}{" "}
            <button onClick={() => setShowCountries([country])}>
                show
            </button>
        </div>
    ))
}
export default Countries