import moment from "moment";

const FileFormat = (url = "") => {
  const fileExt = url.split('.').pop().toLowerCase(); // Ensure extension is in lower case

  if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg") {
    return "video";
  }
  if (fileExt === "mp3" || fileExt === "wav" || fileExt === "mpeg") {
    return "audio";
  }
  if (fileExt === "jpg" || fileExt === "png" || fileExt === "jpeg") {
    return "img";
  }
  return "file";
};

const transformImg = (url = "", width = 100) => {
  
  return url;
};

const getLast7Days = () => {
  const currDate = moment();
  const days = [];

  for (let i = 0; i < 7; i++) {
    const dayDate = currDate.clone().subtract(i, "days");
    const dayName = dayDate.format('dddd');
    days.unshift(dayName);
  }

  return days;
};
const getOrSaveFromStorage=(key,value,get)=>{
  if(get)
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) :null
  else{
    localStorage.setItem(key,JSON.stringify(value))
  }

}

export { FileFormat, transformImg, getLast7Days,getOrSaveFromStorage };
