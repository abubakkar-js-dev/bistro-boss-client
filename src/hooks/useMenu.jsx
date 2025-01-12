
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useMenu = () => {
  // const [menu,setMenu] = useState([]);
  // const [loading,setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // useEffect(()=>{
  //   setLoading(true);
  //   // fetch('https://bistro-boss-server-xi-mauve.vercel.app/menu')
  //   // .then(res=> res.json())
  //   // .then(data=> {
  //   //     setMenu(data);
  //   //     setLoading(false);
  //   // });

  // },[])

  const {data:menu=[],isLoading,refetch} = useQuery({
    queryKey:['menu'],
    queryFn: async()=> {
      const res = await axiosPublic.get('/menu')
      return res.data;
    }
  })

  return [menu,isLoading,refetch];
};

export default useMenu;