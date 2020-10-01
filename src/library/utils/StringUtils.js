export function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
export function formatCurrency (num) {
    if (typeof num === 'undefined' || num === null || num.length === 0) num = 0;
    num = parseFloat(num);
   return "₦" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export function generateDocId(id1, id2) {

    return `${Math.min(id1, id2)}_${Math.max(id1, id2)}`;
}

export function formatFirestoreDate(date) {
    return ''+ new Date(date._seconds);
}

export function formatDate(date) {
  

    const givenDate = date.split(" ");
    let datePart = givenDate[0].split('-');
    let timePart = givenDate[1].split(':');

    const givenYear = parseInt(datePart[0]);
    const givenMonth = parseInt(datePart[1]);
    const givenDay = parseInt(datePart[2]);

    const givenHour = parseInt(timePart[0]);
    const givenMinute = parseInt(timePart[1]);
    const givenSeconds = parseInt(timePart[2]);
    


    var currentDate = new Date(); 
    const currentYear =  parseInt(currentDate.getFullYear());
    const currentMonth = parseInt(currentDate.getMonth() + 1);

    const currentDay = parseInt(currentDate.getDate());


      const currentHour = parseInt(currentDate.getUTCHours() + 1);
      const currentMinute = parseInt(currentDate.getMinutes());
      const currentSeconds = parseInt(currentDate.getSeconds());

     /* console.log(givenYear);
      console.log(givenMonth);
      console.log(givenDay);
      console.log(givenHour);
      console.log(givenMinute);
      console.log(givenSeconds);
     


      console.log(currentYear);
      console.log(currentMonth);
      console.log(currentDay);

      console.log(currentHour);
      console.log(currentMinute);
       */
      console.log(currentMinute);

      const monthNames = ["", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];



     if (givenYear == currentYear) {
         //seconds ago
         if (givenMonth == currentMonth && givenDay == currentDay && givenHour == currentHour && givenMinute == currentMinute && givenSeconds != currentSeconds) {
             return `${currentSeconds - givenSeconds } seconds ago`;
         }

        //minutes ago
        else if (givenMonth == currentMonth && givenDay == currentDay && givenHour == currentHour && givenMinute != currentMinute) {
            return `${currentMinute - givenMinute } minutes ago`;
        }

         //hours ago
        else if (givenMonth == currentMonth && givenDay == currentDay && givenHour != currentHour ) {
            return `${currentHour - givenHour } hours ago`;
        }
   

        //days ago
        else if (givenMonth == currentMonth && givenDay != currentDay  ) {
            return `${currentDay - givenDay } days ago`;
        }
        
        //months ago
        else if (givenMonth != currentMonth ) {
            return `${currentMonth - givenMonth } months ago`;
        }
     }

     //another year
     
     else {
        return `${givenDay} ${monthNames[givenMonth]}, ${givenYear}`
     }

}