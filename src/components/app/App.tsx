import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';

import './app.scss';

const App = () => {

  return (
    <main className="app">
      <h1 className='text-center mt-5'>Create your robot</h1>
      <div className="content">
        <HeroesList/>
        <div className="content__interactive">
          <HeroesAddForm/>
          <HeroesFilters/>
        </div>
      </div>
    </main>
  )
}

export default App;
