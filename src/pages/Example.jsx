// import { useQuery } from '@tanstack/react-query'
// import React from 'react'

// export default function Example() {

//     const [inputValue, setInputValue] = React.useState('');

//     React.useEffect(()=> {
//         refetch()
//       },[inputValue])

//     const { isPending, error, data, isSuccess , refetch} = useQuery({
//         queryKey: ['repoData'],
//         queryFn: () =>
//           fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}&sfw`).then((res) =>
//             res.json(),
//           ),
//       })

//       if (isPending) return <div className="">Loading...</div>

//       if(isSuccess) console.log(data);
//       console.log(inputValue);



//   return (  
//     <div className="">
//         <input type="text" onChange={(e)=> setInputValue(e.target.value)}/>
//     </div>
//   )
// }
