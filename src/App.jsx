import { TrakerList } from './components/TrakerList';
import { TrakerForm } from './components/TrakerForm';
import './App.scss';

export const App = () => {
  return (
    <div className="App">
      <h1 className="Apple-Title">traker</h1>
      <TrakerForm />
      <TrakerList />
    </div>
  );
};


