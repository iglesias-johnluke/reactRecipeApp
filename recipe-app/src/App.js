import logo from './logo.svg';
import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from "./Recipe"

const App = () => {
  
  const[recipes, setRecipes] = useState([]); //recipes is fetched list of recipe objects
  const [search, setSearch] = useState("") //tracks search bar text
  const [query, setQuery] = useState("chicken")//tracks what user is searching in search bar

  const APP_ID = "11c3eefe";
  const APP_KEY = "404cc8c9e05afe70e3cfea123499954e";

  //update fetch url query parameter according to query state
  const exampleRequest = `https://api.edamam.com/search?q=${query}&app_id=11c3eefe&app_key=404cc8c9e05afe70e3cfea123499954e`;


  

  useEffect( () => {
    getRecipes()
  }, [query]); //getRecipes whenever query state is updated
  
  
/*fetch data, initialize recipe variable*/
  async function getRecipes(){
    let response = await fetch(exampleRequest);
    let data = await response.json();
    console.log(data)
    setRecipes(data.hits) 
  }
  
  //updates search state variable according to what is type in search form
  //updates whenever search bar onChange
  function updateSearch(newText){
    setSearch(newText.target.value)
  }

  //called whenever we submit form text/query/search
  //only update url fetch QUERY when we press search (sets searchbar text to query value)
  function getSearch(event){
    event.preventDefault() //prevent page refresh
    setQuery(search)
  }
  

  return (
    <div className="App">
      <form className='search-form' onSubmit={getSearch}>
        <input type="text" className='search-bar' value={search} onChange={updateSearch} />
        <button 
          type='submit' 
          className='search-button'>Search
          
        </button>
        
      </form>
      <div className='recipes'>
        {recipes.map(
            recipe => 
              <Recipe 
              key={recipe.recipe.label} //key gets rid of unique property error
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
              />
              
            ) 
          }
      </div>
       
    </div>
  );
}

export default App;
