  const formatDate = (date) => {
    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const numDate = date.getDate();
      const day = date.getDay();
  
      const dayOfWeek = {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
        7: 'Sunday'
      }
      const abbreviatedMonth = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
      }
  
      return `${dayOfWeek[day]}, ${abbreviatedMonth[month]} ${numDate}, ${year}`
    }
    return null;  
  }

  export default formatDate;
  