const Spaceship = (data) => {
    return (
        <div className="spaceship">
            <h3>{data.title}</h3>
            <p>{data.stop}</p>
        </div>
    )
}

export default Spaceship;