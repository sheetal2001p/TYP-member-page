import axios from "axios"

export const get = async(url)=>{
try{
  const response = await axios.get(url);
  return response;
}
catch(e){
  return e;
}
}

export const post = async(url,data)=>{
try{
  const response = await axios.post(url,data);
  return response;
}
catch(e){
  return e;
}
}

export const put = async(url,data)=>{
try{
  const response = await axios.put(url,data);
  return response;
}
catch(e){
  return e;
}
}