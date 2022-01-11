import React from 'react';

const Home = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);
    return (
        <div>
            <h1>ML Transactional Model </h1>           
            <p>{!data ? "Loading..." : data}</p>
        </div>
    );
};

export default Home;