import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Premium(){
  const nav = useNavigate();
  useEffect(()=>{ nav('/premium/dashboard'); }, [nav]);
  return null;
}
