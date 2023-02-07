/**
 * Created by gordianknot on 3/1/2018.
 */

var tracker, handler, GA

window.ga((_tracker)=>{
   tracker = _tracker
})

handler = {
   get(target,name) {
      if (['hid', 'hitcount'].indexOf(name) === -1){
         return tracker.get(name)
      }else{
         switch (name){
            case 'hid':
               if (window.gaGlobal) return window.gaGlobal.hid
               break
            case 'hitcount':
               if (window.gaData) return window.gaData[tracker.get('trackingId')].hitcount
               break
         }
      }
      
   }
}

class GoogleAnalyticsUtil{
   hid:number
   hitcount:number
   trackingId:number
   clientId:number
   language:string
   encoding:string
   
}


export default new Proxy(new GoogleAnalyticsUtil() ,handler)