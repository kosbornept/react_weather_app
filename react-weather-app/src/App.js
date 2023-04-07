import './App.css';
import Background from './background.jpg';

function App() {
  //const apiKey = '356edc2c08aa4c53860141829230604';

  // Example Search on API. Use as a guide to setup.
  // search(term, location, sortBy) {
  //   return fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}/`,
  //     {
  //       headers: {
  //           Authorization: `Bearer ${apiKey}`
  //         }
  //       }).then(response => {
  //         return response.json();
  //       }).then(jsonResponse => {
  //         if (jsonResponse.businesses) {
  //           return jsonResponse.businesses.map(business => ({
  //             id: business.id,
  //             imageSrc: business.image_url,
  //             name: business.name,
  //             address: business.location.address1,
  //             city: business.location.city,
  //             state: business.location.state,
  //             zipCode: business.location.zip_code,
  //             category: business.categories[0].title,
  //             rating: business.rating,
  //             reviewCount: business.review_count
  //           }));
  //         }
  //     });
  //   }

  return (
    <div style={{backgroundImage: `url(${Background})`, height: '100vh', backgroundSize: 'cover', padding: '7rem'}} className="App">
      <h1 style={{ backgroundColor: 'rgba(159, 146, 153, 0.5)', paddingTop: '5rem' }}>Welcome.</h1>
      <div style={{padding: '5rem', backgroundColor: 'rgba(159, 146, 153, 0.5)'}}>
        <h2 style={{fontSize: '5rem'}}>
          12:00
        </h2>
      </div>
      <div style={{ backgroundColor: 'rgba(159, 146, 153, 0.5)', paddingBottom: '5rem'}}>
        <h3>
          It is currently sunny.
        </h3>
      </div>
      <footer style={{position: "fixed", bottom: 0, left: 0, backgroundColor: 'rgba(159, 146, 153, 0.5)', color: 'white'}}>
        <small>Photo by <a href="https://unsplash.com/@maritaextrabold?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Marita Kavelashvili</a> on <a href="https://unsplash.com/wallpapers/nature/forest?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
    </small>
      </footer>
      
    </div>
  );
}

export default App;
