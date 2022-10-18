import React from 'react';
import Categories from './Components/Categories';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Slider from './Components/Slider';

const App = () => {

  return (
    <div>
      <Navbar/>
      <Slider/>
      <Categories/>
      <Footer/>
    </div>
  );
}

export default App;
