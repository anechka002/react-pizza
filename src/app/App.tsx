import { Header } from '@/common/components';
import './scss/app.scss';
import { Routing } from '@/common/routing';

function App() {

  return (
    <div className="wrapper">
        <Header/>

        <div className="content">
          <div className="container">
            <Routing/>
          </div>
        </div>
    </div>
  );
}

export default App;
