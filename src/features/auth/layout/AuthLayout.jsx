import { NavLink } from 'react-router-dom';
import styles from '../styles/Style.module.scss';

export const AuthLayout = ({children, title='', msg='', path=''}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className={styles.formulario_container}>
            <div className={styles.form}>
              <div className="row mb-3">
                <div className="col-lg-12 text-center">
                  <h1 className="mt-5">{ title }</h1>
                  <div className="mt-5">
                    { msg } <NavLink to={path} className={styles.form__link}><p>Entra aquí</p></NavLink>
                  </div>
                </div>
              </div>
              { children }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
