const months: string[] = [
  "January",   // 0
  "February",  // 1
  "March",     // 2
  "April",     // 3
  "May",       // 4
  "June",      // 5
  "July",      // 6
  "August",    // 7
  "September", // 8
  "October",   // 9
  "November",  // 10
  "December"   // 11
];



export const formatDate = (d:Date , withMonthName : boolean = false)=>{
	const date = new Date(d);
	const day = String(date.getDate()).padStart(2 , "0");
	const month = String(date.getMonth() + 1).padStart(2 ,"0");
	const year = date.getFullYear();
	const monthName = months[Number(month)-1]


	return withMonthName ? `${monthName} ${day}, ${year}`  :  `${day}-${month}-${year}`
}