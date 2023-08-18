import React, { useEffect } from 'react';
import preloader from './preloader.svg';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { AppReducerType } from '../../redux/store';

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
}

const Preloader = () => {

  const isAuth: boolean = useSelector(
    (state: AppReducerType) => state.app.isAuth
  );

  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate("/login")
    }, 3000)
  }, [isAuth])

  return (
    <div style={style}>
      <img src={preloader} alt="preloading" style={{ width: '30%', height: '30%' }}/>
    </div>
  )
}

export default Preloader