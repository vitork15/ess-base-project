import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar';
import style from './index.module.css';

export default function InitialPage() {

  const navigate = useNavigate();
  const navigateTo = (path: string) => {
    navigate(path);
  }

  return (
    <div className='mainLayout'>
      <div>
        <Sidebar/>
      </div>
      <div className={style.body}>
        <div className={style.banner}>

        </div>
        <div className={style.sugests}>
        
        </div>
        <div className={style.atalhos}>
          <button className={style.atalhoButton} onClick={() => navigateTo('/emAlta')}>
            Em alta
          </button>
        </div>
      </div>
    </div>
  );
}