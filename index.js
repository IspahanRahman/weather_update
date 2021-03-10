const http=require('http')
const fs=require('fs')
const requests=require('requests')

const homeFile=fs.readFileSync("home.html","utf-8")
const replaceValue=(temporay,original)=>{
  let tempareture=temporay.replace("{%tempValue%}",original.main.temp)
  tempareture=tempareture.replace("{%tempMin%}",original.main.temp_min)
  tempareture=tempareture.replace("{%tempMax%}",original.main.temp_max)
  tempareture=tempareture.replace("{%location%}",original.name)
  tempareture=tempareture.replace("{%country%}",original.sys.country)
  tempareture=tempareture.replace("{%tempStatus%}",original.weather[0].main)
  return tempareture
}
const server=http.createServer((req,res)=>{
   if(req.url=='/'){
    requests(
      'http://api.openweathermap.org/data/2.5/weather?q=Jessore&appid=8b2180e4bc56aafb124f0f59d1a528b8&units=metric'
      )
    .on('data',  (chunk)=> {
      const objData=JSON.parse(chunk)
      const arrData=[objData]
      const realTimeData=arrData.map((value)=>replaceValue(homeFile,value))
      .join("")

       res.write(realTimeData)
      
    })
    .on('end', (err)=> {
      if (err) return console.log('connection closed due to errors', err);
     res.end()
    });
   } 
})

server.listen(8080,"127.0.0.1")