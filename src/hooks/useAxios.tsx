import axios from 'axios';
export async function useAxios(url:string,method:string,data?:any){
        console.log(url)
        const response = await axios({
            method: method,
            url: `http://localhost:3000/${url}`,
            data: data
        })
        return response.data
    
}
